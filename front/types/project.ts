import { FormModel } from "@/components/Base/CustomForm.vue"
import { TableColumnProps, TableData } from "@/components/GeneralTable/components/CustomTable.vue"
import { FilterParams } from "@/components/GeneralTable/components/FilterArea.vue"
import { TableFetchResult } from "@/components/GeneralTable/index.vue"

export interface ProjectFilterParams extends FilterParams {
    name: string
    client: string
    startDate: Date[] | null[]
    status: keyof ProjectStatus | null
}
export interface ProjectTableData extends TableData {
    name: string
    client: string
    amount: number
    startDate: Date | null
    status: ProjectStatus
    description: string
}
export interface ProjectRequestParams {
    name: string | null
    client: string | null
    startDateFrom: string | null
    startDateTo: string | null
    status: keyof ProjectStatus | null
    pageSize: number
    currentPage: number
}
export type ProjectFetchResult = TableFetchResult<ProjectTableData>
export interface ProjectAddFormModel extends FormModel {
    name: string
    client: string
    amount: number
    startDate: Date | number | null,
    status: keyof ProjectStatus | null
    description: string
}
export type ProjectStatus = "End" | "Process" | "Quality"