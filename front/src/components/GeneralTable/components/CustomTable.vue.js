const props = defineProps();
const emit = defineEmits(['sort-change', 'page-change']);
const handleSortChange = (e) => emit('sort-change', e);
const handlePageChange = (e) => emit('page-change', e);
const tableRef = ref();
const scrollToTop = () => {
    tableRef.value?.setScrollTop(0);
};
const __VLS_exposed = { scrollToTop };
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['el-table']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "table-wrapper" },
});
const __VLS_0 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onSortChange': {} },
    ref: "tableRef",
    data: (__VLS_ctx.tableData),
    headerCellStyle: ({ textAlign: 'center' }),
    height: (__VLS_ctx.height),
    showOverflowTooltip: (true),
    stripe: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSortChange': {} },
    ref: "tableRef",
    data: (__VLS_ctx.tableData),
    headerCellStyle: ({ textAlign: 'center' }),
    height: (__VLS_ctx.height),
    showOverflowTooltip: (true),
    stripe: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onSortChange: (__VLS_ctx.handleSortChange)
};
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
/** @type {typeof __VLS_ctx.tableRef} */ ;
var __VLS_8 = {};
__VLS_3.slots.default;
if (props.indexWidth) {
    const __VLS_10 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        label: "#",
        prop: "index",
        align: ('center'),
        minWidth: (props.indexWidth),
    }));
    const __VLS_12 = __VLS_11({
        label: "#",
        prop: "index",
        align: ('center'),
        minWidth: (props.indexWidth),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    __VLS_13.slots.default;
    {
        const { default: __VLS_thisSlot } = __VLS_13.slots;
        const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
        ((__VLS_ctx.paginationProps.currentPage - 1) * __VLS_ctx.paginationProps.pageSize + scope.$index + 1);
    }
    var __VLS_13;
}
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.tableColumnProps))) {
    const __VLS_14 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
        key: (index),
        label: (item.label),
        prop: (item.prop),
        width: (item.width),
        minWidth: (item.minWidth),
        sortable: (item.sortable),
        align: (item.align),
    }));
    const __VLS_16 = __VLS_15({
        key: (index),
        label: (item.label),
        prop: (item.prop),
        width: (item.width),
        minWidth: (item.minWidth),
        sortable: (item.sortable),
        align: (item.align),
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    __VLS_17.slots.default;
    {
        const { default: __VLS_thisSlot } = __VLS_17.slots;
        const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_18 = ((__VLS_ctx.$slots[item.prop] ? { render: () => __VLS_ctx.$slots[item.prop]?.(scope) } : 'span'));
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
        const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
        __VLS_21.slots.default;
        if (!__VLS_ctx.$slots[item.prop]) {
            (scope.row[item.prop]);
        }
        var __VLS_21;
    }
    var __VLS_17;
}
var __VLS_3;
const __VLS_22 = {}.ElPagination;
/** @type {[typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    ...{ 'onCurrentChange': {} },
    layout: "prev, pager, next",
    pageSize: (__VLS_ctx.paginationProps.pageSize),
    total: (__VLS_ctx.paginationProps.itemCount),
}));
const __VLS_24 = __VLS_23({
    ...{ 'onCurrentChange': {} },
    layout: "prev, pager, next",
    pageSize: (__VLS_ctx.paginationProps.pageSize),
    total: (__VLS_ctx.paginationProps.itemCount),
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
let __VLS_26;
let __VLS_27;
let __VLS_28;
const __VLS_29 = {
    onCurrentChange: (__VLS_ctx.handlePageChange)
};
var __VLS_25;
/** @type {__VLS_StyleScopedClasses['table-wrapper']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            handleSortChange: handleSortChange,
            handlePageChange: handlePageChange,
            tableRef: tableRef,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
