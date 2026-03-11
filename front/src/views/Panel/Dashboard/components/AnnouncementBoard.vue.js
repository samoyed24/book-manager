const customTableRef = ref();
const tableColumnProps = ref([
    {
        prop: 'title',
        label: '标题',
        minWidth: '35%',
    },
    {
        prop: 'author',
        label: '发布部门',
        minWidth: '15%',
        align: 'center',
    },
    {
        prop: 'time',
        label: '发布时间',
        minWidth: '15%',
        align: 'center',
    },
    {
        prop: 'operation',
        label: '详情',
        minWidth: '15%',
        align: 'center',
    },
]);
const tableData = reactive([
    {
        level: 4,
        tag: '注意',
        author: '工程部',
        title: '项目A施工进度调整通知',
        time: '2025-10-22'
    },
    {
        level: 5,
        tag: '重要',
        author: '安全部',
        title: '安全生产专项检查启动',
        time: '2025-10-20'
    },
    {
        level: 4,
        tag: '注意',
        author: '工程部',
        title: '项目B竣工验收时间确定',
        time: '2025-10-21'
    },
    {
        level: 3,
        tag: '公告',
        author: '信息中心',
        title: '新版本系统上线通知',
        time: '2025-10-23'
    },
    {
        level: 3,
        tag: '公告',
        author: '采购部',
        title: '材料采购流程优化',
        time: '2025-10-19'
    },
    {
        level: 2,
        tag: '通知',
        author: '综合办公室',
        title: '节能减排月活动启动',
        time: '2025-10-21'
    },
    {
        level: 4,
        tag: '注意',
        author: '财务部',
        title: '财务报销制度更新',
        time: '2025-10-10'
    },
    {
        level: 3,
        tag: '公告',
        author: '人事部',
        title: '员工健康体检安排',
        time: '2025-10-16'
    },
    {
        level: 4,
        tag: '注意',
        author: '设备管理部',
        title: '设备维护计划提醒',
        time: '2025-10-23'
    },
    {
        level: 3,
        tag: '公告',
        author: '培训中心',
        title: '员工培训报名通知',
        time: '2025-10-24'
    },
]);
const handleSortChange = () => { };
const tableLoading = ref(false);
const setTableLoading = (status) => { tableLoading.value = status; };
const itemTotal = ref(0);
const paginationProps = reactive({
    pageSize: 8,
    itemCount: 0,
    currentPage: 1,
});
const handlePageChange = (e) => {
    customTableRef.value?.scrollToTop();
    paginationProps.currentPage = e;
    // fetchData()
};
const calcTypeFromLevel = (level) => {
    if (level <= 1)
        return 'info';
    else if (level <= 2)
        return 'primary';
    else if (level <= 3)
        return 'success';
    else if (level <= 4)
        return 'warning';
    else
        return 'danger';
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.CustomCard;
/** @type {[typeof __VLS_components.CustomCard, typeof __VLS_components.customCard, typeof __VLS_components.CustomCard, typeof __VLS_components.customCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    header: ({ icon: 'BellFilled', text: '公告栏' }),
    noPadding: (true),
}));
const __VLS_2 = __VLS_1({
    header: ({ icon: 'BellFilled', text: '公告栏' }),
    noPadding: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.CustomTable;
/** @type {[typeof __VLS_components.CustomTable, typeof __VLS_components.customTable, typeof __VLS_components.CustomTable, typeof __VLS_components.customTable, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ 'onSortChange': {} },
    ...{ 'onPageChange': {} },
    ref: "customTableRef",
    tableData: (__VLS_ctx.tableData),
    tableColumnProps: (__VLS_ctx.tableColumnProps),
    indexWidth: ('10%'),
    ...{ class: "custom-table" },
    height: (300),
    loading: (__VLS_ctx.tableLoading),
    itemTotal: (__VLS_ctx.itemTotal),
    paginationProps: (__VLS_ctx.paginationProps),
}));
const __VLS_7 = __VLS_6({
    ...{ 'onSortChange': {} },
    ...{ 'onPageChange': {} },
    ref: "customTableRef",
    tableData: (__VLS_ctx.tableData),
    tableColumnProps: (__VLS_ctx.tableColumnProps),
    indexWidth: ('10%'),
    ...{ class: "custom-table" },
    height: (300),
    loading: (__VLS_ctx.tableLoading),
    itemTotal: (__VLS_ctx.itemTotal),
    paginationProps: (__VLS_ctx.paginationProps),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
let __VLS_9;
let __VLS_10;
let __VLS_11;
const __VLS_12 = {
    onSortChange: (__VLS_ctx.handleSortChange)
};
const __VLS_13 = {
    onPageChange: (__VLS_ctx.handlePageChange)
};
/** @type {typeof __VLS_ctx.customTableRef} */ ;
var __VLS_14 = {};
__VLS_8.slots.default;
{
    const { title: __VLS_thisSlot } = __VLS_8.slots;
    const { row } = __VLS_getSlotParam(__VLS_thisSlot);
    const __VLS_16 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        type: (__VLS_ctx.calcTypeFromLevel(row.level)),
    }));
    const __VLS_18 = __VLS_17({
        type: (__VLS_ctx.calcTypeFromLevel(row.level)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_19.slots.default;
    (row.tag);
    var __VLS_19;
    (row.title);
}
{
    const { operation: __VLS_thisSlot } = __VLS_8.slots;
    const { row } = __VLS_getSlotParam(__VLS_thisSlot);
    const __VLS_20 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        type: "text",
    }));
    const __VLS_22 = __VLS_21({
        type: "text",
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_23.slots.default;
    var __VLS_23;
}
var __VLS_8;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['custom-table']} */ ;
// @ts-ignore
var __VLS_15 = __VLS_14;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            customTableRef: customTableRef,
            tableColumnProps: tableColumnProps,
            tableData: tableData,
            handleSortChange: handleSortChange,
            tableLoading: tableLoading,
            itemTotal: itemTotal,
            paginationProps: paginationProps,
            handlePageChange: handlePageChange,
            calcTypeFromLevel: calcTypeFromLevel,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
