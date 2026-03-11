package top.samoyed24.bookmanager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import top.samoyed24.bookmanager.common.ApiResponse;
import top.samoyed24.bookmanager.dto.request.auth.wrapper.UserRequestWrapper;
import top.samoyed24.bookmanager.dto.request.book.AddEditBookRequest;
import top.samoyed24.bookmanager.dto.request.book.GetBorrowQueryRequest;
import top.samoyed24.bookmanager.dto.request.book.wrapper.BookRequestWrapper;
import top.samoyed24.bookmanager.dto.request.book.wrapper.BorrowRequestWrapper;
import top.samoyed24.bookmanager.dto.request.user.EditUserRequest;
import top.samoyed24.bookmanager.dto.result.book.BookBorrowResult;
import top.samoyed24.bookmanager.dto.result.book.GetBorrowQueryResult;
import top.samoyed24.bookmanager.dto.result.user.GetSpecUserResult;
import top.samoyed24.bookmanager.dto.result.wrapper.OperationResultWrapper;
import top.samoyed24.bookmanager.service.BookService;
import top.samoyed24.bookmanager.service.UserService;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final BookService bookService;
    private final UserService userService;

    @GetMapping("/getBorrow")
    public ApiResponse<Page<GetBorrowQueryResult>> getBorrowQuery(GetBorrowQueryRequest getBorrowQueryRequest) {
        return ApiResponse.success(bookService.getBorrowQuery(getBorrowQueryRequest));
    }

    @PostMapping("/renew")
    public ApiResponse<BookBorrowResult> renewBorrow(@RequestBody BorrowRequestWrapper borrowRequestWrapper) {
        return ApiResponse.success(bookService.renewBorrow(borrowRequestWrapper.getBorrowId()));
    }

    @PostMapping("/returnBorrow")
    public ApiResponse<OperationResultWrapper> returnBorrow(@RequestBody BorrowRequestWrapper borrowRequestWrapper) {
        return ApiResponse.success(bookService.returnBorrow(borrowRequestWrapper.getBorrowId()));
    }

    @PostMapping("/deleteBorrow")
    public ApiResponse<OperationResultWrapper> deleteBorrow(@RequestBody BorrowRequestWrapper borrowRequestWrapper) {
        return ApiResponse.success(bookService.deleteBorrow(borrowRequestWrapper.getBorrowId()));
    }

    @PostMapping("/cancelUser")
    public ApiResponse<OperationResultWrapper> cancelUser(@RequestBody UserRequestWrapper userRequestWrapper) {
        return ApiResponse.success(userService.cancelUser(userRequestWrapper.getUsername()));
    }

    @PostMapping("/cancelBook")
    public ApiResponse<OperationResultWrapper> cancelBook(@RequestBody BookRequestWrapper bookRequestWrapper) {
        return ApiResponse.success(bookService.cancelBook(bookRequestWrapper.getBookId()));
    }

    @PostMapping("/addBook")
    public ApiResponse<OperationResultWrapper> addBook(@RequestBody AddEditBookRequest addEditBookRequest) {
        return ApiResponse.success(bookService.addBook(addEditBookRequest));
    }

    @PostMapping("/editBook")
    public ApiResponse<OperationResultWrapper> editBook(@RequestBody AddEditBookRequest addEditBookRequest) {
        return ApiResponse.success(bookService.editBook(addEditBookRequest));
    }

    @GetMapping("/getUserDetails")
    public ApiResponse<GetSpecUserResult> getSpecUser(UserRequestWrapper userRequestWrapper) {
        return ApiResponse.success(userService.getSpecUser(userRequestWrapper.getUsername()));
    }

    @PostMapping("/editUser")
    public ApiResponse<OperationResultWrapper> editUser(@RequestBody EditUserRequest editUserRequest) {
        return ApiResponse.success(userService.editUser(editUserRequest));
    }
}
