package top.samoyed24.bookmanager.dto.result.user;

import lombok.Getter;
import lombok.Setter;
import top.samoyed24.bookmanager.entity.Role;
import top.samoyed24.bookmanager.entity.User;
import top.samoyed24.bookmanager.entity.UserProfile;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class GetUserQueryResult {
    private String username;
    private String name;
    private String workNumber;
    private String idNumber;
    private String facultyName;
    private String major;
    private String grade;
    private boolean isGraduated;
    private boolean isValid;
    private String userRole;

    public GetUserQueryResult(User user) {
        UserProfile profile = user.getProfile();
        this.username = user.getUsername();
        this.name = profile.getName();
        this.workNumber = profile.getWorkNumber();
        this.idNumber = profile.getIdNumber();
        this.facultyName = profile.getFacultyName();
        this.major = profile.getMajor();
        this.grade = profile.getGrade();
        this.isGraduated = profile.isGraduated();
        this.isValid = profile.isValid();
        this.userRole = user.getRoles().stream()
                .map(Role::getName)
                .findFirst().orElse(null);
    }
}
