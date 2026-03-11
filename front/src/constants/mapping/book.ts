import { BookStatus } from "types/book";

export const BookStatusValue: Record<BookStatus, string> = {
  available: '在馆',
  cancelled: '注销',
  borrowed: '借出',
};


export const BookStatusColor: Record<BookStatus, string> = {
    available: '#23CF07',
    cancelled: '#f6a118ff',
    borrowed: '#1277FA'
}