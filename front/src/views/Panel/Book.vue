<script setup lang="ts">
import { ButtonAreaRecord } from '@/components/GeneralTable/components/ButtonArea.vue';
import { FilterItem } from '@/components/GeneralTable/components/FilterArea.vue';
import { PaginationProps, TableColumnProps } from '@/components/GeneralTable/components/CustomTable.vue';
import { CircleCloseFilled, Collection, Download, View } from '@element-plus/icons-vue';
import { Option } from '@/components/Base/CustomInput.vue'
import { GeneralTableExposes, GeneralTableProps } from '@/components/GeneralTable/index.vue';
import { Book, BookAddFormModel, BookDescriptionsModel, BookFilterParams, BookRequest, BookStatus, BookTableData } from 'types/book';
import { getBook, getBookDetails, postAddBook, postBorrow, postCancelBook, postEditBook } from '@/api/book';
import { BookStatusColor, BookStatusValue } from '@/constants/mapping/book';
import { createDialog } from '@/service/DialogService';
import CustomDescriptions, { CustomDescriptionsProps } from '@/components/Base/CustomDescriptions.vue';
import router from '@/router';
import { useUserAuthStore } from '@/stores/auth';
import CustomForm, { CustomFormProps } from '@/components/Base/CustomForm.vue';
import { OperationResult } from 'types/general';
import { APIResponse } from '@/api/wrapper';
import dayjs from 'dayjs';

const bookFilterParamsGenerator: () => BookFilterParams = () => ({
    id: '',
    clsNo: '',
    publishNo: '',
    name: '',
    author: '',
    publisher: '',
    status: null,
})


const bookStatusOptions: Option<BookStatus>[] = [
    {
        value: 'available',
        label: BookStatusValue.available,
    },
    {
        value: 'borrowed',
        label: BookStatusValue.borrowed,
    },
    {
        value: 'cancelled',
        label: BookStatusValue.cancelled,
    },
]

const bookAddFormModelGenerator: () => BookAddFormModel = () => {
    return {
        id: '',
        clsNo: '',
        publishNo: '',
        name: '',
        author: '',
        description: '',
        publisher: '',
        price: null,
        purchaseDate: null,
        status: null,
    }
}

const bookDialogFactory = (
    formTitle: string,
    submitMethod: (model: BookRequest) => Promise<APIResponse<OperationResult>>,
    confirmText: string,
    successText: string,
    fetchMethod?: () => Promise<APIResponse<Book>>,
    converter?: (raw: Book) => BookAddFormModel,
) => {
    return () => createDialog<CustomFormProps<BookAddFormModel, Book>>(CustomForm, {
        title: formTitle,
        footer: {
            show: false
        },
        width: '40%'
    }, {
        defaultGetter: bookAddFormModelGenerator,
        fetchMethod,
        converter,
        formItems: [
            {
                prop: 'name',
                label: '书名',
                input: {
                    type: 'input',
                    placeholder: '请输入书名',
                },
            },
            {
                prop: 'clsNo',
                label: '分类号',
                input: {
                    type: 'input',
                    placeholder: '请输入分类号',
                }
            },
            {
                prop: 'publishNo',
                label: '出版号',
                input: {
                    type: 'input',
                    placeholder: '请输入出版号',
                },
            },
            {
                prop: 'author',
                label: '作者',
                input: {
                    type: 'input',
                    placeholder: '请输入作者',
                }
            },
            {
                prop: 'publisher',
                label: '出版社',
                input: {
                    type: 'input',
                    placeholder: '请输入出版社',
                }
            },
            {
                prop: 'price',
                label: '价格',
                input: {
                    type: 'number',
                    suffix: '元',
                    precision: 2,
                    width: '100%',
                    min: 0,
                    step: 1
                }
            },
            {
                prop: 'purchaseDate',
                label: '购入日期',
                input: {
                    type: 'date',
                    subType: 'date',
                    width: '100%',
                    placeholder: '请选择购入日期',
                },
            },
            {
                prop: 'description',
                label: '描述',
                input: {
                    type: 'textarea',
                    placeholder: '请填写项目描述',
                    autosize: {
                        minRows: 3,
                        maxRows: 6
                    },
                    resize: 'none',
                },
            }
        ],
        submit: {
            method: async (model: BookAddFormModel) => {
                try {
                    const { data } = await submitMethod({
                        id: model.id || null,
                        clsNo: model.clsNo,
                        publishNo: model.publishNo,
                        name: model.name,
                        author: model.author,
                        description: model.description || null,
                        publisher: model.publisher,
                        price: model.price?.toString() || null,
                        purchaseDate: model.purchaseDate?.toISOString() || null,
                    })
                    if (data?.success) {
                        ElMessage.success(successText)
                    }
                } finally {

                }
            },
            validationRules: {
                clsNo: [
                    {
                        required: true,
                        message: '请输入分类号',
                        trigger: 'blur',
                    },
                ],
                name: [
                    {
                        required: true,
                        message: '请输入项目名称',
                        trigger: 'blur',
                    },
                ],
                publishNo: [
                    {
                        required: true,
                        message: '请输入出版号',
                        trigger: 'blur',
                    },
                ],
                author: [
                    {
                        required: true,
                        message: '请输入作者',
                        trigger: 'blur',
                    },
                ],
                publisher: [
                    {
                        required: true,
                        message: '请输入出版社',
                        trigger: 'blur',
                    },
                ],
                price: [
                    {
                        required: true,
                        message: '请设置正确的价格',
                        trigger: 'blur',
                    },
                ],
            },
            useConfirm: true,
            confirmText,
        },
    })
}

const bookActionFactory = (
    formTitle: string,
    submitMethod: (model: BookRequest) => Promise<APIResponse<OperationResult>>, 
    confirmText: string,
    successText: string,
    fetchMethod?: () => Promise<APIResponse<Book>>,
    converter?: (raw: Book) => BookAddFormModel,
) => {
    return () => {
        const dialog = bookDialogFactory(
            formTitle,
            submitMethod,
            confirmText,
            successText,
            fetchMethod,
            converter,
        )()
        if (dialog.divProps && dialog.divProps.submit) {
            dialog.divProps.submit.callbackOnDone = () => {
                tableRef.value?.refresh()
                dialog.dialogInstance.closeDialog()
            }
        } 
    }
}

const handleAddBook = bookActionFactory(
    "添加书籍",
    postAddBook,
    "是否确认添加此书籍？",
    "书籍添加成功",
)

const bookToBookAddFormConverter = (raw: Book): BookAddFormModel => {
    const { price, ...rest} = raw
    return {
        ...rest,
        price: Number(raw.price),
        purchaseDate: raw.purchaseDate ? dayjs(raw.purchaseDate).toDate() : null,
    }
}

const handleEditBook = (bookId: string) => {
    return bookActionFactory(
        "编辑书籍信息",
        postEditBook,
        "是否确认编辑此书籍？",
        "书籍编辑成功",
        () => getBookDetails(bookId),
        bookToBookAddFormConverter,
    )
}

const buttonRecordsSelector: () => ButtonAreaRecord[] = () => {
    const user = useUserAuthStore().getUser()
    if (user.roles.includes('ROLE_ADMIN')) {
        return [
            {
                span: 12,
                text: '添加图书',
                icon: 'Plus',
                type: 'success',
                method: handleAddBook,
            },
            {
                span: 12,
                text: "刷新",
                icon: 'Refresh',
                type: 'primary',
                method: () => tableRef?.value?.refresh()
            },
        ]
    }
    return [
        {
            span: 24,
            text: "刷新",
            icon: 'Refresh',
            type: 'primary',
            method: () => tableRef?.value?.refresh()
        },
    ]
}

const buttonRecords: ButtonAreaRecord[] = buttonRecordsSelector()
const upperFilterItems: FilterItem<BookFilterParams>[] = [
    {
        span: 6,
        label: '序列号',
        prop: 'id',
        input: {
            type: 'input',
            placeholder: '请输入图书序列号',
        }
    },
    {
        span: 6,
        label: '分类号',
        prop: 'clsNo',
        input: {
            type: 'input',
            placeholder: '请输入图书分类号'
        }
    },
    {
        span: 6,
        label: '出版号',
        prop: 'publishNo',
        input: {
            type: 'input',
            placeholder: '请输入图书出版号'
        }
    },
    {
        span: 6,
        label: '书名',
        prop: 'name',
        input: {
            type: 'input',
            placeholder: '请输入书名'
        }
    },
]

const lowerFilterItems: FilterItem<BookFilterParams>[] = [
    {
        span: 8,
        label: '作者',
        prop: 'author',
        input: {
            type: 'input',
            placeholder: '请输入图书作者'
        },
    },
    {
        span: 8,
        label: '出版社',
        prop: 'publisher',
        input: {
            type: 'input',
            placeholder: '请输入图书出版社'
        },
    },
    {
        span: 8,
        label: '图书状态',
        prop: 'status',
        input: {
            type: 'select',
            placeholder: '请选择图书状态',
            options: bookStatusOptions,
        },
    },
]

const fetchData = async (paginationProps: PaginationProps) => {
    const resp = await getBook({
        id: bookFilterParams.id || null,
        name: bookFilterParams.name || null,
        clsNo: bookFilterParams.clsNo || null,
        publishNo: bookFilterParams.publishNo || null,
        author: bookFilterParams.author || null,
        publisher: bookFilterParams.publisher || null,
        status: bookFilterParams.status || null,
        pageSize: paginationProps.pageSize,
        currentPage: paginationProps.currentPage
    })
    return resp.data
}

const tableColumnProps: TableColumnProps<BookTableData>[] = [
    {
        label: '书名',
        prop: 'name',
        minWidth: '14%',
        align: 'center',
    },
    {
        label: '分类号',
        prop: 'clsNo',
        minWidth: '7%',
        align: 'center',
    },
    {
        label: '出版号',
        prop: 'publishNo',
        minWidth: '14%',
        align: 'center',
    },
    {
        label: '作者',
        prop: 'author',
        minWidth: '14%',
        align: 'center',
    },
    {
        label: '出版社',
        prop: 'publisher',
        minWidth: '14%',
        align: 'center',
    },
    {
        label: '状态',
        prop: 'status',
        minWidth: '7%',
        align: 'center',
    },
    {
        label: '操作',
        prop: 'operation',
        minWidth: '25%',
        align: 'center',
    },
]

const updateFilterParams = (newParams: BookFilterParams) => {
    paginationProps.itemCount = 0
    Object.assign(bookFilterParams, newParams)
    tableRef.value?.refresh()
}

const bookFilterParams: BookFilterParams = reactive(bookFilterParamsGenerator())

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
        formGenerator: bookFilterParamsGenerator,
        upperItems: upperFilterItems,
        lowerItems: lowerFilterItems,
        onUpdateFilterParams: updateFilterParams,
    },
    button: {
        enable: true,
        records: buttonRecords,
    },
} as GeneralTableProps<BookFilterParams, BookTableData>

const showBookDetail = (id: string) => createDialog<CustomDescriptionsProps<BookDescriptionsModel, Book>>(CustomDescriptions, {
    title: '书籍详情',
    footer: {
        show: false,
    },
    confirmBeforeClose: false,
    width: '40%',
    draggable: true,
}, {
    border: true,
    fetchMethod: () => getBookDetails(id),
    descriptionsItems: [
        {
            prop: 'name',
            label: '书名',
            span: 4,
        },
        {
            prop: 'clsNo',
            label: '分类号',
            span: 2,
        },
        {
            prop: 'publishNo',
            label: '出版号',
            span: 2,
        },
        {
            prop: 'author',
            label: '作者',
            span: 1,
        },
        {
            prop: 'publisher',
            label: '出版社',
            span: 3
        },
        {
            prop: 'id',
            label: '序列号',
            span: 1,
        },
        {
            prop: 'price',
            label: '价格',
            span: 1,
        },
        {
            prop: 'purchaseDate',
            label: '购入日期',
            span: 1,
        },
        {
            prop: 'status',
            label: '状态',
            span: 1,
        },
        {
            prop: 'description',
            label: '内容摘要',
        }
    ],
    column: 4,
    modelConverter: ({ status, ...rest }: Book): BookDescriptionsModel => ({
        ...rest,
        status: BookStatusValue[status]
    })
})

const queryBookBorrow = (queryBookId: string) => {
    router.push(`/panel/borrow?bookId=${queryBookId}`)
}

const borrowLoading: Ref<string | null> = ref(null)

const setBorrowLoading = (rowId: string | null) => {
    borrowLoading.value = rowId
}

const handleBorrow = async (bookId: string) => {
    setBorrowLoading(bookId)
    try {
        const { data } = await postBorrow(bookId)
        if (data?.success) {
            ElMessage.success(`借阅成功，您的最晚归还期限为${data.expireDate}，请按时归还`)
        } else {
            ElMessage.error(`借阅失败：${data?.reason}`)
        }
    } finally {
        tableRef.value?.refresh()
        setBorrowLoading(null)
    }
}

const handleCancelBook = async (bookId: string) => {
    setBorrowLoading(bookId)
    try {
        const { data } = await postCancelBook(bookId)
        if (data?.success) {
            ElMessage.success(`注销成功`)
        } else {
            ElMessage.error(`注销失败：${data?.reason}`)
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
        <template #status="{ row } : { row: BookTableData }">
            <div class="status-cell">
                <span class="dot" :style="{backgroundColor: BookStatusColor[row.status]}"></span>
                {{ BookStatusValue[row.status] }}
            </div>
        </template>
        <template #operation="{ row } : { row: BookTableData }">
            <el-tooltip effect="dark" content="详情" placement="top">
                <el-button type="primary" @click="showBookDetail(row.id)" text>
                    <el-icon>
                        <View />
                    </el-icon>
                </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="编辑" placement="top" v-if="row.status === 'available'">
                <el-button type="primary" @click="handleEditBook(row.id)()" v-permissions="['ROLE_ADMIN']" text>
                    <el-icon>
                        <EditPen />
                    </el-icon>
                </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="注销" placement="top" v-if="row.status === 'available'">
                <el-popconfirm title="您确定注销图书吗？该操作不可撤销" @confirm="handleCancelBook(row.id)">
                    <template #reference>
                        <el-button type="danger" :loading="borrowLoading === row.id" text>
                            <el-icon>
                                <CircleCloseFilled />
                            </el-icon>
                        </el-button>   
                    </template>
                </el-popconfirm>
            </el-tooltip>
            <el-tooltip effect="dark" content="借阅情况" placement="top" v-if="row.status === 'borrowed'">
                <el-button type="primary" @click="queryBookBorrow(row.id)" v-permissions="['ROLE_ADMIN']" text>
                    <el-icon>
                        <Collection />
                    </el-icon>
                </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="借阅" placement="top" v-if="row.status === 'available'">
                <el-popconfirm title="您确定借阅吗？" @confirm="handleBorrow(row.id)">
                    <template #reference>
                        <el-button type="success" :loading="borrowLoading === row.id" text>
                            <el-icon>
                                <Download />
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