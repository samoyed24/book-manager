package top.samoyed24.bookmanager.service.impl;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import top.samoyed24.bookmanager.config.SystemConfig;
import top.samoyed24.bookmanager.constant.BookStatus;
import top.samoyed24.bookmanager.constant.BorrowStatus;
import top.samoyed24.bookmanager.dto.request.book.*;
import top.samoyed24.bookmanager.dto.request.book.wrapper.BookRequestWrapper;
import top.samoyed24.bookmanager.dto.result.book.*;
import top.samoyed24.bookmanager.dto.result.wrapper.OperationResultWrapper;
import top.samoyed24.bookmanager.entity.*;
import top.samoyed24.bookmanager.exception.GeneralException;
import top.samoyed24.bookmanager.mapper.BookMapper;
import top.samoyed24.bookmanager.repository.BookRepository;
import top.samoyed24.bookmanager.repository.BorrowRepository;
import top.samoyed24.bookmanager.repository.UserRepository;
import top.samoyed24.bookmanager.service.BookService;
import top.samoyed24.bookmanager.util.LongUtil;
import top.samoyed24.bookmanager.util.PredicateBuilder;
import top.samoyed24.bookmanager.util.time.TimeUtil;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    private final BookMapper bookMapper;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final BorrowRepository borrowRepository;
    private final TimeUtil timeUtil;
    private final LongUtil longUtil;
    private final SystemConfig systemConfig;

    public BookServiceImpl(
            BookRepository bookRepository,
            BookMapper bookMapper, UserRepository userRepository,
            BorrowRepository borrowRepository,
            TimeUtil timeUtil,
            LongUtil longUtil,
            SystemConfig systemConfig
    ) {
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
        this.userRepository = userRepository;
        this.borrowRepository = borrowRepository;
        this.timeUtil = timeUtil;
        this.longUtil = longUtil;
        this.systemConfig = systemConfig;
    }

    @Override
    public Page<GetBookQueryResult> getBookQuery(GetBookQueryRequest getBookQueryRequest) {
        Pageable pageable = PageRequest.of(
                getBookQueryRequest.getCurrentPage(),
                getBookQueryRequest.getPageSize(),
                Sort.by(Sort.Direction.DESC, "id")
        );
        return bookRepository.findAll((root, query, cb) -> new PredicateBuilder(cb)
                .equal(getBookQueryRequest.getId(), root.get("id"))
                .like(getBookQueryRequest.getName(), root.get("name"))
                .like(getBookQueryRequest.getPublisher(), root.get("publisher"))
                .like(getBookQueryRequest.getAuthor(), root.get("author"))
                .like(getBookQueryRequest.getClsNo(), root.get("clsNo"))
                .like(getBookQueryRequest.getPublishNo(), root.get("publishNo"))
                .equal(getBookQueryRequest.getStatus(), root.get("status"))
                .build(), pageable)
                .map(GetBookQueryResult::new);
    }

    @Override
    public GetBookDetailsResult getBookDetails(GetBookDetailsRequest getBookDetailsRequest) {
        Book book;
        try {
            book = bookRepository.findById(Long.valueOf(getBookDetailsRequest.bookId)).orElseThrow(
                    () -> new GeneralException(40400, "Book Not Found")
            );
        } catch (NumberFormatException e) {
            throw new GeneralException(40000, "Invalid number format");
        }
        return bookMapper.toGetBookDetailsResultDTO(book);
    }

    @Override
    public Page<GetBorrowQueryResult> getBorrowQuery(GetBorrowQueryRequest getBorrowQueryRequest) {
        Pageable pageable = PageRequest.of(
                getBorrowQueryRequest.getCurrentPage(),
                getBorrowQueryRequest.getPageSize(),
                Sort.by(Sort.Direction.DESC, "id")
        );
        return borrowRepository.findAll((root, query, cb) -> {
            Join<Borrow, User> userJoin = root.join("user", JoinType.LEFT);
            Join<Borrow, Book> bookJoin = root.join("book", JoinType.LEFT);
            Join<User, UserProfile> profileJoin = userJoin.join("profile", JoinType.LEFT);
            return new PredicateBuilder(cb)
                    .or(or -> or
                            .like(getBorrowQueryRequest.getBook(), bookJoin.get("name"))
                            .equal(getBorrowQueryRequest.getBook(), bookJoin.get("publishNo"))
                            .equal(
                                    longUtil.parseLongOrNull(getBorrowQueryRequest.getBook()),
                                    bookJoin.get("id")
                            )
                    )
                    .or(or -> or
                            .equal(getBorrowQueryRequest.getBorrower(), profileJoin.get("name"))
                            .equal(getBorrowQueryRequest.getBorrower(), profileJoin.get("workNumber"))
                            .equal(getBorrowQueryRequest.getBorrower(), userJoin.get("username"))
                    )
                    .equal(getBorrowQueryRequest.getStatus(), root.get("status"))
                    .between(
                            timeUtil.parseDateTimeToLocalDateOrNull(getBorrowQueryRequest.getExpireTimeFrom()),
                            timeUtil.parseDateTimeToLocalDateOrNull(getBorrowQueryRequest.getExpireTimeTo()),
                            root.get("expireDate")
                    )
                    .notEqual(BorrowStatus.DELETED, root.get("status"))
                    .build();
        }, pageable)
        .map(GetBorrowQueryResult::new);
    }

    public BookBorrowResult borrowBook(BookRequestWrapper bookBorrowRequest, User user) {
        String bookId = bookBorrowRequest.getBookId();
        BookBorrowResult bookBorrowResult = new BookBorrowResult();
        bookBorrowResult.setSuccess(false);

        // 检查目标书是否存在且处于 在馆 状态
        Book book1 = this.getBookByIdOrThrow(bookId);
        if (book1.getStatus() != BookStatus.AVAILABLE) {
            bookBorrowResult.setReason("书籍当前不处于可借阅状态");
            return bookBorrowResult;
        }

        // 先查询当前借书是否超过限制
        List<Borrow> borrowList = this.borrowRepository.findByUserAndStatusNot(user, BorrowStatus.RETURNED);
        if (borrowList.size() >= systemConfig.getMaxBorrowCount()) {
            bookBorrowResult.setReason("超出最大借书数量限制：" + systemConfig.getMaxBorrowCount() + "本");
            return bookBorrowResult;
        }

        // 再查询用户是否有过期的书
        boolean userHasExpiredBorrow = this.borrowRepository.existsByUserAndStatus(user, BorrowStatus.EXPIRED);
        if (userHasExpiredBorrow) {
            bookBorrowResult.setReason("您当前有过期的书，请归还或续借后再进行借书");
            return bookBorrowResult;
        }

        Borrow borrow = new Borrow();
        borrow.setUser(user);
        borrow.setBook(book1);
        borrow.setStatus(BorrowStatus.NORMAL);
        borrow.setExpireDate(timeUtil.getLocalDateOfDefaultOffset().plusDays(systemConfig.getDefaultBorrowDays()));
        borrow.setBorrowDate(timeUtil.getLocalDateOfDefaultOffset());
        this.borrowRepository.save(borrow);

        book1.setStatus(BookStatus.BORROWED);
        this.bookRepository.save(book1);

        bookBorrowResult.setExpireDate(borrow.getExpireDate().toString());
        bookBorrowResult.setSuccess(true);
        return bookBorrowResult;
    }

    public BookBorrowResult renewBorrow(Long borrowId) {
        Borrow borrow = this.getBorrowByIdOrThrow(borrowId);
        if (borrow.getStatus() != BorrowStatus.NORMAL) {
            throw new GeneralException(40000, "This book is in no state to be renewed. (RETURNED / EXPIRED)");
        }
        borrow.setExpireDate(borrow.getExpireDate().plusDays(
                systemConfig.getDefaultBorrowDays()
        ));
        borrowRepository.save(borrow);
        BookBorrowResult result = new BookBorrowResult();
        result.setSuccess(true);
        result.setExpireDate(borrow.getExpireDate().toString());
        return result;
    }

    public OperationResultWrapper returnBorrow(Long borrowId) {
        Borrow borrow = this.getBorrowByIdOrThrow(borrowId);
        if (borrow.getStatus() == BorrowStatus.RETURNED) {
            throw new GeneralException(40000, "The book has already been returned!");
        }
        borrow.setReturnDate(timeUtil.getLocalDateOfDefaultOffset());
        borrow.setStatus(BorrowStatus.RETURNED);
        borrowRepository.save(borrow);
        Book book = borrow.getBook();
        book.setStatus(BookStatus.AVAILABLE);
        bookRepository.save(book);
        OperationResultWrapper result = new OperationResultWrapper();
        result.setSuccess(true);
        return result;
    }

    public OperationResultWrapper deleteBorrow(Long borrowId) {
        Borrow borrow = this.getBorrowByIdOrThrow(borrowId);
        if (borrow.getStatus() == BorrowStatus.DELETED) {
            throw new GeneralException(40000, "The borrow record has already been deleted!");
        }
        // 如果不是已归还的状态，说明书籍目前关联此借阅记录，且是借出状态，需要调整为在馆
        if (borrow.getStatus() != BorrowStatus.RETURNED) {
            Book book = borrow.getBook();
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
        // 将借阅记录的状态设为删除
        borrow.setStatus(BorrowStatus.DELETED);
        borrowRepository.save(borrow);

        OperationResultWrapper result = new OperationResultWrapper();
        result.setSuccess(true);
        return result;
    }

    @Override
    public OperationResultWrapper cancelBook(String bookId) {
        Book book = getBookByIdOrThrow(bookId);
        if (book.getStatus() != BookStatus.AVAILABLE) {
            throw new GeneralException(40000, "This book is in no state to be cancelled");
        }
        book.setStatus(BookStatus.CANCELLED);
        bookRepository.save(book);
        OperationResultWrapper result = new OperationResultWrapper();
        result.setSuccess(true);
        return result;
    }

    @Override
    public OperationResultWrapper addBook(AddEditBookRequest addEditBookRequest) {
        Book book = bookMapper.addEditBookRequestDTOToBook(addEditBookRequest);
        book.setStatus(BookStatus.AVAILABLE);
        bookRepository.save(book);
        OperationResultWrapper result = new OperationResultWrapper();
        result.setSuccess(true);
        return result;
    }

    @Override
    public OperationResultWrapper editBook(AddEditBookRequest addEditBookRequest) {
        Book book1 = getBookByIdOrThrow(addEditBookRequest.getId());
        Book book2 = bookMapper.addEditBookRequestDTOToBook(addEditBookRequest);
        book2.setStatus(book1.getStatus());
        book2.setId(book1.getId());
        bookRepository.save(book2);
        OperationResultWrapper result = new OperationResultWrapper();
        result.setSuccess(true);
        return result;
    }

    @Override
    public Page<GetBorrowQueryResult> userGetBorrowQuery(GetBorrowQueryRequest getBorrowQueryRequest, User user) {
        Pageable pageable = PageRequest.of(
                getBorrowQueryRequest.getCurrentPage(),
                getBorrowQueryRequest.getPageSize(),
                Sort.by(Sort.Direction.DESC, "id")
        );
        return borrowRepository.findAll((root, query, cb) -> {
                    Join<Borrow, Book> bookJoin = root.join("book", JoinType.LEFT);
                    return new PredicateBuilder(cb)
                            .or(or -> or
                                    .like(getBorrowQueryRequest.getBook(), bookJoin.get("name"))
                                    .equal(getBorrowQueryRequest.getBook(), bookJoin.get("publishNo"))
                                    .equal(
                                            longUtil.parseLongOrNull(getBorrowQueryRequest.getBook()),
                                            bookJoin.get("id")
                                    )
                            )
                            .equal(getBorrowQueryRequest.getStatus(), root.get("status"))
                            .equal(user, root.get("user"))
                            .between(
                                    timeUtil.parseDateTimeToLocalDateOrNull(getBorrowQueryRequest.getExpireTimeFrom()),
                                    timeUtil.parseDateTimeToLocalDateOrNull(getBorrowQueryRequest.getExpireTimeTo()),
                                    root.get("expireDate")
                            )
                            .notEqual(BorrowStatus.DELETED, root.get("status"))
                            .build();
                }, pageable)
                .map(GetBorrowQueryResult::new);
    }

    @Override
    public BorrowPenaltyResult getPenalty(Long borrowId, User user) {
        Borrow borrow = getBorrowByIdOrThrow(borrowId);
        Long dayDelta = timeUtil.getLocalDateDaysDelta(borrow.getExpireDate()) + 1;
        if (dayDelta <= 0) {
            throw new GeneralException(40000, "your borrow is not expired yet!");
        }
        BorrowPenaltyResult result = new BorrowPenaltyResult();
        result.setBookName(borrow.getBook().getName());
        result.setBorrowerName(borrow.getUser().getProfile().getName());
        result.setBorrowerWorkNumber(borrow.getUser().getProfile().getWorkNumber());
        result.setAmount(dayDelta * systemConfig.getPenaltyPerDay());
        result.setPenaltyPerDay(systemConfig.getPenaltyPerDay());
        result.setMessage(String.format("您的借书已经过期 %d 天，请打印本罚款单后尽快归还！", dayDelta));
        result.setPrintDate(timeUtil.getLocalDateOfDefaultOffset());
        result.setExpireDays(dayDelta);
        return result;
    }

    @Override
    public BookStatisticResult getStatistics(User user) {
        BookStatisticResult result = new BookStatisticResult();
        result.setTotalBook(bookRepository.countByStatusNot(BookStatus.CANCELLED));
        result.setRegisteredUser(userRepository.count());
        result.setBorrowedBook(bookRepository.countByStatus(BookStatus.BORROWED));
        result.setSoonExpireBorrow(
                borrowRepository.countByExpireDateBetweenAndUser(
                        timeUtil.getLocalDateOfDefaultOffset(),
                        timeUtil.getLocalDateOfDefaultOffset().plusDays(7),
                        user
                )
        );
        result.setMyBorrow(
                borrowRepository.countByUserAndStatusNot(user, BorrowStatus.RETURNED)
        );
        result.setMyTotalBorrow(
                borrowRepository.countByUser(user)
        );
        return result;
    }

    @Override
    public List<List<Object>> getBookRank() {
        return borrowRepository.getBookRankRaw();
    }

    private Book getBookByIdOrThrow(String bookId) {
        return bookRepository.findByIdAndStatusNot(Long.parseLong(bookId), BookStatus.CANCELLED)
                .orElseThrow(() -> new GeneralException(40000, "bookId is invalid"));
    }

    private Borrow getBorrowByIdOrThrow(Long borrowId) {
        return borrowRepository.findByIdAndStatusNot(borrowId, BorrowStatus.DELETED)
                .orElseThrow(() -> new GeneralException(40000, "borrowID is invalid"));
    }
}
