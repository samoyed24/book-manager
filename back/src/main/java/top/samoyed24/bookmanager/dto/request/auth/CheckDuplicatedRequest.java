package top.samoyed24.bookmanager.dto.request.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckDuplicatedRequest {
    private String field;
    private String value;
}
