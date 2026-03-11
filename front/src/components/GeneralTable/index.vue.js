import ButtonArea from '@/components/GeneralTable/components/ButtonArea.vue';
import FilterArea from '@/components/GeneralTable/components/FilterArea.vue';
import CustomTable from '@/components/GeneralTable/components/CustomTable.vue';
import { APIError } from '@/api/wrapper';
const props = defineProps();
const tableData = reactive([]);
const handleSortChange = (e) => {
    console.log(e);
};
const handlePageChange = (currentPage) => {
    customTableRef.value?.scrollToTop();
    paginationProps.currentPage = currentPage;
    handleFetchData();
};
const tableLoading = ref(false);
const setTableLoading = (status) => { tableLoading.value = status; };
const itemTotal = ref(0);
const paginationProps = reactive(props.pagination?.propsGenerator?.() || {
    pageSize: 10,
    itemCount: 0,
    currentPage: 1,
});
const handleFetchData = async () => {
    try {
        setTableLoading(true);
        const fetchResult = await props.fetchMethod(paginationProps);
        if (fetchResult?.content && fetchResult?.content !== null) {
            tableData.splice(0, paginationProps.pageSize, ...fetchResult.content);
        }
        if (fetchResult?.totalElements && fetchResult?.totalElements !== null) {
            itemTotal.value = fetchResult.totalElements;
            paginationProps.itemCount = fetchResult.totalElements;
        }
    }
    catch (err) {
        if (err instanceof APIError) {
            ElMessage.error('数据获取失败：' + err.errMsg);
        }
    }
    finally {
        setTableLoading(false);
    }
};
const customTableRef = ref();
handleFetchData();
let __VLS_exposed;
defineExpose({
    refresh: handleFetchData
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElSpace;
/** @type {[typeof __VLS_components.ElSpace, typeof __VLS_components.elSpace, typeof __VLS_components.ElSpace, typeof __VLS_components.elSpace, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    direction: "vertical",
    ...{ class: "full custom-space" },
    size: (20),
}));
const __VLS_2 = __VLS_1({
    direction: "vertical",
    ...{ class: "full custom-space" },
    size: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
if (props.filter?.enable) {
    /** @type {[typeof FilterArea, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(FilterArea, new FilterArea({
        ...{ 'onUpdateFilter': {} },
        generator: (props.filter?.formGenerator || (() => { return {}; })),
        initializer: (props.filter.filterParamsInitializer || (() => { return {}; })),
        upperInput: (props.filter.upperItems || []),
        lowerInput: (props.filter.lowerItems || []),
    }));
    const __VLS_6 = __VLS_5({
        ...{ 'onUpdateFilter': {} },
        generator: (props.filter?.formGenerator || (() => { return {}; })),
        initializer: (props.filter.filterParamsInitializer || (() => { return {}; })),
        upperInput: (props.filter.upperItems || []),
        lowerInput: (props.filter.lowerItems || []),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    let __VLS_8;
    let __VLS_9;
    let __VLS_10;
    const __VLS_11 = {
        onUpdateFilter: (props.filter.onUpdateFilterParams)
    };
    var __VLS_7;
}
if (props.button?.enable) {
    /** @type {[typeof ButtonArea, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(ButtonArea, new ButtonArea({
        gutter: (24),
        buttons: (props.button?.records || []),
    }));
    const __VLS_13 = __VLS_12({
        gutter: (24),
        buttons: (props.button?.records || []),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
}
/** @type {[typeof CustomTable, typeof CustomTable, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(CustomTable, new CustomTable({
    ...{ 'onSortChange': {} },
    ...{ 'onPageChange': {} },
    ref: "customTableRef",
    tableData: (__VLS_ctx.tableData),
    tableColumnProps: (__VLS_ctx.tableColumnProps),
    indexWidth: ('5%'),
    ...{ class: "custom-table" },
    height: (props.tableHeight),
    loading: (__VLS_ctx.tableLoading),
    itemTotal: (__VLS_ctx.itemTotal),
    paginationProps: (__VLS_ctx.paginationProps),
}));
const __VLS_16 = __VLS_15({
    ...{ 'onSortChange': {} },
    ...{ 'onPageChange': {} },
    ref: "customTableRef",
    tableData: (__VLS_ctx.tableData),
    tableColumnProps: (__VLS_ctx.tableColumnProps),
    indexWidth: ('5%'),
    ...{ class: "custom-table" },
    height: (props.tableHeight),
    loading: (__VLS_ctx.tableLoading),
    itemTotal: (__VLS_ctx.itemTotal),
    paginationProps: (__VLS_ctx.paginationProps),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
let __VLS_18;
let __VLS_19;
let __VLS_20;
const __VLS_21 = {
    onSortChange: (__VLS_ctx.handleSortChange)
};
const __VLS_22 = {
    onPageChange: (__VLS_ctx.handlePageChange)
};
/** @type {typeof __VLS_ctx.customTableRef} */ ;
var __VLS_23 = {};
__VLS_17.slots.default;
for (const [_, name] of __VLS_getVForSourceType((__VLS_ctx.$slots))) {
    {
        const { [__VLS_tryAsConstant(name)]: __VLS_thisSlot } = __VLS_17.slots;
        const [slotProps] = __VLS_getSlotParams(__VLS_thisSlot);
        var __VLS_25 = {
            ...(slotProps),
        };
        var __VLS_26 = __VLS_tryAsConstant(name);
    }
}
var __VLS_17;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-space']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table']} */ ;
// @ts-ignore
var __VLS_24 = __VLS_23, __VLS_27 = __VLS_26, __VLS_28 = __VLS_25;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ButtonArea: ButtonArea,
            FilterArea: FilterArea,
            CustomTable: CustomTable,
            tableData: tableData,
            handleSortChange: handleSortChange,
            handlePageChange: handlePageChange,
            tableLoading: tableLoading,
            itemTotal: itemTotal,
            paginationProps: paginationProps,
            customTableRef: customTableRef,
        };
    },
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
