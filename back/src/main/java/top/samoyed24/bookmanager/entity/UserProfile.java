package top.samoyed24.bookmanager.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Getter
@Setter
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 姓名
    @Column(nullable = false)
    private String name;

    // 学号/工号
    @Column(unique = true, nullable = false)
    private String workNumber;

    // 身份证号
    @Column(unique = true, nullable = false)
    private String idNumber;

    // 学院名称
    @Column(nullable = false)
    private String facultyName;

    // 专业
    @Column
    private String major;

    // 年级
    @Column
    private String grade;

    // 是否已毕业
    @Column(nullable = false)
    private boolean graduated = false;

    // 是否有效
    @Column(nullable = false)
    private boolean valid = true;

    @Column(nullable = false)
    @CreationTimestamp
    private OffsetDateTime registerTime;

    @OneToOne(mappedBy = "profile")
    private User user;
}
