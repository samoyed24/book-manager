import request from '@/api/wrapper';
export function postLogin(params) {
    return request.post('/api/auth/login', params);
}
export function postLogout() {
    return request.post('/api/auth/logout');
}
export function postRegister(params) {
    return request.post('/api/auth/register', params);
}
export function postCheckDuplicated(params) {
    return request.post('/api/auth/checkDuplicated', params);
}
export function postCancelUser(username) {
    return request.post('/api/admin/cancelUser', { username });
}
