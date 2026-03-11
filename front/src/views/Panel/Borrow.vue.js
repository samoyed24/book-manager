import { BorrowStatusColor, BorrowStatusValue } from '@/constants/mapping/borrow';
import { getBorrow, postDeleteBorrow, postRenew, postReturnBorrow } from '@/api/borrow';
import { CircleCloseFilled, FolderChecked, RefreshLeft } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { borrowStatusOptions } from '@/constants/borrow';
const route = useRoute();
const borrowFilterParamsGenerator = () => ({
    borrower: '',
    book: '',
    status: null,
    expireTime: [null, null],
});
const borrowFilterParamsInitializer = () => ({
    borrower: route.query.username || '',
    book: route.query.bookId || '',
    status: null,
    expireTime: [null, null],
});
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
];
const lowerFilterItems = [
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
];
const fetchData = async (paginationProps) => {
    const resp = await getBorrow({
        borrower: borrowFilterParams.borrower || null,
        book: borrowFilterParams.book || null,
        status: borrowFilterParams.status || null,
        expireTimeFrom: borrowFilterParams.expireTime[0]?.toISOString() || null,
        expireTimeTo: borrowFilterParams.expireTime[1]?.toISOString() || null,
        pageSize: paginationProps.pageSize,
        currentPage: paginationProps.currentPage
    });
    return resp.data;
};
const tableColumnProps = [
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
];
const updateFilterParams = (newParams) => {
    paginationProps.itemCount = 0;
    Object.assign(borrowFilterParams, newParams);
    tableRef.value?.refresh();
};
const borrowFilterParams = reactive(borrowFilterParamsInitializer());
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
};
const borrowLoading = ref(null);
const setBorrowLoading = (rowId) => {
    borrowLoading.value = rowId;
};
const handleRenew = async (borrowId) => {
    setBorrowLoading(borrowId);
    try {
        const { data } = await postRenew(borrowId);
        if (data?.success) {
            ElMessage.success(`续借成功，最晚归还期限延长至${data.expireDate}`);
        }
        else {
            ElMessage.error(`续借失败：${data?.reason}`);
        }
    }
    finally {
        tableRef.value?.refresh();
        setBorrowLoading(null);
    }
};
const handleReturnBorrow = async (borrowId) => {
    setBorrowLoading(borrowId);
    try {
        const { data } = await postReturnBorrow(borrowId);
        if (data?.success) {
            ElMessage.success(`还书成功`);
        }
        else {
            ElMessage.error(`还书失败：${data?.reason}`);
        }
    }
    finally {
        tableRef.value?.refresh();
        setBorrowLoading(null);
    }
};
const handleDeleteBorrow = async (borrowId) => {
    setBorrowLoading(borrowId);
    try {
        const { data } = await postDeleteBorrow(borrowId);
        if (data?.success) {
            ElMessage.success(`借阅记录删除成功`);
        }
        else {
            ElMessage.error(`借阅记录删除失败：${data?.reason}`);
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
        ...{ style: ({ backgroundColor: __VLS_ctx.BorrowStatusColor[row.status] }) },
    });
    (__VLS_ctx.BorrowStatusValue[row.status]);
}
{
    const { operation: __VLS_thisSlot } = __VLS_3.slots;
    const { row } = __VLS_getSlotParam(__VLS_thisSlot);
    const __VLS_6 = {}.ElTooltip;
    /** @type {[typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        effect: "dark",
        content: "归还",
        placement: "top",
    }));
    const __VLS_8 = __VLS_7({
        effect: "dark",
        content: "归还",
        placement: "top",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_9.slots.default;
    const __VLS_10 = {}.ElPopconfirm;
    /** @type {[typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        ...{ 'onConfirm': {} },
        title: "您确定归还吗？",
    }));
    const __VLS_12 = __VLS_11({
        ...{ 'onConfirm': {} },
        title: "您确定归还吗？",
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    let __VLS_14;
    let __VLS_15;
    let __VLS_16;
    const __VLS_17 = {
        onConfirm: (...[$event]) => {
            __VLS_ctx.handleReturnBorrow(row.id);
        }
    };
    __VLS_13.slots.default;
    {
        const { reference: __VLS_thisSlot } = __VLS_13.slots;
        if (row.status !== 'returned') {
            const __VLS_18 = {}.ElButton;
            /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
            // @ts-ignore
            const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
                type: "success",
                loading: (__VLS_ctx.borrowLoading === row.id),
                text: true,
            }));
            const __VLS_20 = __VLS_19({
                type: "success",
                loading: (__VLS_ctx.borrowLoading === row.id),
                text: true,
            }, ...__VLS_functionalComponentArgsRest(__VLS_19));
            __VLS_21.slots.default;
            const __VLS_22 = {}.ElIcon;
            /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
            // @ts-ignore
            const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({}));
            const __VLS_24 = __VLS_23({}, ...__VLS_functionalComponentArgsRest(__VLS_23));
            __VLS_25.slots.default;
            const __VLS_26 = {}.FolderChecked;
            /** @type {[typeof __VLS_components.FolderChecked, ]} */ ;
            // @ts-ignore
            const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({}));
            const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
            var __VLS_25;
            var __VLS_21;
        }
    }
    var __VLS_13;
    var __VLS_9;
    const __VLS_30 = {}.ElTooltip;
    /** @type {[typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ]} */ ;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        effect: "dark",
        content: "续借",
        placement: "top",
    }));
    const __VLS_32 = __VLS_31({
        effect: "dark",
        content: "续借",
        placement: "top",
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    __VLS_33.slots.default;
    const __VLS_34 = {}.ElPopconfirm;
    /** @type {[typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
        ...{ 'onConfirm': {} },
        title: "您确定续借吗？",
    }));
    const __VLS_36 = __VLS_35({
        ...{ 'onConfirm': {} },
        title: "您确定续借吗？",
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    let __VLS_38;
    let __VLS_39;
    let __VLS_40;
    const __VLS_41 = {
        onConfirm: (...[$event]) => {
            __VLS_ctx.handleRenew(row.id);
        }
    };
    __VLS_37.slots.default;
    {
        const { reference: __VLS_thisSlot } = __VLS_37.slots;
        if (row.status === 'normal') {
            const __VLS_42 = {}.ElButton;
            /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
            // @ts-ignore
            const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
                type: "primary",
                loading: (__VLS_ctx.borrowLoading === row.id),
                text: true,
            }));
            const __VLS_44 = __VLS_43({
                type: "primary",
                loading: (__VLS_ctx.borrowLoading === row.id),
                text: true,
            }, ...__VLS_functionalComponentArgsRest(__VLS_43));
            __VLS_45.slots.default;
            const __VLS_46 = {}.ElIcon;
            /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
            // @ts-ignore
            const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({}));
            const __VLS_48 = __VLS_47({}, ...__VLS_functionalComponentArgsRest(__VLS_47));
            __VLS_49.slots.default;
            const __VLS_50 = {}.RefreshLeft;
            /** @type {[typeof __VLS_components.RefreshLeft, ]} */ ;
            // @ts-ignore
            const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({}));
            const __VLS_52 = __VLS_51({}, ...__VLS_functionalComponentArgsRest(__VLS_51));
            var __VLS_49;
            var __VLS_45;
        }
    }
    var __VLS_37;
    var __VLS_33;
    const __VLS_54 = {}.ElTooltip;
    /** @type {[typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ]} */ ;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
        effect: "dark",
        content: "删除",
        placement: "top",
    }));
    const __VLS_56 = __VLS_55({
        effect: "dark",
        content: "删除",
        placement: "top",
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    __VLS_57.slots.default;
    const __VLS_58 = {}.ElPopconfirm;
    /** @type {[typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
        ...{ 'onConfirm': {} },
        title: "您确定删除吗？",
    }));
    const __VLS_60 = __VLS_59({
        ...{ 'onConfirm': {} },
        title: "您确定删除吗？",
    }, ...__VLS_functionalComponentArgsRest(__VLS_59));
    let __VLS_62;
    let __VLS_63;
    let __VLS_64;
    const __VLS_65 = {
        onConfirm: (...[$event]) => {
            __VLS_ctx.handleDeleteBorrow(row.id);
        }
    };
    __VLS_61.slots.default;
    {
        const { reference: __VLS_thisSlot } = __VLS_61.slots;
        const __VLS_66 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
            type: "danger",
            loading: (__VLS_ctx.borrowLoading === row.id),
            text: true,
        }));
        const __VLS_68 = __VLS_67({
            type: "danger",
            loading: (__VLS_ctx.borrowLoading === row.id),
            text: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_67));
        __VLS_69.slots.default;
        const __VLS_70 = {}.ElIcon;
        /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
        // @ts-ignore
        const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({}));
        const __VLS_72 = __VLS_71({}, ...__VLS_functionalComponentArgsRest(__VLS_71));
        __VLS_73.slots.default;
        const __VLS_74 = {}.CircleCloseFilled;
        /** @type {[typeof __VLS_components.CircleCloseFilled, ]} */ ;
        // @ts-ignore
        const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({}));
        const __VLS_76 = __VLS_75({}, ...__VLS_functionalComponentArgsRest(__VLS_75));
        var __VLS_73;
        var __VLS_69;
    }
    var __VLS_61;
    var __VLS_57;
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
            BorrowStatusColor: BorrowStatusColor,
            BorrowStatusValue: BorrowStatusValue,
            CircleCloseFilled: CircleCloseFilled,
            FolderChecked: FolderChecked,
            RefreshLeft: RefreshLeft,
            tableColumnProps: tableColumnProps,
            tableRef: tableRef,
            generalTableProps: generalTableProps,
            borrowLoading: borrowLoading,
            handleRenew: handleRenew,
            handleReturnBorrow: handleReturnBorrow,
            handleDeleteBorrow: handleDeleteBorrow,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
