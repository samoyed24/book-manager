package top.samoyed24.bookmanager.dto.result.auth;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LoginResult {
    private String username;
    private String token;
    private List<String> roles;

    public LoginResult(String username, List<String> roles, String token) {
        this.username = username;
        this.roles = roles;
        this.token = token;
    }
}
