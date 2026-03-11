package top.samoyed24.bookmanager.service;
import top.samoyed24.bookmanager.dto.request.auth.CheckDuplicatedRequest;
import top.samoyed24.bookmanager.dto.request.auth.LoginRequest;
import top.samoyed24.bookmanager.dto.request.auth.RegisterRequest;
import top.samoyed24.bookmanager.dto.result.auth.CheckDuplicatedResult;
import top.samoyed24.bookmanager.dto.result.auth.LoginResult;
import top.samoyed24.bookmanager.dto.result.auth.RegisterResult;


public interface AuthService {
    RegisterResult register(RegisterRequest registerRequest);
    LoginResult login(LoginRequest loginRequest);
    CheckDuplicatedResult checkDuplicated(CheckDuplicatedRequest checkDuplicatedRequest);
}