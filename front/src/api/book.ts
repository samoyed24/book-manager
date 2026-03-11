import { PagedTableReturnData } from "@/components/GeneralTable/components/CustomTable.vue";
import request from "./wrapper";
import { Book, BookBorrowResult, BookFetchResult, BookRequest, BookRequestParams, BookStatisticsResult } from "types/book";
import { OperationResult } from "types/general";

export function getBook(params: BookRequestParams) {
    return request.get<PagedTableReturnData<BookFetchResult>>('/api/book/getBooks', params)
}

export function getBookDetails(bookId: string) {
    return request.get<Book>('/api/book/getBookDetails', {bookId})
} 

export function postBorrow(bookId: string) {
    return request.post<BookBorrowResult>('/api/book/borrow', {bookId})
}

export function postAddBook(data: BookRequest) {
    return request.post<OperationResult>('/api/admin/addBook', data)
}

export function postEditBook(data: BookRequest) {
    return request.post<OperationResult>('/api/admin/editBook', data)
}

export function postCancelBook(bookId: string) {
    return request.post<OperationResult>('/api/admin/cancelBook', {bookId})
}

export function getBookStatistics() {
    return request.get<BookStatisticsResult>('/api/book/getStatistics')
}