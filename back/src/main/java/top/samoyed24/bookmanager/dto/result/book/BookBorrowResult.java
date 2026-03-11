package top.samoyed24.bookmanager.dto.result.book;

import lombok.Getter;
import lombok.Setter;
import top.samoyed24.bookmanager.dto.result.wrapper.OperationResultWrapper;

@Getter
@Setter
public class BookBorrowResult extends OperationResultWrapper {
    private String expireDate;
}
