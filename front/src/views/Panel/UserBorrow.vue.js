import { BorrowStatusColor, BorrowStatusValue } from '@/constants/mapping/borrow';
import { getUserBorrow, getUserPenalty } from '@/api/borrow';
import { useRoute } from 'vue-router';
import { borrowStatusOptions } from '@/constants/borrow';
import { createDialog } from '@/service/DialogService';
import CustomDescriptions from '@/components/Base/CustomDescriptions.vue';
import { ElNotification } from 'element-plus';
const route = useRoute();
const borrowFilterParamsGenerator = () => ({
    borrower: '',
    book: '',
    status: null,
    expireTime: [null, null],
});
const borrowFilterParamsInitializer = () => ({
    book: '',
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
        span: 24,
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
    const resp = await getUserBorrow({
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
const penaltyDialogFactory = (id) => createDialog(CustomDescriptions, {
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
});
const handleShowPenalty = (id) => {
    const dialog = penaltyDialogFactory(id);
    ElNotification.info('请使用 Ctrl + P 快捷键打印此罚款单，并于归还图书时上交罚款单与罚金');
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
    if (row.status === 'expired') {
        const __VLS_6 = {}.ElTooltip;
        /** @type {[typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ]} */ ;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
            effect: "dark",
            content: "查看罚款单",
            placement: "top",
        }));
        const __VLS_8 = __VLS_7({
            effect: "dark",
            content: "查看罚款单",
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
                if (!(row.status === 'expired'))
                    return;
                __VLS_ctx.handleShowPenalty(row.id);
            }
        };
        __VLS_13.slots.default;
        const __VLS_18 = {}.ElIcon;
        /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
        const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
        __VLS_21.slots.default;
        const __VLS_22 = {}.Tickets;
        /** @type {[typeof __VLS_components.Tickets, ]} */ ;
        // @ts-ignore
        const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({}));
        const __VLS_24 = __VLS_23({}, ...__VLS_functionalComponentArgsRest(__VLS_23));
        var __VLS_21;
        var __VLS_13;
        var __VLS_9;
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
            BorrowStatusColor: BorrowStatusColor,
            BorrowStatusValue: BorrowStatusValue,
            tableColumnProps: tableColumnProps,
            tableRef: tableRef,
            generalTableProps: generalTableProps,
            handleShowPenalty: handleShowPenalty,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
