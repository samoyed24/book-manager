package top.samoyed24.bookmanager.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import top.samoyed24.bookmanager.dto.request.book.AddEditBookRequest;
import top.samoyed24.bookmanager.dto.result.book.GetBookDetailsResult;
import top.samoyed24.bookmanager.entity.Book;
import top.samoyed24.bookmanager.util.time.TimeUtil;

@Mapper(componentModel = "spring", uses = TimeUtil.class)
public interface BookMapper {
    GetBookDetailsResult toGetBookDetailsResultDTO(Book book);

    @Mapping(source = "purchaseDate", target = "purchaseDate", qualifiedByName = "dateTimeToLocalDate")
    Book addEditBookRequestDTOToBook(AddEditBookRequest addEditBookRequest);
}
