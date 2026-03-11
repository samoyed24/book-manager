import LineBarChart from './components/LineBarChart.vue';
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.CustomCard;
/** @type {[typeof __VLS_components.CustomCard, typeof __VLS_components.customCard, typeof __VLS_components.CustomCard, typeof __VLS_components.customCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    header: ({ icon: 'Histogram', text: '书籍借阅排行榜' }),
    noPadding: (true),
}));
const __VLS_2 = __VLS_1({
    header: ({ icon: 'Histogram', text: '书籍借阅排行榜' }),
    noPadding: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
/** @type {[typeof LineBarChart, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(LineBarChart, new LineBarChart({}));
const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LineBarChart: LineBarChart,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
