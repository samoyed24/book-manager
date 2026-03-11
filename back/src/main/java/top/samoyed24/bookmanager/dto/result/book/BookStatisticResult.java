package top.samoyed24.bookmanager.dto.result.book;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookStatisticResult {
    Long totalBook;
    Long borrowedBook;
    Long registeredUser;
    Long myBorrow;
    Long soonExpireBorrow;
    Long myTotalBorrow;
}
