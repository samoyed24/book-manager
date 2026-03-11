package top.samoyed24.bookmanager.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.samoyed24.bookmanager.common.ApiResponse;
import top.samoyed24.bookmanager.dto.request.auth.CheckDuplicatedRequest;
import top.samoyed24.bookmanager.dto.request.auth.LoginRequest;
import top.samoyed24.bookmanager.dto.request.auth.RegisterRequest;
import top.samoyed24.bookmanager.dto.result.auth.CheckDuplicatedResult;
import top.samoyed24.bookmanager.dto.result.auth.LoginResult;
import top.samoyed24.bookmanager.exception.GeneralException;
import top.samoyed24.bookmanager.mapper.AuthMapper;
import top.samoyed24.bookmanager.service.impl.AuthServiceImpl;
import top.samoyed24.bookmanager.vo.auth.LoginResponse;
import top.samoyed24.bookmanager.config.JwtProperties;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthServiceImpl authService;
    private final AuthMapper authMapper;
    private final JwtProperties jwtProperties;

    public AuthController(AuthServiceImpl authService, AuthMapper authMapper, JwtProperties jwtProperties) {
        this.authService = authService;
        this.authMapper = authMapper;
        this.jwtProperties = jwtProperties;
    }

    @PostMapping("/register")
    public ApiResponse<LoginResponse> registerUser(@RequestBody RegisterRequest registerRequest, HttpServletResponse response) {
        authService.register(registerRequest);
        return loginUser(authMapper.toLoginRequestDTO(registerRequest), response);
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken)) {
            throw new GeneralException(40003, "请不要重复登录");
        }
        LoginResult loginResult = authService.login(loginRequest);
        Cookie cookie = new Cookie("token", loginResult.getToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) jwtProperties.getExpiration() / 1000);

        response.addCookie(cookie);
        return ApiResponse.success(authMapper.toLoginResponseDTO(loginResult));
    }

    @PostMapping("/checkDuplicated")
    public ApiResponse<CheckDuplicatedResult> checkDuplicated(@RequestBody CheckDuplicatedRequest checkDuplicatedRequest) {
        CheckDuplicatedResult checkDuplicatedResult = authService.checkDuplicated(checkDuplicatedRequest);
        return ApiResponse.success(checkDuplicatedResult);
    }

    @PostMapping("/logout")
    public ApiResponse<?> logoutUser(HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || (auth instanceof AnonymousAuthenticationToken)) {
            throw new GeneralException(40003, "您未登录");
        }
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);
        return ApiResponse.success(null);
    }
}
