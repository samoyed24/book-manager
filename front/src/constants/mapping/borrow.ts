import { BorrowStatus } from "types/borrow";

export const BorrowStatusValue: Record<BorrowStatus, string> = {
  normal: '正常',
  returned: '已归还',
  expired: '已过期'
};

export const BorrowStatusColor: Record<BorrowStatus, string> = {
  normal: '#23CF07',
  expired: '#f64518ff',
  returned: '#1277FA'
}