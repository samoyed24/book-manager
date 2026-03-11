import request from "./wrapper";
export function postSignUp() {
    return request.post('/api/user/signUp');
}
export function getUserInfo() {
    return request.get('/api/user/getUserInfo');
}
