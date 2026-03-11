<script setup lang="ts">
import LineBarChart from './components/LineBarChart.vue';
</script>

<template>
    <custom-card :header="{ icon: 'Histogram', text: '书籍借阅排行榜' }" :no-padding="true">
        <line-bar-chart />
    </custom-card>
</template>