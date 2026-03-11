package top.samoyed24.bookmanager.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import top.samoyed24.bookmanager.dto.request.user.EditUserRequest;
import top.samoyed24.bookmanager.dto.request.user.GetUserQueryRequest;
import top.samoyed24.bookmanager.dto.result.user.GetSpecUserResult;
import top.samoyed24.bookmanager.dto.result.user.GetUserQueryResult;
import top.samoyed24.bookmanager.dto.result.user.SignUpResult;
import top.samoyed24.bookmanager.dto.result.user.UserInfoResult;
import top.samoyed24.bookmanager.dto.result.wrapper.OperationResultWrapper;
import top.samoyed24.bookmanager.entity.User;


@Service
public interface UserService {
    SignUpResult signUp(User user);
    UserInfoResult getUserInfo(User user);
    Page<GetUserQueryResult> getUserQuery(GetUserQueryRequest getUserQueryRequest);
    OperationResultWrapper cancelUser(String username);
    GetSpecUserResult getSpecUser(String username);
    OperationResultWrapper editUser(EditUserRequest editUserRequest);
}
