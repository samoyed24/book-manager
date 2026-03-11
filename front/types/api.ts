import { FormModel } from "@/components/Base/CustomForm.vue"

export interface AuthFormData {
    username: string
    password: string
}
export interface UserStoreData {
    username: string
    roles: string[]
}
export interface RegisterFormData extends FormModel {
    username: string
    password: string
    name: string
    workNumber: string
    idNumber: string
    facultyName: string
    major: string
    grade: string
}
export interface CheckDuplicatedData {
    field: string
    value: string
}
export interface CheckDuplicatedResult {
    isDuplicated: boolean
}