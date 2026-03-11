import * as echarts from 'echarts';
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
const props = defineProps({
    option: { type: Object, required: true },
    theme: { type: String, default: 'light' }
});
const chartRef = ref(null);
let chartInstance = null;
// 初始化图表
const initChart = () => {
    if (chartRef.value) {
        chartInstance = echarts.init(chartRef.value, props.theme);
        chartInstance.setOption(props.option);
    }
};
// 监听 option 变化自动更新
watch(() => props.option, (newOption) => {
    if (chartInstance && newOption) {
        chartInstance.setOption(newOption);
    }
}, { deep: true });
// 监听窗口变化自适应
window.addEventListener('resize', () => {
    chartInstance?.resize();
});
onMounted(initChart);
onBeforeUnmount(() => {
    chartInstance?.dispose();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "chartRef",
    ...{ class: "chart" },
    ...{ style: {} },
});
/** @type {typeof __VLS_ctx.chartRef} */ ;
/** @type {__VLS_StyleScopedClasses['chart']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            chartRef: chartRef,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
