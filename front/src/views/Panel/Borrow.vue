<script setup lang="ts">
import { ButtonAreaRecord } from '@/components/GeneralTable/components/ButtonArea.vue';
import { FilterItem } from '@/components/GeneralTable/components/FilterArea.vue';
import { PaginationProps, TableColumnProps } from '@/components/GeneralTable/components/CustomTable.vue';
import { Option } from '@/components/Base/CustomInput.vue'
import { GeneralTableExposes, GeneralTableProps } from '@/components/GeneralTable/index.vue';
import { BorrowFilterParams, BorrowStatus, BorrowTableData } from 'types/borrow';
import { BorrowStatusColor, BorrowStatusValue } from '@/constants/mapping/borrow';
import { getBorrow, postDeleteBorrow, postRenew, postReturnBorrow } from '@/api/borrow';
import { CircleCloseFilled, FolderChecked, Refresh, RefreshLeft } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { borrowStatusOptions } from '@/constants/borrow';

const route = useRoute()

const borrowFilterParamsGenerator: () => BorrowFilterParams = () => ({
    borrower: '',
    book: '',
    status: null,
    expireTime: [null, null],
})

const borrowFilterParamsInitializer: () => BorrowFilterParams = () => ({
    borrower: route.query.username as string || '',
    book: route.query.bookId as string || '',
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
        span: 12,
        label: '借阅者',
        prop: 'borrower',
        input: {
            type: 'input',
            placeholder: '请输入借阅者用户名/学号/工号/姓名进行查询',
        }
    },
    {
        span: 12,
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
    const resp = await getBorrow({
        borrower: borrowFilterParams.borrower || null,
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
        label: '借阅者用户名',
        prop: 'borrowerUsername',
        minWidth: '14%',
        align: 'center',
    },
    {
        label: '借阅者姓名',
        prop: 'borrowerName',
        minWidth: '10%',
        align: 'center',
    },
    {
        label: '借阅书籍名',
        prop: 'bookName',
        minWidth: '14%',
        align: 'center',
    },
    {
        label: '借阅日期',
        prop: 'borrowDate',
        minWidth: '11%',
        align: 'center',
    },
    {
        label: '最晚归还日期',
        prop: 'expireDate',
        minWidth: '11%',
        align: 'center',
    },
    {
        label: '实际归还日期',
        prop: 'returnDate',
        minWidth: '11%',
        align: 'center',
    },
    {
        label: '状态',
        prop: 'status',
        minWidth: '9%',
        align: 'center',
    },
    {
        label: '操作',
        prop: 'operation',
        minWidth: '18%',
        align: 'center',
    },
]

const updateFilterParams = (newParams: BorrowFilterParams) => {
    paginationProps.itemCount = 0
    Object.assign(borrowFilterParams, newParams)
    tableRef.value?.refresh()
}

const borrowFilterParams: BorrowFilterParams = reactive(borrowFilterParamsInitializer())
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

const borrowLoading: Ref<number | null> = ref(null)

const setBorrowLoading = (rowId: number | null) => {
    borrowLoading.value = rowId
}

const handleRenew = async (borrowId: number) => {
    setBorrowLoading(borrowId)
    try {
        const { data } = await postRenew(borrowId)
        if (data?.success) {
            ElMessage.success(`续借成功，最晚归还期限延长至${data.expireDate}`)
        } else {
            ElMessage.error(`续借失败：${data?.reason}`)
        }
    } finally {
        tableRef.value?.refresh()
        setBorrowLoading(null)
    }
}

const handleReturnBorrow = async (borrowId: number) => {
    setBorrowLoading(borrowId)
    try {
        const { data } = await postReturnBorrow(borrowId)
        if (data?.success) {
            ElMessage.success(`还书成功`)
        } else {
            ElMessage.error(`还书失败：${data?.reason}`)
        }
    } finally {
        tableRef.value?.refresh()
        setBorrowLoading(null)
    }
}

const handleDeleteBorrow = async (borrowId: number) => {
    setBorrowLoading(borrowId)
    try {
        const { data } = await postDeleteBorrow(borrowId)
        if (data?.success) {
            ElMessage.success(`借阅记录删除成功`)
        } else {
            ElMessage.error(`借阅记录删除失败：${data?.reason}`)
        }
    } finally {
        tableRef.value?.refresh()
        setBorrowLoading(null)
    }
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
            <el-tooltip effect="dark" content="归还" placement="top">
                <el-popconfirm title="您确定归还吗？" @confirm="handleReturnBorrow(row.id)">
                    <template #reference>
                        <el-button type="success" :loading="borrowLoading === row.id" v-if="row.status !== 'returned'" text>
                            <el-icon>
                                <FolderChecked />
                            </el-icon>
                        </el-button>
                    </template>
                </el-popconfirm>
            </el-tooltip>
            <el-tooltip effect="dark" content="续借" placement="top">
                <el-popconfirm title="您确定续借吗？" @confirm="handleRenew(row.id)">
                    <template #reference>
                        <el-button type="primary" :loading="borrowLoading === row.id" v-if="row.status === 'normal'" text>
                            <el-icon>
                                <RefreshLeft />
                            </el-icon>
                        </el-button>
                    </template>
                </el-popconfirm>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
                <el-popconfirm title="您确定删除吗？" @confirm="handleDeleteBorrow(row.id)">
                    <template #reference>
                        <el-button type="danger" :loading="borrowLoading === row.id" text>
                            <el-icon>
                                <CircleCloseFilled />
                            </el-icon>
                        </el-button>
                    </template>
                </el-popconfirm>
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