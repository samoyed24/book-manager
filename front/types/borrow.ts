import { TableData } from "@/components/GeneralTable/components/CustomTable.vue"
import { FilterParams } from "@/components/GeneralTable/components/FilterArea.vue"
import { TableFetchResult } from "@/components/GeneralTable/index.vue"

export type BorrowStatus = 'expired' | 'normal' | 'returned'

export interface BorrowFilterParams extends FilterParams {
    borrower: string
    book: string
    status: BorrowStatus | null
    expireTime: Date[] | null[]
}

export interface BorrowRequestParams {
    borrower: string | null
    book: string | null
    status: BorrowStatus | null
    expireTimeFrom: string | null
    expireTimeTo: string | null
    pageSize: number
    currentPage: number
}

export interface BorrowTableData extends TableData {
    id: number
    borrowerUsername: string
    borrowerName: string
    borrowerId: number
    bookName: string
    bookId: number
    borrowDate: string
    expireDate: string
    returnDate: string
    status: BorrowStatus
}

export type BorrowFetchResult = TableFetchResult<BorrowTableData>

export interface UserBorrowFilterParams extends FilterParams {
    book: string
    status: BorrowStatus | null
    expireTime: Date[] | null[]
}

export interface UserBorrowTableData extends TableData {
    id: number
    bookName: string
    bookId: number
    borrowDate: string
    expireDate: string
    returnDate: string
    status: BorrowStatus
}

export interface UserBorrowRequestParams {
    book: string | null
    status: BorrowStatus | null
    expireTimeFrom: string | null
    expireTimeTo: string | null
    pageSize: number
    currentPage: number
}