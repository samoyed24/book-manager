package top.samoyed24.bookmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import top.samoyed24.bookmanager.entity.SignUp;
import top.samoyed24.bookmanager.entity.User;

import java.time.OffsetDateTime;
import java.util.Optional;

public interface SignUpRepository extends JpaRepository<SignUp, Long> {
    Integer countBySignUpTimeBetween(OffsetDateTime start, OffsetDateTime end);
    boolean existsBySignUpTimeBetweenAndUser(OffsetDateTime start, OffsetDateTime end, User user);
    Optional<SignUp> getSignUpBySignUpTimeBetweenAndUser(OffsetDateTime start, OffsetDateTime end, User user);
}
