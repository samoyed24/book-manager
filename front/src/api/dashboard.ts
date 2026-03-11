import { SignUpData, UserInfoResult } from "types/dashboard";
import request from "./wrapper";

export function postSignUp() {
    return request.post<SignUpData>('/api/user/signUp')
}

export function getUserInfo() {
    return request.get<UserInfoResult>('/api/user/getUserInfo')
}