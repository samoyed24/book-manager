import { APIResponse } from "@/api/wrapper";
import { PagedTableReturnData, TableData } from "@/components/GeneralTable/components/CustomTable.vue";
import { TableFetchResult } from "@/components/GeneralTable/index.vue";

export interface ListMockData<T extends TableFetchResult> {
    list: T[]
}

export default function mockResponse<T = any>(code: number, data: T | null, message: string): APIResponse<T> {
    return {
        code,
        data,
        message
    }
}

export function mockPagedTableData<T extends TableFetchResult>(tableData: T[]): PagedTableReturnData<T> {
    return {
        content: tableData,
        empty: false,
        first: false,
        last: false,
        number: 0,
        numberOfElements: 0,
        pageable: {
            offset: 0,
            pageNumber: 0,
            pageSize: 0,
            paged: false,
            sort: {
                empty: false,
                sorted: false,
                unsorted: false
            },
            unpaged: false
        },
        size: 0,
        sort: {
            empty: false,
            sorted: false,
            unsorted: false
        },
        totalElements: 50,
        totalPages: 0
    }
}