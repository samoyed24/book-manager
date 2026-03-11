import { BorrowStatus } from "types/borrow";
import { BorrowStatusValue } from "./mapping/borrow";
import { Option } from '@/components/Base/CustomInput.vue'

export const borrowStatusOptions: Option<BorrowStatus>[] = [
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
]
