package top.samoyed24.bookmanager.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import top.samoyed24.bookmanager.dto.request.auth.CheckDuplicatedRequest;
import top.samoyed24.bookmanager.dto.request.auth.LoginRequest;
import top.samoyed24.bookmanager.dto.request.auth.RegisterRequest;
import top.samoyed24.bookmanager.dto.result.auth.CheckDuplicatedResult;
import top.samoyed24.bookmanager.dto.result.auth.LoginResult;
import top.samoyed24.bookmanager.dto.result.auth.RegisterResult;
import top.samoyed24.bookmanager.entity.Role;
import top.samoyed24.bookmanager.entity.User;
import top.samoyed24.bookmanager.entity.UserProfile;
import top.samoyed24.bookmanager.exception.GeneralException;
import top.samoyed24.bookmanager.mapper.AuthMapper;
import top.samoyed24.bookmanager.repository.RoleRepository;
import top.samoyed24.bookmanager.repository.UserProfileRepository;
import top.samoyed24.bookmanager.repository.UserRepository;
import top.samoyed24.bookmanager.service.AuthService;
import top.samoyed24.bookmanager.util.jwt.JwtUtil;
import top.samoyed24.bookmanager.util.time.TimeUtil;

import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserProfileRepository userProfileRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final AuthMapper authMapper;
    private final TimeUtil timeUtil;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            RoleRepository roleRepository,
            UserProfileRepository userProfileRepository,
            JwtUtil jwtUtil,
            AuthenticationManager authenticationManager,
            AuthMapper authMapper,
            TimeUtil timeUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userProfileRepository = userProfileRepository;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.authMapper = authMapper;
        this.timeUtil = timeUtil;
    }

    @Override
    public RegisterResult register(RegisterRequest registerRequest) {
        String hashedPassword = passwordEncoder.encode(registerRequest.getPassword());
        Role defaultRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("默认角色不存在"));

        UserProfile userProfile = authMapper.toUserProfile(registerRequest);
        userProfile.setRegisterTime(timeUtil.getLocalOffsetDateTime());
        userProfileRepository.save(userProfile);
        User user = new User(registerRequest.getUsername(), hashedPassword, userProfile);
        user.getRoles().add(defaultRole);
        return new RegisterResult(userRepository.save(user).getUsername(), generateToken(user));
    }

    @Override
    public LoginResult login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (BadCredentialsException | UsernameNotFoundException e) {
            throw new GeneralException(40003, "用户名或密码错误");
        }
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new GeneralException(40003, "用户不存在"));
            // 新增对已注销用户的判断
            if (!user.getProfile().isValid()) {
                throw new GeneralException(40003, "用户不存在");
            }
            return new LoginResult(
                    user.getUsername(),
                    user.getRoles().stream()
                                    .map(Role::getName)
                                            .collect(Collectors.toList()),
                    generateToken(user)
            );
        }

    @Override
    public CheckDuplicatedResult checkDuplicated(CheckDuplicatedRequest checkDuplicatedRequest) {
        CheckDuplicatedResult checkDuplicatedResult = new CheckDuplicatedResult();
        checkDuplicatedResult.isDuplicated = checkDuplicated(checkDuplicatedRequest.getField(), checkDuplicatedRequest.getValue());
        return checkDuplicatedResult;
    }

    private boolean checkDuplicated(String field, String value) {
        return switch (field) {
            case "username" -> userRepository.existsByUsername(value);
            case "workNumber" -> userProfileRepository.existsByWorkNumber(value);
            case "idNumber" -> userProfileRepository.existsByIdNumber(value);
            default -> throw new GeneralException(40000, "Invalid input for field: " + field);
        };
    }

    private String generateToken(User user) {
        return jwtUtil.generateToken(user.getUsername());
    }
}
