package top.samoyed24.bookmanager.dto.result.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoResult {
    private long registerDay;
    private boolean signedUpToday;
    private Integer signUpRank;

    public UserInfoResult() {}

    public UserInfoResult(long registerDay, boolean signedUpToday, Integer signUpRank) {
        this.registerDay = registerDay;
        this.signedUpToday = signedUpToday;
        this.signUpRank = signUpRank;
    }
}
