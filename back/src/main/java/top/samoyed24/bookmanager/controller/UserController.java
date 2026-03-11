package top.samoyed24.bookmanager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import top.samoyed24.bookmanager.common.ApiResponse;
import top.samoyed24.bookmanager.dto.request.user.GetUserQueryRequest;
import top.samoyed24.bookmanager.dto.result.user.GetUserQueryResult;
import top.samoyed24.bookmanager.dto.result.user.SignUpResult;
import top.samoyed24.bookmanager.dto.result.user.UserInfoResult;
import top.samoyed24.bookmanager.entity.CustomUserDetails;
import top.samoyed24.bookmanager.service.UserService;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signUp")
    public ApiResponse<SignUpResult> signUp(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ApiResponse.success(userService.signUp(userDetails.user()));
    }

    @GetMapping("/getUserInfo")
    public ApiResponse<UserInfoResult> getUserInfoInfo(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ApiResponse.success(userService.getUserInfo(userDetails.user()));
    }

    @GetMapping("/getUsers")
    public ApiResponse<Page<GetUserQueryResult>> getUserQueryResult(GetUserQueryRequest getUserQueryRequest) {
        return ApiResponse.success(userService.getUserQuery(getUserQueryRequest));
    }
}
