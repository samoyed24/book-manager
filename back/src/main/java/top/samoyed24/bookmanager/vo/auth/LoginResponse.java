package top.samoyed24.bookmanager.vo.auth;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LoginResponse {
    private String username;
    private List<String> roles;
    // 后续拓展

    public LoginResponse(String username, List<String> roles) {
        this.username = username;
        this.roles = roles;
    }
}
