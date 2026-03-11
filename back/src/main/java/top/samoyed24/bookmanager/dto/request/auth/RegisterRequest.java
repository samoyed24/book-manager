package top.samoyed24.bookmanager.dto.request.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String username;
    private String password;
    private String name;
    private String workNumber;
    private String idNumber;
    private String facultyName;
    private String major;
    private String grade;
}
