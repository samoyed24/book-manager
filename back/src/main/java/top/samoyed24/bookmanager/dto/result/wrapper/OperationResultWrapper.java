package top.samoyed24.bookmanager.dto.result.wrapper;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OperationResultWrapper {
    private boolean success;
    private String reason;
}
