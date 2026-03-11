import request from "./wrapper";
export function getBorrow(params) {
    return request.get('/api/admin/getBorrow', params);
}
export function getUserBorrow(params) {
    return request.get('/api/book/getBorrow', params);
}
export function postRenew(borrowId) {
    return request.post('/api/admin/renew', { borrowId });
}
export function postReturnBorrow(borrowId) {
    return request.post('/api/admin/returnBorrow', { borrowId });
}
export function postDeleteBorrow(borrowId) {
    return request.post('/api/admin/deleteBorrow', { borrowId });
}
export function getUserPenalty(borrowId) {
    return request.get('/api/book/getPenalty', { borrowId });
}
export function getBookRank() {
    return request.get('/api/book/getBookRank');
}
