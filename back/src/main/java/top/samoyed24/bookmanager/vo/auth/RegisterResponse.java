package top.samoyed24.bookmanager.vo.auth;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterResponse {
    private String username;
    // 后续拓展

    public RegisterResponse(String username){
        this.username = username;
    }

}
