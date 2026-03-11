import { PagedTableReturnData } from "@/components/GeneralTable/components/CustomTable.vue";
import request from "./wrapper";
import { User, UserEditModel, UserFetchResult, UserRequestParams } from "types/user";
import { OperationResult } from "types/general";

export function getUser(params: UserRequestParams) {
    return request.get<PagedTableReturnData<UserFetchResult>>('/api/user/getUsers', params)
}

export function getUserDetails(username: string) {
    return request.get<User>('/api/admin/getUserDetails', {username})
}

export function postUserEdit(data: UserEditModel) {
    return request.post<OperationResult>('/api/admin/editUser', data)
}