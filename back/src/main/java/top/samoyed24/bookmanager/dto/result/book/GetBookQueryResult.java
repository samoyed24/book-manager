package top.samoyed24.bookmanager.dto.result.book;

import lombok.Getter;
import lombok.Setter;
import top.samoyed24.bookmanager.constant.BookStatus;
import top.samoyed24.bookmanager.entity.Book;

@Getter
@Setter
public class GetBookQueryResult {
    private String id;
    private String clsNo;
    private String publishNo;
    private String name;
    private String author;
    private String publisher;
    private BookStatus status;

    public GetBookQueryResult(Book book) {
        id = book.getId().toString();
        clsNo = book.getClsNo();
        publishNo = book.getPublishNo();
        name = book.getName();
        author = book.getAuthor();
        publisher = book.getPublisher();
        status = book.getStatus();
    }
}
