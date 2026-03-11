import { TableData } from "@/components/GeneralTable/components/CustomTable.vue"
import { FilterParams } from "@/components/GeneralTable/components/FilterArea.vue"
import { TableFetchResult } from "@/components/GeneralTable/index.vue"

export type UserIsGraduated = 'isGraduated' | 'isNotGraduated'

export type UserIsValid = {
    isValid: string
    isNotValid: string
}

export type UserRole = {
    ROLE_USER: string
    ROLE_ADMIN: string
}

export interface UserTableData extends TableData {
    username: string
    name: string
    workNumber: string
    idNumber: string
    facultyName: string
    major: string
    grade: string
    graduated: boolean
    valid: boolean
    userRole: keyof UserRole
}

export interface UserFilterParams extends FilterParams {
    username: string
    name: string
    workNumber: string
    idNumber: string
    facultyName: string
    major: string
    grade: string
    graduated: boolean | null
}

export interface UserRequestParams {
    name: string | null
    username: string | null
    workNumber: string | null
    idNumber: string | null
    facultyName: string | null
    major: string | null
    grade: string | null
    graduated: keyof UserIsGraduated | null | boolean
    pageSize: number
    currentPage: number
}

export type UserFetchResult = TableFetchResult<UserTableData> 

export interface User {
    username: string
    name: string
    workNumber: string
    idNumber: string
    facultyName: string | null
    registerTime: string
    major: string | null
    grade: string | null
    graduated: boolean
}

export interface UserEditModel {
    username: string
    name: string
    facultyName: string | null
    major: string | null
    grade: string | null
    graduated: boolean
}

export interface UserDescriptionsModel {
    username: string
    name: string
    workNumber: string
    idNumber: string
    facultyName: string | null
    registerTime: string
    major: string | null
    grade: string | null
    graduated: string
}