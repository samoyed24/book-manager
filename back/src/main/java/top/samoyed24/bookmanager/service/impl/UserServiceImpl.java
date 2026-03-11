package top.samoyed24.bookmanager.service.impl;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import top.samoyed24.bookmanager.constant.BorrowStatus;
import top.samoyed24.bookmanager.dto.request.user.EditUserRequest;
import top.samoyed24.bookmanager.dto.request.user.GetUserQueryRequest;
import top.samoyed24.bookmanager.dto.result.user.GetSpecUserResult;
import top.samoyed24.bookmanager.dto.result.user.GetUserQueryResult;
import top.samoyed24.bookmanager.dto.result.user.SignUpResult;
import top.samoyed24.bookmanager.dto.result.user.UserInfoResult;
import top.samoyed24.bookmanager.dto.result.wrapper.OperationResultWrapper;
import top.samoyed24.bookmanager.entity.Role;
import top.samoyed24.bookmanager.entity.SignUp;
import top.samoyed24.bookmanager.entity.User;
import top.samoyed24.bookmanager.entity.UserProfile;
import top.samoyed24.bookmanager.exception.GeneralException;
import top.samoyed24.bookmanager.mapper.AuthMapper;
import top.samoyed24.bookmanager.repository.*;
import top.samoyed24.bookmanager.service.UserService;
import top.samoyed24.bookmanager.util.PredicateBuilder;
import top.samoyed24.bookmanager.util.time.OffsetDateTimePair;
import top.samoyed24.bookmanager.util.time.TimeUtil;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserProfileRepository userProfileRepository;
    private final SignUpRepository signUpRepository;
    private final TimeUtil timeUtil;
    private final UserRepository userRepository;
    private final BorrowRepository borrowRepository;
    private final RoleRepository roleRepository;
    private final AuthMapper authMapper;

    public UserServiceImpl(
            SignUpRepository signUpRepository,
            TimeUtil timeUtil,
            UserRepository userRepository,
            BorrowRepository borrowRepository,
            UserProfileRepository userProfileRepository, RoleRepository roleRepository, AuthMapper authMapper) {
        this.signUpRepository = signUpRepository;
        this.timeUtil = timeUtil;
        this.userRepository = userRepository;
        this.borrowRepository = borrowRepository;
        this.userProfileRepository = userProfileRepository;
        this.roleRepository = roleRepository;
        this.authMapper = authMapper;
    }

    @Override
    public UserInfoResult getUserInfo(User user) {
        UserInfoResult userInfoResult = new UserInfoResult();
        Optional<SignUp> signUp = getUserSignUpToday(user);
        if (signUp.isPresent()) {
            userInfoResult.setSignUpRank(signUp.get().getRank());
            userInfoResult.setSignedUpToday(true);
        } else {
            userInfoResult.setSignedUpToday(false);
        }
        userInfoResult.setRegisterDay(getUserRegisterDay(user));
        return userInfoResult;
    }

    @Override
    public Page<GetUserQueryResult> getUserQuery(GetUserQueryRequest getUserQueryRequest) {
        Pageable pageable = PageRequest.of(
                getUserQueryRequest.getCurrentPage(),
                getUserQueryRequest.getPageSize(),
                Sort.by(Sort.Direction.DESC, "id")
        );
        return userRepository.findAll((root, query, cb) -> {
            Join<User, UserProfile> profileJoin = root.join("profile", JoinType.LEFT);
            return new PredicateBuilder(cb)
                    .like(getUserQueryRequest.getUsername(), root.get("username"))
                    .like(getUserQueryRequest.getName(), profileJoin.get("name"))
                    .like(getUserQueryRequest.getIdNumber(), profileJoin.get("idNumber"))
                    .like(getUserQueryRequest.getWorkNumber(), profileJoin.get("workNumber"))
                    .like(getUserQueryRequest.getFacultyName(), profileJoin.get("facultyName"))
                    .like(getUserQueryRequest.getMajor(), profileJoin.get("major"))
                    .like(getUserQueryRequest.getGrade(), profileJoin.get("grade"))
                    .equal(getUserQueryRequest.isGraduated(), profileJoin.get("graduated"))
                    .build();
        }, pageable)
                .map(GetUserQueryResult::new);
    }

    @Override
    public OperationResultWrapper cancelUser(String username) {
        OperationResultWrapper result = new OperationResultWrapper();
        User user = getUserByUsernameOrThrow(username);
        UserProfile userProfile = user.getProfile();
        if (!userProfile.isValid()) {
            throw new GeneralException(40000, "user has already been cancelled");
        }
        // 禁止注销管理员账户
        // 因为能注销的一定是管理员，就不加注销自己的判断了
        if (user.getRoles().contains(getAdminRole())) {
            throw new GeneralException(40000, "it is not possible to cancel admin account!");
        }
        List<BorrowStatus> includeStatuses = List.of(BorrowStatus.NORMAL, BorrowStatus.EXPIRED);
        if (borrowRepository.existsByUserAndStatusIn(user, includeStatuses)) {
            result.setSuccess(false);
            result.setReason("读者仍有未归还的书籍");
            return result;
        }
        userProfile.setValid(false);
        userProfileRepository.save(userProfile);
        result.setSuccess(true);
        return result;
    }

    @Override
    public SignUpResult signUp(User user) {
        if (this.checkIfUserHasSignedUpToday(user)) {
            throw new GeneralException(40003, "今日已签到");
        }
        SignUp signUp = new SignUp();
        signUp.setUser(user);
        signUp.setRank(this.countSignedUpUserToday() + 1);
        signUp.setSignUpTime(timeUtil.getLocalOffsetDateTime());
        signUpRepository.save(signUp);
        return new SignUpResult(true, signUp.getRank());
    }

    private Integer countSignedUpUserToday() {
        OffsetDateTimePair todayDateTimePair = timeUtil.getOffsetDateTimePairToday();
        return signUpRepository.countBySignUpTimeBetween(
                todayDateTimePair.getBeginTime(),
                todayDateTimePair.getEndTime()
        );
    }

    private boolean checkIfUserHasSignedUpToday(User user) {
        OffsetDateTimePair todayDateTimePair = timeUtil.getOffsetDateTimePairToday();

        return signUpRepository.existsBySignUpTimeBetweenAndUser(
                todayDateTimePair.getBeginTime(), todayDateTimePair.getEndTime(), user
        );
    }

    private Optional<SignUp> getUserSignUpToday(User user) {
        OffsetDateTimePair todayDateTimePair = timeUtil.getOffsetDateTimePairToday();

        return signUpRepository.getSignUpBySignUpTimeBetweenAndUser(
                todayDateTimePair.getBeginTime(), todayDateTimePair.getEndTime(), user
        );
    }

    @Override
    public GetSpecUserResult getSpecUser(String username) {
        User user = getUserByUsernameOrThrow(username);
        UserProfile userProfile = user.getProfile();
        GetSpecUserResult getSpecUserResult = authMapper.toGetUserResultDTO(userProfile);
        getSpecUserResult.setUsername(username);
        return getSpecUserResult;
    }

    @Override
    public OperationResultWrapper editUser(EditUserRequest editUserRequest) {
        User user = getUserByUsernameOrThrow(editUserRequest.getUsername());
        UserProfile userProfile = user.getProfile();
        userProfile.setGrade(editUserRequest.getGrade());
        userProfile.setFacultyName(editUserRequest.getFacultyName());
        userProfile.setMajor(editUserRequest.getMajor());
        userProfile.setName(editUserRequest.getName());
        userProfile.setGraduated(editUserRequest.isGraduated());
        userProfileRepository.save(userProfile);
        OperationResultWrapper result = new OperationResultWrapper();
        result.setSuccess(true);
        return result;
    }

    private long getUserRegisterDay(User user) {
        OffsetDateTime userRegisterTime = user.getProfile().getRegisterTime();
        return ChronoUnit.DAYS.between(
                userRegisterTime,
                timeUtil.getLocalOffsetDateTime()
        ) + 1;
    }

    private User getUserByUsernameOrThrow(String username) {
        return userRepository.findByUsername(username).
                orElseThrow(() -> new GeneralException(40000, "username is invalid!"));
    }

    private Role getAdminRole() {
        return roleRepository.findByName("ROLE_ADMIN")
                .orElseThrow(() -> new GeneralException(50000, "Admin Role is not exist"));
    }
}
