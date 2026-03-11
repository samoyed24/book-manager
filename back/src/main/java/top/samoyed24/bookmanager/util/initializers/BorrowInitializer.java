package top.samoyed24.bookmanager.util.initializers;

import org.springframework.stereotype.Component;
import top.samoyed24.bookmanager.constant.BookStatus;
import top.samoyed24.bookmanager.constant.BorrowStatus;
import top.samoyed24.bookmanager.entity.Book;
import top.samoyed24.bookmanager.entity.Borrow;
import top.samoyed24.bookmanager.entity.User;
import top.samoyed24.bookmanager.repository.BookRepository;
import top.samoyed24.bookmanager.repository.BorrowRepository;
import top.samoyed24.bookmanager.repository.UserRepository;
import top.samoyed24.bookmanager.util.time.TimeUtil;

import java.time.LocalDate;
import java.util.Optional;

@Component
public class BorrowInitializer {
    UserRepository userRepository;
    BookRepository bookRepository;
    BorrowRepository borrowRepository;
    TimeUtil timeUtil;

    public BorrowInitializer(
            UserRepository userRepository,
            BookRepository bookRepository,
            BorrowRepository borrowRepository,
            TimeUtil timeUtil
    ) {
        this.userRepository = userRepository;
        this.borrowRepository = borrowRepository;
        this.bookRepository = bookRepository;
        this.timeUtil = timeUtil;
    }

    public void run() {
        if (borrowRepository.findById(1L).isEmpty()) {
            Book book = bookRepository.findById(14L).orElseThrow();
            genBorrow(
                    14L,
                    "admin",
                    BorrowStatus.NORMAL,
                    timeUtil.getLocalDateOfDefaultOffset(),
                    timeUtil.getLocalDateOfDefaultOffset().plusDays(30)
            );
            book.setStatus(BookStatus.BORROWED);
            bookRepository.save(book);
        }
        if (borrowRepository.findById(2L).isEmpty()) {
            Book book = bookRepository.findById(15L).orElseThrow();
            genBorrow(
                    15L,
                    "jia.xiang",
                    BorrowStatus.EXPIRED,
                    timeUtil.getLocalDateOfDefaultOffset().minusDays(30),
                    timeUtil.getLocalDateOfDefaultOffset()
            );
            book.setStatus(BookStatus.BORROWED);
            bookRepository.save(book);
        }

        if (borrowRepository.findById(3L).isEmpty()) {
            genBorrow(
                    1L,
                    "jia.xiang",
                    BorrowStatus.RETURNED,
                    timeUtil.getLocalDateOfDefaultOffset(),
                    timeUtil.getLocalDateOfDefaultOffset().plusDays(30)
            );
        }
        if (borrowRepository.findById(4L).isEmpty()) {
            genBorrow(
                    1L,
                    "jia.xiang",
                    BorrowStatus.RETURNED,
                    timeUtil.getLocalDateOfDefaultOffset(),
                    timeUtil.getLocalDateOfDefaultOffset().plusDays(30)
            );
        }
        if (borrowRepository.findById(5L).isEmpty()) {
            genBorrow(
                    1L,
                    "jia.xiang",
                    BorrowStatus.RETURNED,
                    timeUtil.getLocalDateOfDefaultOffset(),
                    timeUtil.getLocalDateOfDefaultOffset().plusDays(30)
            );
        }
        if (borrowRepository.findById(6L).isEmpty()) {
            genBorrow(
                    1L,
                    "jia.xiang",
                    BorrowStatus.RETURNED,
                    timeUtil.getLocalDateOfDefaultOffset(),
                    timeUtil.getLocalDateOfDefaultOffset().plusDays(30)
            );
        }
        if (borrowRepository.findById(7L).isEmpty()) {
            genBorrow(
                    1L,
                    "jia.xiang",
                    BorrowStatus.RETURNED,
                    timeUtil.getLocalDateOfDefaultOffset(),
                    timeUtil.getLocalDateOfDefaultOffset().plusDays(30)
            );
        }
        if (borrowRepository.findById(8L).isEmpty()) {
            genBorrow(
                    1L,
                    "jia.xiang",
                    BorrowStatus.RETURNED,
                    timeUtil.getLocalDateOfDefaultOffset(),
                    timeUtil.getLocalDateOfDefaultOffset().plusDays(30)
            );
        }
        if (borrowRepository.findById(9L).isEmpty()) {
            genBorrow(
                    1L,
                    "jia.xiang",
                    BorrowStatus.RETURNED,
                    timeUtil.getLocalDateOfDefaultOffset(),
                    timeUtil.getLocalDateOfDefaultOffset().plusDays(30)
            );
        }
        if (borrowRepository.findById(10L).isEmpty()) {
            genBorrow(
                    2L,
                    "jia.xiang",
                    BorrowStatus.RETURNED,
                    timeUtil.getLocalDateOfDefaultOffset(),
                    timeUtil.getLocalDateOfDefaultOffset().plusDays(30)
            );
        }
        if (borrowRepository.findById(11L).isEmpty()) {
            genBorrow(
                    2L,
                    "jia.xiang",
                    BorrowStatus.RETURNED,
                    timeUtil.getLocalDateOfDefaultOffset(),
                    timeUtil.getLocalDateOfDefaultOffset().plusDays(30)
            );
        }
        if (borrowRepository.findById(12L).isEmpty()) {
            genBorrow(
                    3L,
                    "jia.xiang",
                    BorrowStatus.RETURNED,
                    timeUtil.getLocalDateOfDefaultOffset(),
                    timeUtil.getLocalDateOfDefaultOffset().plusDays(30)
            );
        }
        if (borrowRepository.findById(13L).isEmpty()) {
            genBorrow(
                    3L,
                    "jia.xiang",
                    BorrowStatus.RETURNED,
                    timeUtil.getLocalDateOfDefaultOffset(),
                    timeUtil.getLocalDateOfDefaultOffset().plusDays(30)
            );
        }
        if (borrowRepository.findById(14L).isEmpty()) {
            genBorrow(
                    4L,
                    "jia.xiang",
                    BorrowStatus.RETURNED,
                    timeUtil.getLocalDateOfDefaultOffset(),
                    timeUtil.getLocalDateOfDefaultOffset().plusDays(30)
            );
        }
    }

    private void genBorrow(Long bookId, String username, BorrowStatus borrowStatus, LocalDate from, LocalDate to) {
        Optional<User> user = userRepository.findByUsername(username);
        Optional<Book> book = bookRepository.findById(bookId);
        if (user.isEmpty() || book.isEmpty()) return;
        Borrow borrow = new Borrow();
        Book book1 = book.get();
        User user1 = user.get();
        borrow.setBook(book1);
        borrow.setUser(user1);
        borrow.setBorrowDate(from);
        borrow.setExpireDate(to);
        borrow.setStatus(borrowStatus);
        if (borrowStatus == BorrowStatus.RETURNED) {
            borrow.setReturnDate(timeUtil.getLocalDateOfDefaultOffset());
        }
        borrowRepository.save(borrow);
    }
}
