package top.samoyed24.bookmanager.dto.result.book;

import lombok.Getter;
import lombok.Setter;
import top.samoyed24.bookmanager.constant.BorrowStatus;
import top.samoyed24.bookmanager.entity.Borrow;

import java.util.Optional;

@Getter
@Setter
public class GetBorrowQueryResult {
    private Long id;
    private String borrowerUsername;
    private Long borrowerId;
    private String bookName;
    private Long bookId;
    private String borrowDate;
    private String expireDate;
    private String returnDate;
    private String borrowerName;
    private BorrowStatus status;

    public GetBorrowQueryResult(Borrow borrow) {
        id = borrow.getId();
        borrowerUsername = borrow.getUser().getUsername();
        borrowerName = borrow.getUser().getProfile().getName();
        borrowerId = borrow.getUser().getId();
        bookName = borrow.getBook().getName();
        bookId = borrow.getBook().getId();
        borrowDate = borrow.getBorrowDate().toString();
        expireDate = borrow.getExpireDate().toString();
        returnDate = Optional.ofNullable(borrow.getReturnDate())
                .map(Object::toString)
                .orElse(null);
        status = borrow.getStatus();
    }
}
