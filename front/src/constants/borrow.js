import { BorrowStatusValue } from "./mapping/borrow";
export const borrowStatusOptions = [
    {
        label: BorrowStatusValue.expired,
        value: 'expired',
    },
    {
        label: BorrowStatusValue.normal,
        value: 'normal',
    },
    {
        label: BorrowStatusValue.returned,
        value: 'returned',
    },
];
