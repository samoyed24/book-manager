<script lang="ts" setup>
import * as echarts from 'echarts/core';
import {
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import {
  BarChart,
  BarSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts';
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

type EChartsOption = echarts.ComposeOption<
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | BarSeriesOption
  | LineSeriesOption
>

const bookChartData: Ref<[string, number][]> = ref([])

const chartMax = computed(() => {
  if (!bookChartData.value.length) return 0
  return Math.ceil(
    Math.max(...bookChartData.value.map(item => item[1])) * 1.1
  )
})

const fetchData = async () => {
  const { data } = await getBookRank()
  if (data) {
    bookChartData.value = data
  }
}

const option = computed<EChartsOption>(() => ({
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
}))


fetchData()

// const option: EChartsOption = {
//   grid: {
//     show: true,
//     left: '10%',
//     right: '10%',
//     top: '15%',
//     bottom: '15%',
//     borderColor: '#ccc',
//     backgroundColor: '#FAFAFA'
//   },
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'cross',
//       crossStyle: {
//         color: '#999'
//       }
//     }
//   },
//   legend: {
//     // data: ['收入', '支出', '净利润', '利润率']
//     data: ['借出']
//   },
//   xAxis: [
//     {
//       type: 'category',
//       name: '书名',
//       axisPointer: {
//         type: 'shadow'
//       }
//     }
//   ],
//   yAxis: [
//     {
//       type: 'value',
//       name: '借出次数',
//       min: 0,
//       max: chartMax.value,
//       interval: 10000,
//       axisLabel: {
//         formatter: '{value} 次'
//       }
//     },
//     // {
//     //   type: 'value',
//     //   name: '利润率',
//     //   min: -500.0,
//     //   max: 500.0,
//     //   interval: 100,
//     //   axisLabel: {
//     //     formatter: '{value} %'
//     //   }
//     // }
//   ],
//   series: [
//     {
//       name: '借出次数',
//       type: 'bar',
//       tooltip: {
//         valueFormatter: function (value) {
//           return (value as number) + '次';
//         }
//       },
//       itemStyle: {
//         color: new echarts.graphic.LinearGradient(
//           0, 0, 1, 1,
//           [
//             { offset: 0, color: '#E7A334' },
//             { offset: 0.5, color: '#EF7F18' },
//             { offset: 1, color: '#FC3303' }
//           ]
//         )
//       },
//       data: bookChartData.value
//     },
//     // {
//     //   name: '支出',
//     //   type: 'bar',
//     //   tooltip: {
//     //     valueFormatter: function (value) {
//     //       return (value as number) + ' 元';
//     //     }
//     //   },
//     //   itemStyle: {
//     //     color: new echarts.graphic.LinearGradient(
//     //       0, 0, 1, 1,
//     //       [
//     //         { offset: 0, color: '#18B6EF' },
//     //         { offset: 0.5, color: '#1B9BEE' },
//     //         { offset: 1, color: '#0375FB' }
//     //       ]
//     //     )
//     //   },
//     //   data: [
//     //     ['2025-10-17', 7124.12],
//     //     ['2025-10-18', 26312.53],
//     //     ['2025-10-19', 1672.92],
//     //     ['2025-10-20', 11384.24],
//     //     ['2025-10-21', 6124.63],
//     //     ['2025-10-22', 2561.60],
//     //     ['2025-10-23', 26126.23]
//     //   ]
//     // },
//     // {
//     //   name: '净利润',
//     //   type: 'bar',
//     //   tooltip: {
//     //     valueFormatter: function (value) {
//     //       return (value as number) + ' 元';
//     //     }
//     //   },
//     //   itemStyle: {
//     //     color: new echarts.graphic.LinearGradient(
//     //       0, 0, 1, 1,
//     //       [
//     //         { offset: 0, color: '#D3F708' },
//     //         { offset: 0.5, color: '#77F708' },
//     //         { offset: 1, color: '#00EA33' }
//     //       ]
//     //     )
//     //   },
//     //   data: [
//     //     ['2025-10-17', -5561.75],
//     //     ['2025-10-18', -19684.41],
//     //     ['2025-10-19', 29589.29],
//     //     ['2025-10-20', 14783.05],
//     //     ['2025-10-21', 23287.75],
//     //     ['2025-10-22', 3673.07],
//     //     ['2025-10-23', -13345.00]
//     //   ]
//     // },
//     // {
//     //   name: '利润率',
//     //   type: 'line',
//     //   smooth: true,
//     //   yAxisIndex: 1,
//     //   tooltip: {
//     //     valueFormatter: function (value) {
//     //       return (value as number) + '%';
//     //     }
//     //   },
//     //   lineStyle: {
//     //     type: 'dashed',
//     //     width: 3,
//     //   },
//     //   itemStyle: {
//     //     color: new echarts.graphic.LinearGradient(
//     //       0, 0, 0, 1,
//     //       [
//     //         { offset: 0, color: '#F91167' },
//     //         { offset: 1, color: '#8811F9' }
//     //       ]
//     //     )
//     //   },
//     //   data: [   
//     //     ['2025-10-17', -355.98],
//     //     ['2025-10-18', -296.98],
//     //     ['2025-10-19', 94.649],     
//     //     ['2025-10-20', 56.494],
//     //     ['2025-10-21', 79.177],
//     //     ['2025-10-22', 58.914],
//     //     ['2025-10-23', -104.411]
//     //   ]
//     // }
//   ]
// };
// </script>

<template>
    <base-chart :option="option" />
</template>