package top.samoyed24.bookmanager.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import top.samoyed24.bookmanager.dto.request.auth.LoginRequest;
import top.samoyed24.bookmanager.dto.request.auth.RegisterRequest;
import top.samoyed24.bookmanager.dto.result.auth.LoginResult;
import top.samoyed24.bookmanager.dto.result.auth.RegisterResult;
import top.samoyed24.bookmanager.dto.result.user.GetSpecUserResult;
import top.samoyed24.bookmanager.entity.UserProfile;
import top.samoyed24.bookmanager.util.time.TimeUtil;
import top.samoyed24.bookmanager.vo.auth.LoginResponse;
import top.samoyed24.bookmanager.vo.auth.RegisterResponse;

@Mapper(componentModel = "spring", uses = TimeUtil.class)
public interface AuthMapper {
    RegisterResponse toRegisterResponseDTO(RegisterResult registerResult);
    LoginResponse toLoginResponseDTO(LoginResult loginResult);
    UserProfile toUserProfile(RegisterRequest registerRequest);
    LoginRequest toLoginRequestDTO(RegisterRequest registerRequest);
    @Mapping(
            source = "registerTime",
            target = "registerTime",
            qualifiedByName = "offsetDateToLocalDateString"
    )
    GetSpecUserResult toGetUserResultDTO(UserProfile userProfile);
}
