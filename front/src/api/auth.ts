import request from '@/api/wrapper'
import { AuthFormData, CheckDuplicatedData, CheckDuplicatedResult, RegisterFormData, UserStoreData } from 'types/api'
import { OperationResult } from 'types/general'

export function postLogin(params: AuthFormData) {
    return request.post<UserStoreData>('/api/auth/login', params)
}

export function postLogout() {
    return request.post('/api/auth/logout')
}

export function postRegister(params: RegisterFormData) {
    return request.post('/api/auth/register', params)
}

export function postCheckDuplicated(params: CheckDuplicatedData) {
    return request.post<CheckDuplicatedResult>('/api/auth/checkDuplicated', params)
}

export function postCancelUser(username: string) {
    return request.post<OperationResult>('/api/admin/cancelUser', {username})
}