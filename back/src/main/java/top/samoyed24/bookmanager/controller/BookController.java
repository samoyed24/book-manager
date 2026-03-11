package top.samoyed24.bookmanager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import top.samoyed24.bookmanager.common.ApiResponse;
import top.samoyed24.bookmanager.dto.request.book.GetBookDetailsRequest;
import top.samoyed24.bookmanager.dto.request.book.GetBookQueryRequest;
import top.samoyed24.bookmanager.dto.request.book.GetBorrowQueryRequest;
import top.samoyed24.bookmanager.dto.request.book.wrapper.BookRequestWrapper;
import top.samoyed24.bookmanager.dto.request.book.wrapper.BorrowRequestWrapper;
import top.samoyed24.bookmanager.dto.result.book.*;
import top.samoyed24.bookmanager.entity.CustomUserDetails;
import top.samoyed24.bookmanager.service.BookService;

import java.util.List;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping("/getBooks")
    public ApiResponse<Page<GetBookQueryResult>> getBookQuery(GetBookQueryRequest getBookQueryRequest) {
        return ApiResponse.success(bookService.getBookQuery(getBookQueryRequest));
    }

    @GetMapping("/getBorrow")
    public ApiResponse<Page<GetBorrowQueryResult>> getBorrowQuery(
            GetBorrowQueryRequest getBorrowQueryRequest,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ApiResponse.success(bookService.userGetBorrowQuery(
                getBorrowQueryRequest,
                userDetails.user()
        ));
    }

    @GetMapping("/getBookDetails")
    public ApiResponse<GetBookDetailsResult> getBookDetails(GetBookDetailsRequest getBookDetailsRequest) {
        return ApiResponse.success(bookService.getBookDetails(getBookDetailsRequest));
    }

    @PostMapping("/borrow")
    public ApiResponse<BookBorrowResult> borrowBook(
            @RequestBody BookRequestWrapper bookBorrowRequest, @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ApiResponse.success(bookService.borrowBook(bookBorrowRequest, userDetails.user()));
    }

    @GetMapping("/getPenalty")
    public ApiResponse<BorrowPenaltyResult> getPenalty(
            BorrowRequestWrapper borrowRequestWrapper,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ApiResponse.success(bookService.getPenalty(borrowRequestWrapper.getBorrowId(), userDetails.user()));
    }

    @GetMapping("/getStatistics")
    public ApiResponse<BookStatisticResult> getStatistics(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ApiResponse.success(bookService.getStatistics(userDetails.user()));
    }

    @GetMapping("/getBookRank")
    public ApiResponse<List<List<Object>>> getBookRank() {
        return ApiResponse.success(bookService.getBookRank());
    }
}
