package top.samoyed24.bookmanager.dto.result.book;

import top.samoyed24.bookmanager.constant.BookStatus;
import top.samoyed24.bookmanager.entity.Book;

public class GetBookDetailsResult {
    public String id;
    public String clsNo;
    public String publishNo;
    public String name;
    public String author;
    public String description;
    public String price;
    public String publisher;
    public String purchaseDate;
    public BookStatus status;
}
