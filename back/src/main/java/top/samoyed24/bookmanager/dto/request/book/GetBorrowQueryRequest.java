package top.samoyed24.bookmanager.dto.request.book;

import lombok.Getter;
import lombok.Setter;
import top.samoyed24.bookmanager.constant.BorrowStatus;
import top.samoyed24.bookmanager.dto.request.wrapper.TableQueryRequestWrapper;

import java.time.LocalDate;

@Getter
@Setter
public class GetBorrowQueryRequest extends TableQueryRequestWrapper {
    private String borrower;
    private String book;
    private BorrowStatus status;
    private String expireTimeFrom;
    private String expireTimeTo;
}
