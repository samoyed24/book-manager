package top.samoyed24.bookmanager.dto.request.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditUserRequest {
    private String username;
    private String name;
    private String facultyName;
    private String major;
    private String grade;
    private boolean graduated;
}
