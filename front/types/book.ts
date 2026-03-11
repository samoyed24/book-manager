import { DescriptionsModel } from "@/components/Base/CustomDescriptions.vue";
import { TableData } from "@/components/GeneralTable/components/CustomTable.vue";
import { FilterParams } from "@/components/GeneralTable/components/FilterArea.vue";
import { TableFetchResult } from "@/components/GeneralTable/index.vue";
import { OperationResult } from "./general";
import { FormModel } from "@/components/Base/CustomForm.vue";

export interface Book {
    id: string
    clsNo: string
    publishNo: string
    name: string
    author: string
    description: string
    publisher: string
    price: string
    purchaseDate: string
    status: BookStatus
}

export interface BookFilterParams extends FilterParams {
    id: string
    clsNo: string
    publishNo: string
    name: string
    author: string
    publisher: string
    status: keyof BookStatus | null
}

export type BookStatus = 'available' | 'cancelled' | 'borrowed';

export interface BookRequestParams {
    id: string | null
    clsNo: string | null
    publishNo: string | null
    name: string | null
    author: string | null
    publisher: string | null
    status: keyof BookStatus | null
    pageSize: number
    currentPage: number
}

export interface BookTableData extends TableData {
    id: string
    clsNo: string
    publishNo: string
    name: string
    author: string
    publisher: string
    status: BookStatus
    price: number
}

export type BookFetchResult = TableFetchResult<BookTableData>

export interface BookDescriptionsModel extends DescriptionsModel {
    id: string
    clsNo: string
    publishNo: string
    name: string
    author: string
    description: string
    publisher: string
    price: string
    purchaseDate: string
    status: string
}

export interface BookBorrowResult extends OperationResult {
    expireDate: string
}

export interface BookAddFormModel extends FormModel {
    id: string | null,
    clsNo: string
    publishNo: string
    name: string
    author: string
    description: string | null
    publisher: string
    price: number | null
    purchaseDate: Date | null
}

export interface BookRequest {
    id: string | null
    clsNo: string
    publishNo: string
    name: string
    author: string
    description: string | null
    publisher: string
    price: string | null
    purchaseDate: string | null
}

export interface BorrowPenaltyResult {
    bookName: string
    borrowerName: string
    borrowerWorkNumber: string
    amount: number
    expireDays: number
    penaltyPerDay: number
    message: string
    printDate: string
}

export interface BookStatisticsResult {
    totalBook: number
    borrowedBook: number
    registeredUser: number
    myBorrow: number
    soonExpireBorrow: number
    myTotalBorrow: number
}