<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()

</script>

<template>
    <el-text v-if="route.meta.show" size="large" tag="b">
        {{ route.meta?.title }}
    </el-text>
    <el-breadcrumb v-if="route.meta.show" separator="/" class="custom-breadcrumb">
        <el-breadcrumb-item v-for="{ path, meta } in route.matched" :key="path">{{ meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<style scoped>
.custom-breadcrumb {
    margin-left: auto;
}
</style>