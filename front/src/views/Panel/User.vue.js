import { Avatar, CircleCloseFilled, Collection, EditPen, UserFilled, View } from '@element-plus/icons-vue';
import { UserIsGraduatedValue } from '@/constants/mapping/user';
import { getUser, getUserDetails, postUserEdit } from '@/api/user';
import { getColorFromStatus, getYesOrNoFromStatus } from '@/constants/general';
import router from '@/router';
import { postCancelUser } from '@/api/auth';
import { createDialog } from '@/service/DialogService';
import CustomForm from '@/components/Base/CustomForm.vue';
import { facultyOptions, gradeOptions } from '@/constants/user';
import CustomDescriptions from '@/components/Base/CustomDescriptions.vue';
const userFilterParamsgGenerator = () => ({
    username: '',
    name: '',
    workNumber: '',
    idNumber: '',
    facultyName: '',
    major: '',
    grade: '',
    graduated: null,
});
const userIsGraduatedOptions = [
    {
        value: true,
        label: UserIsGraduatedValue.isGraduated,
    },
    {
        value: false,
        label: UserIsGraduatedValue.isNotGraduated,
    },
];
const buttonRecords = [
    {
        span: 24,
        text: "刷新",
        icon: 'Refresh',
        type: 'primary',
        method: () => tableRef?.value?.refresh()
    },
];
const upperFilterItems = [
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
];
const lowerFilterItems = [
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
];
const showUserDetail = (id) => createDialog(CustomDescriptions, {
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
    modelConverter: ({ graduated, ...rest }) => ({
        ...rest,
        graduated: getYesOrNoFromStatus(graduated)
    })
});
const fetchData = async (paginationProps) => {
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
    });
    return resp.data;
};
const editUserDialogFactory = (username) => {
    return createDialog(CustomForm, {
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
            };
        },
        fetchMethod: () => getUserDetails(username),
        converter: (raw) => {
            return {
                username: raw.username,
                name: raw.name,
                facultyName: raw.facultyName,
                major: raw.major,
                grade: raw.grade,
                graduated: raw.graduated,
            };
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
            method: async (model) => {
                try {
                    const { data } = await postUserEdit({
                        username: model.username,
                        name: model.name,
                        facultyName: model.facultyName,
                        major: model.major,
                        grade: model.grade,
                        graduated: model.graduated,
                    });
                    if (data?.success) {
                        ElMessage.success("成功编辑用户信息");
                    }
                }
                finally {
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
    });
};
const handleEditUser = (username) => {
    return () => {
        const dialog = editUserDialogFactory(username);
        if (dialog.divProps && dialog.divProps.submit) {
            dialog.divProps.submit.callbackOnDone = () => {
                tableRef.value?.refresh();
                dialog.dialogInstance.closeDialog();
            };
        }
    };
};
const queryUserBorrow = (queryUsername) => {
    router.push(`/panel/borrow?username=${queryUsername}`);
};
const tableColumnProps = [
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
];
const updateFilterParams = (newParams) => {
    paginationProps.itemCount = 0;
    Object.assign(userFilterParams, newParams);
    tableRef.value?.refresh();
};
const userFilterParams = reactive(userFilterParamsgGenerator());
const tableData = reactive([]);
const paginationProps = reactive({
    pageSize: 10,
    itemCount: 0,
    currentPage: 1,
});
const tableRef = ref(null);
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
};
const userLoading = ref(null);
const setUserLoading = (username) => {
    userLoading.value = username;
};
const handleCancelUser = async (username) => {
    setUserLoading(username);
    try {
        const { data } = await postCancelUser(username);
        if (data?.success) {
            ElMessage.success('注销成功');
        }
        else {
            ElMessage.error(`注销失败：${data?.reason}`);
        }
    }
    finally {
        tableRef.value?.refresh();
        setUserLoading(null);
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.GeneralTable;
/** @type {[typeof __VLS_components.GeneralTable, typeof __VLS_components.generalTable, typeof __VLS_components.GeneralTable, typeof __VLS_components.generalTable, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ref: "tableRef",
    fetchMethod: (__VLS_ctx.generalTableProps.fetchMethod),
    tableHeight: (__VLS_ctx.generalTableProps.tableHeight),
    button: (__VLS_ctx.generalTableProps.button),
    filter: (__VLS_ctx.generalTableProps.filter),
    pagination: (__VLS_ctx.generalTableProps.pagination),
    tableColumnProps: (__VLS_ctx.tableColumnProps),
}));
const __VLS_2 = __VLS_1({
    ref: "tableRef",
    fetchMethod: (__VLS_ctx.generalTableProps.fetchMethod),
    tableHeight: (__VLS_ctx.generalTableProps.tableHeight),
    button: (__VLS_ctx.generalTableProps.button),
    filter: (__VLS_ctx.generalTableProps.filter),
    pagination: (__VLS_ctx.generalTableProps.pagination),
    tableColumnProps: (__VLS_ctx.tableColumnProps),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {typeof __VLS_ctx.tableRef} */ ;
var __VLS_4 = {};
__VLS_3.slots.default;
{
    const { graduated: __VLS_thisSlot } = __VLS_3.slots;
    const { row } = __VLS_getSlotParam(__VLS_thisSlot);
    if (row.graduated) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
}
{
    const { valid: __VLS_thisSlot } = __VLS_3.slots;
    const { row } = __VLS_getSlotParam(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "status-cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "dot" },
        ...{ style: ({ backgroundColor: __VLS_ctx.getColorFromStatus(row.valid) }) },
    });
    (__VLS_ctx.getYesOrNoFromStatus(row.valid));
}
{
    const { userRole: __VLS_thisSlot } = __VLS_3.slots;
    const { row } = __VLS_getSlotParam(__VLS_thisSlot);
    if (row.userRole === 'ROLE_ADMIN') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_6 = {}.ElIcon;
        /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
            size: "10px",
        }));
        const __VLS_8 = __VLS_7({
            size: "10px",
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        __VLS_9.slots.default;
        const __VLS_10 = {}.Avatar;
        /** @type {[typeof __VLS_components.Avatar, ]} */ ;
        // @ts-ignore
        const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({}));
        const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
        var __VLS_9;
    }
    else if (row.userRole === 'ROLE_USER') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_14 = {}.ElIcon;
        /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
        // @ts-ignore
        const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
            size: "10px",
        }));
        const __VLS_16 = __VLS_15({
            size: "10px",
        }, ...__VLS_functionalComponentArgsRest(__VLS_15));
        __VLS_17.slots.default;
        const __VLS_18 = {}.UserFilled;
        /** @type {[typeof __VLS_components.UserFilled, ]} */ ;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
        const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
        var __VLS_17;
    }
}
{
    const { operation: __VLS_thisSlot } = __VLS_3.slots;
    const { row } = __VLS_getSlotParam(__VLS_thisSlot);
    const __VLS_22 = {}.ElTooltip;
    /** @type {[typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ]} */ ;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
        effect: "dark",
        content: "详情",
        placement: "top",
    }));
    const __VLS_24 = __VLS_23({
        effect: "dark",
        content: "详情",
        placement: "top",
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    __VLS_25.slots.default;
    const __VLS_26 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
        ...{ 'onClick': {} },
        type: "primary",
        text: true,
    }));
    const __VLS_28 = __VLS_27({
        ...{ 'onClick': {} },
        type: "primary",
        text: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    let __VLS_30;
    let __VLS_31;
    let __VLS_32;
    const __VLS_33 = {
        onClick: (...[$event]) => {
            __VLS_ctx.showUserDetail(row.username);
        }
    };
    __VLS_29.slots.default;
    const __VLS_34 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({}));
    const __VLS_36 = __VLS_35({}, ...__VLS_functionalComponentArgsRest(__VLS_35));
    __VLS_37.slots.default;
    const __VLS_38 = {}.View;
    /** @type {[typeof __VLS_components.View, ]} */ ;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({}));
    const __VLS_40 = __VLS_39({}, ...__VLS_functionalComponentArgsRest(__VLS_39));
    var __VLS_37;
    var __VLS_29;
    var __VLS_25;
    const __VLS_42 = {}.ElTooltip;
    /** @type {[typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ]} */ ;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
        effect: "dark",
        content: "借阅情况",
        placement: "top",
    }));
    const __VLS_44 = __VLS_43({
        effect: "dark",
        content: "借阅情况",
        placement: "top",
    }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    __VLS_45.slots.default;
    const __VLS_46 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
        ...{ 'onClick': {} },
        type: "primary",
        text: true,
    }));
    const __VLS_48 = __VLS_47({
        ...{ 'onClick': {} },
        type: "primary",
        text: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    let __VLS_50;
    let __VLS_51;
    let __VLS_52;
    const __VLS_53 = {
        onClick: (...[$event]) => {
            __VLS_ctx.queryUserBorrow(row.username);
        }
    };
    __VLS_49.slots.default;
    const __VLS_54 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({}));
    const __VLS_56 = __VLS_55({}, ...__VLS_functionalComponentArgsRest(__VLS_55));
    __VLS_57.slots.default;
    const __VLS_58 = {}.Collection;
    /** @type {[typeof __VLS_components.Collection, ]} */ ;
    // @ts-ignore
    const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({}));
    const __VLS_60 = __VLS_59({}, ...__VLS_functionalComponentArgsRest(__VLS_59));
    var __VLS_57;
    var __VLS_49;
    var __VLS_45;
    const __VLS_62 = {}.ElTooltip;
    /** @type {[typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ]} */ ;
    // @ts-ignore
    const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
        effect: "dark",
        content: "编辑",
        placement: "top",
    }));
    const __VLS_64 = __VLS_63({
        effect: "dark",
        content: "编辑",
        placement: "top",
    }, ...__VLS_functionalComponentArgsRest(__VLS_63));
    __VLS_65.slots.default;
    const __VLS_66 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
        ...{ 'onClick': {} },
        type: "primary",
        text: true,
    }));
    const __VLS_68 = __VLS_67({
        ...{ 'onClick': {} },
        type: "primary",
        text: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_67));
    let __VLS_70;
    let __VLS_71;
    let __VLS_72;
    const __VLS_73 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleEditUser(row.username)();
        }
    };
    __VLS_69.slots.default;
    const __VLS_74 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({}));
    const __VLS_76 = __VLS_75({}, ...__VLS_functionalComponentArgsRest(__VLS_75));
    __VLS_77.slots.default;
    const __VLS_78 = {}.EditPen;
    /** @type {[typeof __VLS_components.EditPen, ]} */ ;
    // @ts-ignore
    const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({}));
    const __VLS_80 = __VLS_79({}, ...__VLS_functionalComponentArgsRest(__VLS_79));
    var __VLS_77;
    var __VLS_69;
    var __VLS_65;
    const __VLS_82 = {}.ElTooltip;
    /** @type {[typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ]} */ ;
    // @ts-ignore
    const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({
        effect: "dark",
        content: "注销用户",
        placement: "top",
    }));
    const __VLS_84 = __VLS_83({
        effect: "dark",
        content: "注销用户",
        placement: "top",
    }, ...__VLS_functionalComponentArgsRest(__VLS_83));
    __VLS_85.slots.default;
    const __VLS_86 = {}.ElPopconfirm;
    /** @type {[typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
        ...{ 'onConfirm': {} },
        title: "您确定注销用户吗？",
    }));
    const __VLS_88 = __VLS_87({
        ...{ 'onConfirm': {} },
        title: "您确定注销用户吗？",
    }, ...__VLS_functionalComponentArgsRest(__VLS_87));
    let __VLS_90;
    let __VLS_91;
    let __VLS_92;
    const __VLS_93 = {
        onConfirm: (...[$event]) => {
            __VLS_ctx.handleCancelUser(row.username);
        }
    };
    __VLS_89.slots.default;
    {
        const { reference: __VLS_thisSlot } = __VLS_89.slots;
        if (row.valid && !row.userRole.includes('ROLE_ADMIN')) {
            const __VLS_94 = {}.ElButton;
            /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
            // @ts-ignore
            const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
                type: "danger",
                loading: (__VLS_ctx.userLoading === row.username),
                text: true,
            }));
            const __VLS_96 = __VLS_95({
                type: "danger",
                loading: (__VLS_ctx.userLoading === row.username),
                text: true,
            }, ...__VLS_functionalComponentArgsRest(__VLS_95));
            __VLS_97.slots.default;
            const __VLS_98 = {}.ElIcon;
            /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
            // @ts-ignore
            const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({}));
            const __VLS_100 = __VLS_99({}, ...__VLS_functionalComponentArgsRest(__VLS_99));
            __VLS_101.slots.default;
            const __VLS_102 = {}.CircleCloseFilled;
            /** @type {[typeof __VLS_components.CircleCloseFilled, ]} */ ;
            // @ts-ignore
            const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({}));
            const __VLS_104 = __VLS_103({}, ...__VLS_functionalComponentArgsRest(__VLS_103));
            var __VLS_101;
            var __VLS_97;
        }
    }
    var __VLS_89;
    var __VLS_85;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['status-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
// @ts-ignore
var __VLS_5 = __VLS_4;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Avatar: Avatar,
            CircleCloseFilled: CircleCloseFilled,
            Collection: Collection,
            EditPen: EditPen,
            UserFilled: UserFilled,
            View: View,
            getColorFromStatus: getColorFromStatus,
            getYesOrNoFromStatus: getYesOrNoFromStatus,
            showUserDetail: showUserDetail,
            handleEditUser: handleEditUser,
            queryUserBorrow: queryUserBorrow,
            tableColumnProps: tableColumnProps,
            tableRef: tableRef,
            generalTableProps: generalTableProps,
            userLoading: userLoading,
            handleCancelUser: handleCancelUser,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
