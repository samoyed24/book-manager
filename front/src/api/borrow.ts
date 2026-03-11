import { PagedTableReturnData } from "@/components/GeneralTable/components/CustomTable.vue";
import request from "./wrapper";
import { BorrowFetchResult, BorrowRequestParams, UserBorrowRequestParams } from "types/borrow";
import { BookBorrowResult, BorrowPenaltyResult } from "types/book";
import { OperationResult } from "types/general";

export function getBorrow(params: BorrowRequestParams) {
    return request.get<PagedTableReturnData<BorrowFetchResult>>('/api/admin/getBorrow', params)
}

export function getUserBorrow(params: UserBorrowRequestParams) {
    return request.get<PagedTableReturnData<BorrowFetchResult>>('/api/book/getBorrow', params)
}

export function postRenew(borrowId: number) {
    return request.post<BookBorrowResult>('/api/admin/renew', {borrowId})
}

export function postReturnBorrow(borrowId: number) {
    return request.post<OperationResult>('/api/admin/returnBorrow', {borrowId})
}

export function postDeleteBorrow(borrowId: number) {
    return request.post<OperationResult>('/api/admin/deleteBorrow', {borrowId})
}

export function getUserPenalty(borrowId: number) {
    return request.get<BorrowPenaltyResult>('/api/book/getPenalty', {borrowId})
}

export function getBookRank() {
    return request.get<[string, number][]>('/api/book/getBookRank')
}