package top.samoyed24.bookmanager.repository;

import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import top.samoyed24.bookmanager.constant.BookStatus;
import top.samoyed24.bookmanager.entity.Book;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>, JpaSpecificationExecutor<Book> {
    boolean existsById(@NonNull Long id);
    @SuppressWarnings("BooleanMethodIsAlwaysInverted")
    boolean existsByPublishNo(String publishNo);
    Optional<Book> findByIdAndStatusNot(Long id, BookStatus bookStatus);
    Long countByStatusNot(BookStatus bookStatus);
    Long countByStatus(BookStatus bookStatus);
}