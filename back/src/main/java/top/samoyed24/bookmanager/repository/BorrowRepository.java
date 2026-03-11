package top.samoyed24.bookmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import top.samoyed24.bookmanager.constant.BorrowStatus;
import top.samoyed24.bookmanager.entity.Book;
import top.samoyed24.bookmanager.entity.Borrow;
import top.samoyed24.bookmanager.entity.User;
import top.samoyed24.bookmanager.entity.UserProfile;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface BorrowRepository extends JpaRepository<Borrow, Long>, JpaSpecificationExecutor<Borrow> {
    Optional<Borrow> findByIdAndStatusNot(Long id, BorrowStatus status);
    List<Borrow> findByUserAndStatusNot(User user, BorrowStatus status);
    boolean existsByUserAndStatus(User user, BorrowStatus status);
    boolean existsByUserAndStatusIn(User user, Collection<BorrowStatus> statuses);
    Long countByExpireDateBetweenAndUser(LocalDate start, LocalDate end, User user);
    Long countByUserAndStatusNot(User user, BorrowStatus status);
    Long countByUser(User user);

    @Query("""
        select b.book.name, count(b.id)
        from Borrow b
        where b.status <> top.samoyed24.bookmanager.constant.BorrowStatus.DELETED
        group by b.book.name
        order by count(b.id) desc
    """)
    List<List<Object>> getBookRankRaw();
}
