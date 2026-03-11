package top.samoyed24.bookmanager.dto.result.book;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BorrowPenaltyResult {
    private String bookName;
    private String borrowerName;
    private String borrowerWorkNumber;
    private Double amount;
    private Long expireDays;
    private Double penaltyPerDay;
    private String message;
    private LocalDate printDate;
}
