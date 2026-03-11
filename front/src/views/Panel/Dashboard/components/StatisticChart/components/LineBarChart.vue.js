import * as echarts from 'echarts/core';
import { ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { getBookRank } from '@/api/borrow';
echarts.use([
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    LineChart,
    CanvasRenderer,
    UniversalTransition
]);
const bookChartData = ref([]);
const chartMax = computed(() => {
    if (!bookChartData.value.length)
        return 0;
    return Math.ceil(Math.max(...bookChartData.value.map(item => item[1])) * 1.1);
});
const fetchData = async () => {
    const { data } = await getBookRank();
    if (data) {
        bookChartData.value = data;
    }
};
const option = computed(() => ({
    grid: {
        show: true,
        left: '10%',
        right: '10%',
        top: '15%',
        bottom: '15%',
        borderColor: '#ccc',
        backgroundColor: '#FAFAFA'
    },
    tooltip: {
        trigger: 'axis',
    },
    legend: {
        data: ['借出次数']
    },
    xAxis: {
        type: 'category',
        name: '书名',
        data: bookChartData.value.map(item => item[0]) // ✅
    },
    yAxis: {
        type: 'value',
        name: '借出次数',
        min: 0,
        max: chartMax.value,
        axisLabel: {
            formatter: '{value} 次'
        }
    },
    series: [
        {
            name: '借出次数',
            type: 'bar',
            data: bookChartData.value.map(item => item[1]), // ✅
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                    { offset: 0, color: '#E7A334' },
                    { offset: 0.5, color: '#EF7F18' },
                    { offset: 1, color: '#FC3303' }
                ])
            }
        }
    ]
}));
fetchData();
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.BaseChart;
/** @type {[typeof __VLS_components.BaseChart, typeof __VLS_components.baseChart, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    option: (__VLS_ctx.option),
}));
const __VLS_2 = __VLS_1({
    option: (__VLS_ctx.option),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            option: option,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
