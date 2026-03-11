package top.samoyed24.bookmanager.dto.request.book;

import lombok.Getter;
import lombok.Setter;
import top.samoyed24.bookmanager.constant.BookStatus;
import top.samoyed24.bookmanager.dto.request.wrapper.TableQueryRequestWrapper;

@Getter
@Setter
public class GetBookQueryRequest extends TableQueryRequestWrapper {
    public String id;
    public String clsNo;
    public String publishNo;
    public String name;
    public String author;
    public String publisher;
    public BookStatus status;
}
