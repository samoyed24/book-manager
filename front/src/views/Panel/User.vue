<script setup lang="ts">
import { ButtonAreaRecord } from '@/components/GeneralTable/components/ButtonArea.vue';
import { FilterItem } from '@/components/GeneralTable/components/FilterArea.vue';
import { PaginationProps, TableColumnProps } from '@/components/GeneralTable/components/CustomTable.vue';
import { Avatar, CircleCloseFilled, CloseBold, Collection, Delete, EditPen, SemiSelect, Setting, UserFilled, View } from '@element-plus/icons-vue';
import { Option } from '@/components/Base/CustomInput.vue'
import { GeneralTableExposes, GeneralTableProps } from '@/components/GeneralTable/index.vue';
import { User, UserDescriptionsModel, UserEditModel, UserFilterParams, UserIsGraduated, UserTableData } from 'types/user';
import { UserIsGraduatedValue } from '@/constants/mapping/user';
import { getUser, getUserDetails, postUserEdit } from '@/api/user';
import { getColorFromStatus, getYesOrNoFromStatus } from '@/constants/general';
import router from '@/router';
import { postCancelUser } from '@/api/auth';
import { createDialog } from '@/service/DialogService';
import CustomForm, { CustomFormProps } from '@/components/Base/CustomForm.vue';
import { facultyOptions, gradeOptions } from '@/constants/user';
import CustomDescriptions, { CustomDescriptionsProps } from '@/components/Base/CustomDescriptions.vue';

const userFilterParamsgGenerator: () => UserFilterParams = () => ({
    username: '',
    name: '',
    workNumber: '',
    idNumber: '',
    facultyName: '',
    major: '',
    grade: '',
    graduated: null,
})

const userIsGraduatedOptions: Option<UserIsGraduated>[] = [
    {
        value: true,
        label: UserIsGraduatedValue.isGraduated,
    },
    {
        value: false,
        label: UserIsGraduatedValue.isNotGraduated,
    },
]


const buttonRecords: ButtonAreaRecord[] = [
    {
        span: 24,
        text: "刷新",
        icon: 'Refresh',
        type: 'primary',
        method: () => tableRef?.value?.refresh()
    },
]

const upperFilterItems: FilterItem<UserFilterParams>[] = [
    {
        span: 6,
        label: '用户名',
        prop: 'username',
        input: {
            type: 'input',
            placeholder: '请输入用户名',
        }
    },
    {
        span: 6,
        label: '姓名',
        prop: 'name',
        input: {
            type: 'input',
            placeholder: '请输入用户姓名'
        }
    },
    {
        span: 6,
        label: '学号/工号',
        prop: 'workNumber',
        input: {
            type: 'input',
            placeholder: '请输入用户学号/工号'
        }
    },
    {
        span: 6,
        label: '身份证号',
        prop: 'idNumber',
        input: {
            type: 'input',
            placeholder: '请输入用户身份证号'
        },
    },
]

const lowerFilterItems: FilterItem<UserFilterParams>[] = [
    {
        span: 6,
        label: '所属学院',
        prop: 'facultyName',
        input: {
            type: 'input',
            placeholder: '请输入用户所属学院名称'
        },
    },
    {
        span: 6,
        label: '修读专业',
        prop: 'major',
        input: {
            type: 'input',
            placeholder: '请输入用户修读专业名称'
        },
    },
    {
        span: 6,
        label: '所属年级',
        prop: 'grade',
        input: {
            type: 'input',
            placeholder: '请输入用户所属年级'
        },
    },
    {
        span: 6,
        label: '是否已毕业',
        prop: 'graduated',
        input: {
            type: 'select',
            placeholder: '请选择用户是否已毕业',
            options: userIsGraduatedOptions,
        },
    },
]

const showUserDetail = (id: string) => createDialog<CustomDescriptionsProps<UserDescriptionsModel, User>>(CustomDescriptions, {
    title: '用户详情',
    footer: {
        show: false,
    },
    confirmBeforeClose: false,
    width: '40%',
    draggable: true,
}, {
    border: true,
    fetchMethod: () => getUserDetails(id),
    descriptionsItems: [
        {
            prop: 'username',
            label: '用户名',
            span: 2,
        },
        {
            prop: 'name',
            label: '姓名',
            span: 2,
        },
        {
            prop: 'workNumber',
            label: '学号/工号',
            span: 2,
        },
        {
            prop: 'idNumber',
            label: '身份证号',
            span: 2,
        },
        {
            prop: 'facultyName',
            label: '学院名称',
            span: 2,
        },
        {
            prop: 'major',
            label: '修读专业',
            span: 1,
        },
        {
            prop: 'grade',
            label: '年级',
            span: 1,
        },
        {
            prop: 'graduated',
            label: '已毕业',
            span: 1,
        },
        {
            prop: 'registerTime',
            label: '注册时间',
            span: 3,
        },
    ],
    column: 4,
    modelConverter: ({ graduated, ...rest }: User): UserDescriptionsModel => ({
        ...rest,
        graduated: getYesOrNoFromStatus(graduated)
    })
})

const fetchData = async (paginationProps: PaginationProps) => {
    const resp = await getUser({
        name: userFilterParams.name || null,
        username: userFilterParams.username || null,
        workNumber: userFilterParams.workNumber || null,
        idNumber: userFilterParams.idNumber || null,
        facultyName: userFilterParams.facultyName || null,
        major: userFilterParams.major || null,
        grade: userFilterParams.grade || null,
        graduated: userFilterParams.graduated !== null ? userFilterParams.graduated : null,
        pageSize: paginationProps.pageSize,
        currentPage: paginationProps.currentPage
    })
    return resp.data
}

const editUserDialogFactory = (username: string) =>  {
    return createDialog<CustomFormProps<UserEditModel, User>>(CustomForm, {
        title: '编辑用户信息',
        footer: {
            show: false
        },
        width: '40%'
    }, {
        defaultGetter: () => {
            return {
                username: '',
                facultyName: '',
                grade: '',
                graduated: false,
                major: '',
                name: '',
            }
        },
        fetchMethod: () => getUserDetails(username),
        converter: (raw: User): UserEditModel => {
            return {
                username: raw.username,
                name: raw.name,
                facultyName: raw.facultyName,
                major: raw.major,
                grade: raw.grade,
                graduated: raw.graduated,
            }
        },
        formItems: [
            {
                prop: 'name',
                label: '姓名',
                input: {
                    type: 'input',
                    placeholder: '请输入姓名',
                },
            },
            {
                prop: 'facultyName',
                label: '所属学院',
                input: {
                    type: 'select',
                    placeholder: '请选择所属学院',
                    options: facultyOptions,
                }
            },
            {
                prop: 'major',
                label: '修读专业',
                input: {
                    type: 'input',
                    placeholder: '请输入修读专业名称',
                }
            },
            {
                prop: 'grade',
                label: '所属年级',
                input: {
                    type: 'select',
                    placeholder: '请选择所属年级',
                    options: gradeOptions,
                }
            },
            {
                prop: 'graduated',
                label: '毕业',
                input: {
                    type: 'select',
                    options: [
                        {
                            label: '是',
                            value: true, 
                        },                        
                        {
                            label: '否',
                            value: false, 
                        },
                    ]
                }
            }
        ],
        submit: {
            method: async (model: UserEditModel) => {
                try {
                    const { data } = await postUserEdit({
                        username: model.username,
                        name: model.name,
                        facultyName: model.facultyName,
                        major: model.major,
                        grade: model.grade,
                        graduated: model.graduated,
                    })
                    if (data?.success) {
                        ElMessage.success("成功编辑用户信息")
                    }
                } finally {

                }
            },
            validationRules: {
                name: [
                    {
                        required: true,
                        message: '请输入您的姓名',
                        trigger: 'blur',
                    },
                ],   
                facultyName: [
                    {
                        required: true,
                        message: '请选择您的学院',
                        trigger: 'blur',
                    },
                ],
            },
            useConfirm: true,
            confirmText: '确认编辑此用户的信息吗？',
        },
    })
}

const handleEditUser = (
    username: string
) => {
    return () => {
        const dialog = editUserDialogFactory(username)
        if (dialog.divProps && dialog.divProps.submit) {
            dialog.divProps.submit.callbackOnDone = () => {
                tableRef.value?.refresh()
                dialog.dialogInstance.closeDialog()
            }
        } 
    }
}

const queryUserBorrow = (queryUsername: string) => {
    router.push(`/panel/borrow?username=${queryUsername}`)
} 

const tableColumnProps: TableColumnProps<UserTableData>[] = [
    {
        label: '用户名',
        prop: 'username',
        minWidth: '8%',
        align: 'center',
    },
    {
        label: '姓名',
        prop: 'name',
        minWidth: '7%',
        align: 'center',
    },
    {
        label: '学号/工号',
        prop: 'workNumber',
        minWidth: '12%',
        align: 'center',
    },
    {
        label: '所属学院',
        prop: 'facultyName',
        minWidth: '14%',
        align: 'center',
    },
    {
        label: '所属年级',
        prop: 'grade',
        minWidth: '7%',
        align: 'center',
    },
    {
        label: '已毕业',
        prop: 'graduated',
        minWidth: '7%',
        align: 'center',
    },
    {
        label: '有效',
        prop: 'valid',
        minWidth: '7%',
        align: 'center',
    },
    {
        label: '角色',
        prop: 'userRole',
        minWidth: '8%',
        align: 'center',
    },
    {
        label: '操作',
        prop: 'operation',
        minWidth: '24%',
        align: 'center',
    },
]

const updateFilterParams = (newParams: UserFilterParams) => {
    paginationProps.itemCount = 0
    Object.assign(userFilterParams, newParams)
    tableRef.value?.refresh()
}

const userFilterParams: UserFilterParams = reactive(userFilterParamsgGenerator())

const tableData: UserTableData[] = reactive<UserTableData[]>([])

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
        formGenerator: userFilterParamsgGenerator,
        upperItems: upperFilterItems,
        lowerItems: lowerFilterItems,
        onUpdateFilterParams: updateFilterParams,
    },
    button: {
        enable: true,
        records: buttonRecords,
    },
} as GeneralTableProps<UserFilterParams, UserTableData>

const userLoading: Ref<string | null> = ref(null)

const setUserLoading = (username: string | null) => {
    userLoading.value = username
}

const handleCancelUser = async (username: string) => {
    setUserLoading(username)
    try {
        const { data } = await postCancelUser(username)
        if (data?.success) {
            ElMessage.success('注销成功')
        } else {
            ElMessage.error(`注销失败：${data?.reason}`)
        }
    } finally {
        tableRef.value?.refresh()
        setUserLoading(null)
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
        <template #graduated="{ row } : { row: UserTableData }">
            <span v-if="row.graduated">是</span>
            <span v-else>否</span>
        </template>
        <template #valid="{ row } : { row: UserTableData }">
            <div class="status-cell">
                <span class="dot" :style="{backgroundColor: getColorFromStatus(row.valid)}"></span>
                {{ getYesOrNoFromStatus(row.valid) }}
            </div>
        </template>
        <template #userRole="{ row } : { row: UserTableData }">
            <div v-if="row.userRole === 'ROLE_ADMIN'">
                <el-icon size="10px">
                    <Avatar />
                </el-icon>
                管理员
            </div>
            <div v-else-if="row.userRole === 'ROLE_USER'">
                <el-icon size="10px">
                    <UserFilled />
                </el-icon>
                用户
            </div>
        </template>
        <template #operation="{ row } : { row: UserTableData }">
            <el-tooltip effect="dark" content="详情" placement="top">
                <el-button type="primary" @click="showUserDetail(row.username)" text>
                    <el-icon>
                        <View />
                    </el-icon>
                </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="借阅情况" placement="top">
                <el-button type="primary" @click="queryUserBorrow(row.username)" text>
                    <el-icon>
                        <Collection />
                    </el-icon>
                </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="编辑" placement="top">
                <el-button type="primary" @click="handleEditUser(row.username)()" text>
                    <el-icon>
                        <EditPen />
                    </el-icon>
                </el-button>
            </el-tooltip>
            <!-- <el-tooltip effect="dark" content="设为管理员" v-if="row.userRole === 'ROLE_USER'" placement="top">
                <el-button type="warning" text>
                    <el-icon>
                        <Avatar />
                    </el-icon>
                </el-button>
            </el-tooltip> -->
            <el-tooltip effect="dark" content="注销用户" placement="top">
                <el-popconfirm title="您确定注销用户吗？" @confirm="handleCancelUser(row.username)">
                    <template #reference>
                        <el-button type="danger" :loading="userLoading === row.username" v-if="row.valid && !row.userRole.includes('ROLE_ADMIN')" text>
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