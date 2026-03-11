package top.samoyed24.bookmanager.util.initializers;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import top.samoyed24.bookmanager.entity.Role;
import top.samoyed24.bookmanager.entity.User;
import top.samoyed24.bookmanager.entity.UserProfile;
import top.samoyed24.bookmanager.repository.RoleRepository;
import top.samoyed24.bookmanager.repository.UserProfileRepository;
import top.samoyed24.bookmanager.repository.UserRepository;

@Component
public class UserInitializer {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserProfileRepository userProfileRepository;

    public UserInitializer(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder, UserProfileRepository userProfileRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userProfileRepository = userProfileRepository;
    }

    public void run() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElseThrow();

            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.getRoles().add(adminRole);

            UserProfile adminProfile = new UserProfile();
            adminProfile.setName("孙铭阳");
            adminProfile.setFacultyName("信息工程与自动化学院（人工智能产业学院）");
            adminProfile.setGrade("2022");
            adminProfile.setMajor("人工智能");
            adminProfile.setWorkNumber("202210114104");
            adminProfile.setIdNumber("123123456456123456");
            userProfileRepository.save(adminProfile);
            admin.setProfile(adminProfile);
            userRepository.save(admin);
        }
        if (userRepository.findByUsername("jia.xiang").isEmpty()) {
            Role userRole = roleRepository.findByName("ROLE_USER").orElseThrow();

            User user = new User();
            user.setUsername("jia.xiang");
            user.setPassword(passwordEncoder.encode("testpassword"));
            user.getRoles().add(userRole);

            UserProfile userProfile = new UserProfile();
            userProfile.setName("向佳");
            userProfile.setFacultyName("信息工程与自动化学院（人工智能产业学院）");
            userProfile.setGrade("2022");
            userProfile.setMajor("人工智能");
            userProfile.setWorkNumber("202210114103");
            userProfile.setIdNumber("114514191981011451");
            userProfileRepository.save(userProfile);
            user.setProfile(userProfile);
            userRepository.save(user);
        }
    }
}
