package top.samoyed24.bookmanager.dto.request.book;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddEditBookRequest {
    private String id;
    private String clsNo;
    private String publishNo;
    private String name;
    private String author;
    private String description;
    private String publisher;
    private String price;
    private String purchaseDate;
}
