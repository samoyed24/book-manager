package top.samoyed24.bookmanager.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import top.samoyed24.bookmanager.dto.request.book.AddEditBookRequest;
import top.samoyed24.bookmanager.dto.request.book.GetBookDetailsRequest;
import top.samoyed24.bookmanager.dto.request.book.GetBookQueryRequest;
import top.samoyed24.bookmanager.dto.request.book.GetBorrowQueryRequest;
import top.samoyed24.bookmanager.dto.request.book.wrapper.BookRequestWrapper;
import top.samoyed24.bookmanager.dto.result.book.*;
import top.samoyed24.bookmanager.dto.result.wrapper.OperationResultWrapper;
import top.samoyed24.bookmanager.entity.User;

import java.util.List;

@Service
public interface BookService {
    Page<GetBookQueryResult> getBookQuery(GetBookQueryRequest getBookQueryRequest);
    GetBookDetailsResult getBookDetails(GetBookDetailsRequest getBookDetailsRequest);
    Page<GetBorrowQueryResult> getBorrowQuery(GetBorrowQueryRequest getBorrowQueryRequest);
    BookBorrowResult borrowBook(BookRequestWrapper bookBorrowRequest, User user);
    BookBorrowResult renewBorrow(Long borrowId);
    OperationResultWrapper returnBorrow(Long borrowId);
    OperationResultWrapper deleteBorrow(Long borrowId);
    OperationResultWrapper cancelBook(String bookId);
    OperationResultWrapper addBook(AddEditBookRequest addEditBookRequest);
    OperationResultWrapper editBook(AddEditBookRequest addEditBookRequest);
    Page<GetBorrowQueryResult> userGetBorrowQuery(GetBorrowQueryRequest getBorrowQueryRequest, User user);
    BorrowPenaltyResult getPenalty(Long borrowId, User user);
    BookStatisticResult getStatistics(User user);
    List<List<Object>> getBookRank();
}
