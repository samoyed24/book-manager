package top.samoyed24.bookmanager.util;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import top.samoyed24.bookmanager.entity.Role;
import top.samoyed24.bookmanager.entity.User;
import top.samoyed24.bookmanager.entity.UserProfile;
import top.samoyed24.bookmanager.repository.RoleRepository;
import top.samoyed24.bookmanager.repository.UserProfileRepository;
import top.samoyed24.bookmanager.repository.UserRepository;
import top.samoyed24.bookmanager.util.initializers.BookInitializer;
import top.samoyed24.bookmanager.util.initializers.BorrowInitializer;
import top.samoyed24.bookmanager.util.initializers.RoleInitializer;
import top.samoyed24.bookmanager.util.initializers.UserInitializer;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final RoleInitializer roleInitializer;
    private final UserInitializer userInitializer;
    private final BookInitializer bookInitializer;
    private final BorrowInitializer borrowInitializer;

    @Override
    public void run(String... args) {
        roleInitializer.run();
        userInitializer.run();
        bookInitializer.run();
        borrowInitializer.run();
    }
}
