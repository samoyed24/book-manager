package top.samoyed24.bookmanager.dto.result.user;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class GetSpecUserResult {
    private String username;
    private String name;
    private String workNumber;
    private String idNumber;
    private String facultyName;
    private String major;
    private String grade;
    private String registerTime;
    private boolean graduated;
}
