<script setup lang="ts">
import { ButtonAreaRecord } from '@/components/GeneralTable/components/ButtonArea.vue';
import { FilterItem } from '@/components/GeneralTable/components/FilterArea.vue';
import { PaginationProps, TableColumnProps } from '@/components/GeneralTable/components/CustomTable.vue';
import { GeneralTableExposes, GeneralTableProps } from '@/components/GeneralTable/index.vue';
import { BorrowFilterParams, BorrowStatus, BorrowTableData, UserBorrowFilterParams } from 'types/borrow';
import { BorrowStatusColor, BorrowStatusValue } from '@/constants/mapping/borrow';
import { getBorrow, getUserBorrow, getUserPenalty, postDeleteBorrow, postRenew, postReturnBorrow } from '@/api/borrow';
import { CircleCloseFilled, FolderChecked, Refresh, RefreshLeft } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { borrowStatusOptions } from '@/constants/borrow';
import { createDialog } from '@/service/DialogService';
import CustomDescriptions, { CustomDescriptionsProps } from '@/components/Base/CustomDescriptions.vue';
import { BorrowPenaltyResult } from 'types/book';
import { ElNotification } from 'element-plus';

const route = useRoute()

const borrowFilterParamsGenerator: () => UserBorrowFilterParams = () => ({
    borrower: '',
    book: '',
    status: null,
    expireTime: [null, null],
})

const borrowFilterParamsInitializer: () => UserBorrowFilterParams = () => ({
    book: '',
    status: null,
    expireTime: [null, null],
})


const buttonRecords: ButtonAreaRecord[] = [
    {
        span: 24,
        text: "刷新",
        icon: 'Refresh',
        type: 'primary',
        method: () => tableRef?.value?.refresh()
    },
]

const upperFilterItems: FilterItem<BorrowFilterParams>[] = [
    {
        span: 24,
        label: '借阅图书',
        prop: 'book',
        input: {
            type: 'input',
            placeholder: '请输入借阅图书名称/出版号进行查询',
        }
    },
]

const lowerFilterItems: FilterItem<BorrowFilterParams>[] = [
    {
        span: 12,
        label: '借阅状态',
        prop: 'status',
        input: {
            type: 'select',
            placeholder: '请选择借阅状态',
            options: borrowStatusOptions,
        },
    },
    {
        span: 12,
        label: '最晚归还时间',
        prop: 'expireTime',
        input: {
            type: 'date',
            placeholder: '请选择图书状态',
            subType: 'daterange',
        },
    },
]

const fetchData = async (paginationProps: PaginationProps) => {
    const resp = await getUserBorrow({
        book: borrowFilterParams.book || null,
        status: borrowFilterParams.status || null,
        expireTimeFrom: borrowFilterParams.expireTime[0]?.toISOString() || null,
        expireTimeTo: borrowFilterParams.expireTime[1]?.toISOString() || null,
        pageSize: paginationProps.pageSize,
        currentPage: paginationProps.currentPage
    })
    return resp.data
}

const tableColumnProps: TableColumnProps<BorrowTableData>[] = [
    {
        label: '借阅书籍名',
        prop: 'bookName',
        minWidth: '20%',
        align: 'center',
    },
    {
        label: '借阅日期',
        prop: 'borrowDate',
        minWidth: '15%',
        align: 'center',
    },
    {
        label: '最晚归还日期',
        prop: 'expireDate',
        minWidth: '15%',
        align: 'center',
    },
    {
        label: '实际归还日期',
        prop: 'returnDate',
        minWidth: '15%',
        align: 'center',
    },
    {
        label: '状态',
        prop: 'status',
        minWidth: '10%',
        align: 'center',
    },
    {
        label: '操作',
        prop: 'operation',
        minWidth: '15%',
        align: 'center',
    },
]

const updateFilterParams = (newParams: BorrowFilterParams) => {
    paginationProps.itemCount = 0
    Object.assign(borrowFilterParams, newParams)
    tableRef.value?.refresh()
}

const borrowFilterParams: UserBorrowFilterParams = reactive(borrowFilterParamsInitializer())
const paginationProps = reactive<PaginationProps>({
    pageSize: 10,
    itemCount: 0,
    currentPage: 1,
})

const tableRef = ref<GeneralTableExposes | null>(null)

const generalTableProps = {
    tableHeight: 550,
    tableColumnProps,
    fetchMethod: fetchData,
    filter: {
        enable: true,
        formGenerator: borrowFilterParamsGenerator,
        filterParamsInitializer: borrowFilterParamsInitializer,
        upperItems: upperFilterItems,
        lowerItems: lowerFilterItems,
        onUpdateFilterParams: updateFilterParams,
    },
    button: {
        enable: true,
        records: buttonRecords,
    },
} as GeneralTableProps<BorrowFilterParams, BorrowTableData>

const penaltyDialogFactory = (id: number) => createDialog<CustomDescriptionsProps<BorrowPenaltyResult>>(CustomDescriptions, {
    title: '罚款单',
    footer: {
        show: false,
    },
    confirmBeforeClose: false,
    width: '40%',
    draggable: true,
}, {
    border: true,
    fetchMethod: () => getUserPenalty(id),
    descriptionsItems: [
        {
            prop: 'bookName',
            label: '书名',
            span: 1,
        },
        {
            prop: 'borrowerName',
            label: '借阅者姓名',
            span: 1
        },
        {
            prop: 'borrowerWorkNumber',
            label: '借阅者学号/工号',
            span: 1,
        },
        {
            prop: 'expireDays',
            label: '过期天数',
            span: 1,
        },
        {
            prop: 'amount',
            label: '需缴纳罚金（元）',
            span: 2,
        },
        {
            prop: 'message',
            label: '系统提示',
            span: 3,
        },
        {
            prop: 'printDate',
            label: '打印时间',
            span: 3,
        },
    ],
    column: 3,
})

const handleShowPenalty = (id: number) => {
    const dialog = penaltyDialogFactory(id)
    ElNotification.info('请使用 Ctrl + P 快捷键打印此罚款单，并于归还图书时上交罚款单与罚金')
}

</script>

<template>
    <general-table
        ref="tableRef"
        :fetch-method="generalTableProps.fetchMethod"
        :table-height="generalTableProps.tableHeight"
        :button="generalTableProps.button"
        :filter="generalTableProps.filter"
        :pagination="generalTableProps.pagination"
        :table-column-props="tableColumnProps"
    >
        <template #status="{ row } : { row: BorrowTableData }">
            <div class="status-cell">
                <span class="dot" :style="{backgroundColor: BorrowStatusColor[row.status]}"></span>
                {{ BorrowStatusValue[row.status] }}
            </div>
        </template>
        <template #operation="{ row } : { row: BorrowTableData }">
            <el-tooltip effect="dark" content="查看罚款单" v-if="row.status === 'expired'" placement="top">
                <el-button type="primary" @click="handleShowPenalty(row.id)" text>
                    <el-icon>
                        <Tickets />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </template>
    </general-table>
</template>

<style lang="css" scoped>
.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}
.status-cell {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
}
</style>