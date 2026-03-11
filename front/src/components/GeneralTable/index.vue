<script setup lang="ts">
import ButtonArea, { ButtonAreaRecord } from '@/components/GeneralTable/components/ButtonArea.vue';
import FilterArea, { FilterItem, FilterParams } from '@/components/GeneralTable/components/FilterArea.vue';
import CustomTable, { PagedTableReturnData, PaginationProps, TableColumnProps, TableData } from '@/components/GeneralTable/components/CustomTable.vue';
import { APIError } from '@/api/wrapper';

export interface TableFetchResult<T extends TableData = TableData> {
    list: T[]
    total: number
}

export interface GeneralTableExposes {
  refresh: () => void
}

export interface GeneralTableProps<F extends FilterParams = FilterParams, T extends TableData = TableData> {
    tableColumnProps: TableColumnProps<any>[],
    tableHeight: number,
    fetchMethod: (paginationProps: PaginationProps) => Promise<PagedTableReturnData<TableFetchResult<T>> | null>,
    filter?: {
        enable?: boolean
        formGenerator?: () => F,
        filterParamsInitializer?: () => F,
        upperItems?: FilterItem<F>[],
        lowerItems?: FilterItem<F>[],
        onUpdateFilterParams?: (newParams: F) => void,
    },
    button?: {
        enable?: boolean,
        records?: ButtonAreaRecord[],
    },
    pagination?: {
        propsGenerator?: () => PaginationProps,
        onPageChange: () => void,
    }
}

const props = defineProps<GeneralTableProps<any>>()

const tableData: TableData[] = reactive<TableData[]>([])

const handleSortChange = (e: any) => {
    console.log(e)
}

const handlePageChange = (currentPage: number) => {
    customTableRef.value?.scrollToTop()
    paginationProps.currentPage = currentPage
    handleFetchData()
}

const tableLoading = ref(false)

const setTableLoading = (status: boolean) => { tableLoading.value = status }

const itemTotal = ref(0)

const paginationProps = reactive<PaginationProps>(props.pagination?.propsGenerator?.() || {
    pageSize: 10,
    itemCount: 0,
    currentPage: 1,
})

const handleFetchData = async () => {
    try {
        setTableLoading(true)
        const fetchResult = await props.fetchMethod(paginationProps)
        if (fetchResult?.content && fetchResult?.content !== null) {
            tableData.splice(0, paginationProps.pageSize, ...fetchResult.content)
        }
        if (fetchResult?.totalElements && fetchResult?.totalElements !== null) {
            itemTotal.value = fetchResult.totalElements
            paginationProps.itemCount = fetchResult.totalElements
        }
    } catch (err) {
        if (err instanceof APIError) {
            ElMessage.error('数据获取失败：' + err.errMsg)
        }
    } finally {
        setTableLoading(false)
    }
}

const customTableRef = ref()

handleFetchData()

defineExpose<GeneralTableExposes>({
    refresh: handleFetchData
})

</script>

<template>
    <el-space direction="vertical" class="full custom-space" :size="20">
        <filter-area 
            v-if="props.filter?.enable"
            :generator="props.filter?.formGenerator || (() => { return {} })"
            :initializer="props.filter.filterParamsInitializer || (() => { return {} })"
            :upper-input="props.filter.upperItems || []" 
            :lower-input="props.filter.lowerItems || []" 
            @update-filter="props.filter.onUpdateFilterParams" 
        />
        <button-area v-if="props.button?.enable" :gutter="24" :buttons="props.button?.records || []" />
        <custom-table 
            ref="customTableRef"
            :table-data="tableData" 
            :table-column-props="tableColumnProps" 
            :index-width="'5%'"
            @sort-change="handleSortChange"
            class="custom-table"
            :height="props.tableHeight"
            :loading="tableLoading"
            :item-total="itemTotal"
            @page-change="handlePageChange"
            :pagination-props="paginationProps"
        >
            <template v-for="(_, name) in $slots" v-slot:[name]="slotProps">
                <slot :name="name" v-bind="slotProps"></slot>
            </template>
        </custom-table>
    </el-space>
</template>

<style scoped>
.custom-space > * {
    align-self: stretch;
}
:deep(.el-row) {
    margin-left: 0 !important;
    margin-right: 0 !important;
}
.custom-table {
    flex: 1;
    min-height: 0;
}
</style>