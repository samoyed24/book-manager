package top.samoyed24.bookmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import top.samoyed24.bookmanager.entity.UserProfile;

import java.util.List;

public interface UserProfileRepository extends JpaRepository<UserProfile,Long> {
    boolean existsByIdNumber(String idNumber);
    boolean existsByWorkNumber(String workNumber);

    List<UserProfile> findByWorkNumber(String workNumber);
}
