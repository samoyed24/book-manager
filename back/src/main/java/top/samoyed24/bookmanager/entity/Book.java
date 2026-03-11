package top.samoyed24.bookmanager.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import top.samoyed24.bookmanager.constant.BookStatus;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 图书分类号
    @Column(nullable = false)
    private String clsNo;

    // 出版号
    // 有 ID 作为唯一区分，出版号可以不唯一
    @Column(nullable = false)
    private String publishNo;

    // 书名
    @Column(nullable = false)
    private String name;

    // 作者
    @Column(nullable = false)
    private String author;

    // 内容摘要
    @Column(nullable = true, columnDefinition = "TEXT")
    private String description;

    // 出版社
    @Column(nullable = false)
    private String publisher;

    // 价格
    @Column(nullable = false)
    private String price;

    // 购入日期
    @Column(nullable = true)
    private LocalDate purchaseDate;

    // 状态
    // borrowed，available，cancelled
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookStatus status;
}
