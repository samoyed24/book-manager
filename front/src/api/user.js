import request from "./wrapper";
export function getUser(params) {
    return request.get('/api/user/getUsers', params);
}
export function getUserDetails(username) {
    return request.get('/api/admin/getUserDetails', { username });
}
export function postUserEdit(data) {
    return request.post('/api/admin/editUser', data);
}
