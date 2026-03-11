package top.samoyed24.bookmanager.dto.result.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpResult {
    private boolean success;
    private Integer rank;

    public SignUpResult(boolean success, Integer rank) {
        this.success = success;
        this.rank = rank;
    }
}
