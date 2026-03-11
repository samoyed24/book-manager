import { CircleCloseFilled, Collection, Download, View } from '@element-plus/icons-vue';
import { getBook, getBookDetails, postAddBook, postBorrow, postCancelBook, postEditBook } from '@/api/book';
import { BookStatusColor, BookStatusValue } from '@/constants/mapping/book';
import { createDialog } from '@/service/DialogService';
import CustomDescriptions from '@/components/Base/CustomDescriptions.vue';
import router from '@/router';
import { useUserAuthStore } from '@/stores/auth';
import CustomForm from '@/components/Base/CustomForm.vue';
import dayjs from 'dayjs';
const bookFilterParamsGenerator = () => ({
    id: '',
    clsNo: '',
    publishNo: '',
    name: '',
    author: '',
    publisher: '',
    status: null,
});
const bookStatusOptions = [
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
];
const bookAddFormModelGenerator = () => {
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
    };
};
const bookDialogFactory = (formTitle, submitMethod, confirmText, successText, fetchMethod, converter) => {
    return () => createDialog(CustomForm, {
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
            method: async (model) => {
                try {
                    const { data } = await submitMethod({
                        id: model.id,
                        clsNo: model.clsNo,
                        publishNo: model.publishNo,
                        name: model.name,
                        author: model.author,
                        description: model.description || null,
                        publisher: model.publisher,
                        price: model.price?.toString() || null,
                        purchaseDate: model.purchaseDate?.toISOString() || null,
                    });
                    if (data?.success) {
                        ElMessage.success(successText);
                    }
                }
                finally {
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
    });
};
const bookActionFactory = (formTitle, submitMethod, confirmText, successText, fetchMethod, converter) => {
    return () => {
        const dialog = bookDialogFactory(formTitle, submitMethod, confirmText, successText, fetchMethod, converter)();
        if (dialog.divProps && dialog.divProps.submit) {
            dialog.divProps.submit.callbackOnDone = () => {
                tableRef.value?.refresh();
                dialog.dialogInstance.closeDialog();
            };
        }
    };
};
const handleAddBook = bookActionFactory("添加书籍", postAddBook, "是否确认添加此书籍？", "书籍添加成功");
const bookToBookAddFormConverter = (raw) => {
    const { price, ...rest } = raw;
    return {
        ...rest,
        price: Number(raw.price),
        purchaseDate: raw.purchaseDate ? dayjs(raw.purchaseDate).toDate() : null,
    };
};
const handleEditBook = (bookId) => {
    return bookActionFactory("编辑书籍信息", postEditBook, "是否确认编辑此书籍？", "书籍编辑成功", () => getBookDetails(bookId), bookToBookAddFormConverter);
};
const buttonRecordsSelector = () => {
    const user = useUserAuthStore().getUser();
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
        ];
    }
    return [
        {
            span: 24,
            text: "刷新",
            icon: 'Refresh',
            type: 'primary',
            method: () => tableRef?.value?.refresh()
        },
    ];
};
const buttonRecords = buttonRecordsSelector();
const upperFilterItems = [
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
];
const lowerFilterItems = [
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
];
const fetchData = async (paginationProps) => {
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
    });
    return resp.data;
};
const tableColumnProps = [
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
];
const updateFilterParams = (newParams) => {
    paginationProps.itemCount = 0;
    Object.assign(bookFilterParams, newParams);
    tableRef.value?.refresh();
};
const bookFilterParams = reactive(bookFilterParamsGenerator());
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
        formGenerator: bookFilterParamsGenerator,
        upperItems: upperFilterItems,
        lowerItems: lowerFilterItems,
        onUpdateFilterParams: updateFilterParams,
    },
    button: {
        enable: true,
        records: buttonRecords,
    },
};
const showBookDetail = (id) => createDialog(CustomDescriptions, {
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
    modelConverter: ({ status, ...rest }) => ({
        ...rest,
        status: BookStatusValue[status]
    })
});
const queryBookBorrow = (queryBookId) => {
    router.push(`/panel/borrow?bookId=${queryBookId}`);
};
const borrowLoading = ref(null);
const setBorrowLoading = (rowId) => {
    borrowLoading.value = rowId;
};
const handleBorrow = async (bookId) => {
    setBorrowLoading(bookId);
    try {
        const { data } = await postBorrow(bookId);
        if (data?.success) {
            ElMessage.success(`借阅成功，您的最晚归还期限为${data.expireDate}，请按时归还`);
        }
        else {
            ElMessage.error(`借阅失败：${data?.reason}`);
        }
    }
    finally {
        tableRef.value?.refresh();
        setBorrowLoading(null);
    }
};
const handleCancelBook = async (bookId) => {
    setBorrowLoading(bookId);
    try {
        const { data } = await postCancelBook(bookId);
        if (data?.success) {
            ElMessage.success(`注销成功`);
        }
        else {
            ElMessage.error(`注销失败：${data?.reason}`);
        }
    }
    finally {
        tableRef.value?.refresh();
        setBorrowLoading(null);
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
    const { status: __VLS_thisSlot } = __VLS_3.slots;
    const { row } = __VLS_getSlotParam(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "status-cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "dot" },
        ...{ style: ({ backgroundColor: __VLS_ctx.BookStatusColor[row.status] }) },
    });
    (__VLS_ctx.BookStatusValue[row.status]);
}
{
    const { operation: __VLS_thisSlot } = __VLS_3.slots;
    const { row } = __VLS_getSlotParam(__VLS_thisSlot);
    const __VLS_6 = {}.ElTooltip;
    /** @type {[typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        effect: "dark",
        content: "详情",
        placement: "top",
    }));
    const __VLS_8 = __VLS_7({
        effect: "dark",
        content: "详情",
        placement: "top",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_9.slots.default;
    const __VLS_10 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        ...{ 'onClick': {} },
        type: "primary",
        text: true,
    }));
    const __VLS_12 = __VLS_11({
        ...{ 'onClick': {} },
        type: "primary",
        text: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    let __VLS_14;
    let __VLS_15;
    let __VLS_16;
    const __VLS_17 = {
        onClick: (...[$event]) => {
            __VLS_ctx.showBookDetail(row.id);
        }
    };
    __VLS_13.slots.default;
    const __VLS_18 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
    const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_21.slots.default;
    const __VLS_22 = {}.View;
    /** @type {[typeof __VLS_components.View, ]} */ ;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({}));
    const __VLS_24 = __VLS_23({}, ...__VLS_functionalComponentArgsRest(__VLS_23));
    var __VLS_21;
    var __VLS_13;
    var __VLS_9;
    if (row.status === 'available') {
        const __VLS_26 = {}.ElTooltip;
        /** @type {[typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ]} */ ;
        // @ts-ignore
        const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
            effect: "dark",
            content: "编辑",
            placement: "top",
        }));
        const __VLS_28 = __VLS_27({
            effect: "dark",
            content: "编辑",
            placement: "top",
        }, ...__VLS_functionalComponentArgsRest(__VLS_27));
        __VLS_29.slots.default;
        const __VLS_30 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
            ...{ 'onClick': {} },
            type: "primary",
            text: true,
        }));
        const __VLS_32 = __VLS_31({
            ...{ 'onClick': {} },
            type: "primary",
            text: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        let __VLS_34;
        let __VLS_35;
        let __VLS_36;
        const __VLS_37 = {
            onClick: (...[$event]) => {
                if (!(row.status === 'available'))
                    return;
                __VLS_ctx.handleEditBook(row.id)();
            }
        };
        __VLS_asFunctionalDirective(__VLS_directives.vPermissions)(null, { ...__VLS_directiveBindingRestFields, value: (['ROLE_ADMIN']) }, null, null);
        __VLS_33.slots.default;
        const __VLS_38 = {}.ElIcon;
        /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
        // @ts-ignore
        const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({}));
        const __VLS_40 = __VLS_39({}, ...__VLS_functionalComponentArgsRest(__VLS_39));
        __VLS_41.slots.default;
        const __VLS_42 = {}.EditPen;
        /** @type {[typeof __VLS_components.EditPen, ]} */ ;
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({}));
        const __VLS_44 = __VLS_43({}, ...__VLS_functionalComponentArgsRest(__VLS_43));
        var __VLS_41;
        var __VLS_33;
        var __VLS_29;
    }
    if (row.status === 'available') {
        const __VLS_46 = {}.ElTooltip;
        /** @type {[typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ]} */ ;
        // @ts-ignore
        const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
            effect: "dark",
            content: "注销",
            placement: "top",
        }));
        const __VLS_48 = __VLS_47({
            effect: "dark",
            content: "注销",
            placement: "top",
        }, ...__VLS_functionalComponentArgsRest(__VLS_47));
        __VLS_49.slots.default;
        const __VLS_50 = {}.ElPopconfirm;
        /** @type {[typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, ]} */ ;
        // @ts-ignore
        const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
            ...{ 'onConfirm': {} },
            title: "您确定注销图书吗？该操作不可撤销",
        }));
        const __VLS_52 = __VLS_51({
            ...{ 'onConfirm': {} },
            title: "您确定注销图书吗？该操作不可撤销",
        }, ...__VLS_functionalComponentArgsRest(__VLS_51));
        let __VLS_54;
        let __VLS_55;
        let __VLS_56;
        const __VLS_57 = {
            onConfirm: (...[$event]) => {
                if (!(row.status === 'available'))
                    return;
                __VLS_ctx.handleCancelBook(row.id);
            }
        };
        __VLS_53.slots.default;
        {
            const { reference: __VLS_thisSlot } = __VLS_53.slots;
            const __VLS_58 = {}.ElButton;
            /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
            // @ts-ignore
            const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
                type: "danger",
                loading: (__VLS_ctx.borrowLoading === row.id),
                text: true,
            }));
            const __VLS_60 = __VLS_59({
                type: "danger",
                loading: (__VLS_ctx.borrowLoading === row.id),
                text: true,
            }, ...__VLS_functionalComponentArgsRest(__VLS_59));
            __VLS_61.slots.default;
            const __VLS_62 = {}.ElIcon;
            /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
            // @ts-ignore
            const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({}));
            const __VLS_64 = __VLS_63({}, ...__VLS_functionalComponentArgsRest(__VLS_63));
            __VLS_65.slots.default;
            const __VLS_66 = {}.CircleCloseFilled;
            /** @type {[typeof __VLS_components.CircleCloseFilled, ]} */ ;
            // @ts-ignore
            const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({}));
            const __VLS_68 = __VLS_67({}, ...__VLS_functionalComponentArgsRest(__VLS_67));
            var __VLS_65;
            var __VLS_61;
        }
        var __VLS_53;
        var __VLS_49;
    }
    if (row.status === 'borrowed') {
        const __VLS_70 = {}.ElTooltip;
        /** @type {[typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ]} */ ;
        // @ts-ignore
        const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
            effect: "dark",
            content: "借阅情况",
            placement: "top",
        }));
        const __VLS_72 = __VLS_71({
            effect: "dark",
            content: "借阅情况",
            placement: "top",
        }, ...__VLS_functionalComponentArgsRest(__VLS_71));
        __VLS_73.slots.default;
        const __VLS_74 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({
            ...{ 'onClick': {} },
            type: "primary",
            text: true,
        }));
        const __VLS_76 = __VLS_75({
            ...{ 'onClick': {} },
            type: "primary",
            text: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_75));
        let __VLS_78;
        let __VLS_79;
        let __VLS_80;
        const __VLS_81 = {
            onClick: (...[$event]) => {
                if (!(row.status === 'borrowed'))
                    return;
                __VLS_ctx.queryBookBorrow(row.id);
            }
        };
        __VLS_asFunctionalDirective(__VLS_directives.vPermissions)(null, { ...__VLS_directiveBindingRestFields, value: (['ROLE_ADMIN']) }, null, null);
        __VLS_77.slots.default;
        const __VLS_82 = {}.ElIcon;
        /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
        // @ts-ignore
        const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({}));
        const __VLS_84 = __VLS_83({}, ...__VLS_functionalComponentArgsRest(__VLS_83));
        __VLS_85.slots.default;
        const __VLS_86 = {}.Collection;
        /** @type {[typeof __VLS_components.Collection, ]} */ ;
        // @ts-ignore
        const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({}));
        const __VLS_88 = __VLS_87({}, ...__VLS_functionalComponentArgsRest(__VLS_87));
        var __VLS_85;
        var __VLS_77;
        var __VLS_73;
    }
    if (row.status === 'available') {
        const __VLS_90 = {}.ElTooltip;
        /** @type {[typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ]} */ ;
        // @ts-ignore
        const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
            effect: "dark",
            content: "借阅",
            placement: "top",
        }));
        const __VLS_92 = __VLS_91({
            effect: "dark",
            content: "借阅",
            placement: "top",
        }, ...__VLS_functionalComponentArgsRest(__VLS_91));
        __VLS_93.slots.default;
        const __VLS_94 = {}.ElPopconfirm;
        /** @type {[typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, ]} */ ;
        // @ts-ignore
        const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
            ...{ 'onConfirm': {} },
            title: "您确定借阅吗？",
        }));
        const __VLS_96 = __VLS_95({
            ...{ 'onConfirm': {} },
            title: "您确定借阅吗？",
        }, ...__VLS_functionalComponentArgsRest(__VLS_95));
        let __VLS_98;
        let __VLS_99;
        let __VLS_100;
        const __VLS_101 = {
            onConfirm: (...[$event]) => {
                if (!(row.status === 'available'))
                    return;
                __VLS_ctx.handleBorrow(row.id);
            }
        };
        __VLS_97.slots.default;
        {
            const { reference: __VLS_thisSlot } = __VLS_97.slots;
            const __VLS_102 = {}.ElButton;
            /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
            // @ts-ignore
            const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
                type: "success",
                loading: (__VLS_ctx.borrowLoading === row.id),
                text: true,
            }));
            const __VLS_104 = __VLS_103({
                type: "success",
                loading: (__VLS_ctx.borrowLoading === row.id),
                text: true,
            }, ...__VLS_functionalComponentArgsRest(__VLS_103));
            __VLS_105.slots.default;
            const __VLS_106 = {}.ElIcon;
            /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
            // @ts-ignore
            const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({}));
            const __VLS_108 = __VLS_107({}, ...__VLS_functionalComponentArgsRest(__VLS_107));
            __VLS_109.slots.default;
            const __VLS_110 = {}.Download;
            /** @type {[typeof __VLS_components.Download, ]} */ ;
            // @ts-ignore
            const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({}));
            const __VLS_112 = __VLS_111({}, ...__VLS_functionalComponentArgsRest(__VLS_111));
            var __VLS_109;
            var __VLS_105;
        }
        var __VLS_97;
        var __VLS_93;
    }
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
            CircleCloseFilled: CircleCloseFilled,
            Collection: Collection,
            Download: Download,
            View: View,
            BookStatusColor: BookStatusColor,
            BookStatusValue: BookStatusValue,
            handleEditBook: handleEditBook,
            tableColumnProps: tableColumnProps,
            tableRef: tableRef,
            generalTableProps: generalTableProps,
            showBookDetail: showBookDetail,
            queryBookBorrow: queryBookBorrow,
            borrowLoading: borrowLoading,
            handleBorrow: handleBorrow,
            handleCancelBook: handleCancelBook,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
