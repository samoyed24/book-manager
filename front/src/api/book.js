import request from "./wrapper";
export function getBook(params) {
    return request.get('/api/book/getBooks', params);
}
export function getBookDetails(bookId) {
    return request.get('/api/book/getBookDetails', { bookId });
}
export function postBorrow(bookId) {
    return request.post('/api/book/borrow', { bookId });
}
export function postAddBook(data) {
    return request.post('/api/admin/addBook', data);
}
export function postEditBook(data) {
    return request.post('/api/admin/editBook', data);
}
export function postCancelBook(bookId) {
    return request.post('/api/admin/cancelBook', { bookId });
}
export function getBookStatistics() {
    return request.get('/api/book/getStatistics');
}
