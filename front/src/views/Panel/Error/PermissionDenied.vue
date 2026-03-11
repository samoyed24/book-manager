<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <el-result
        icon="error"
        title="403 Forbidden"
        sub-title="抱歉，您暂时无权限访问此页面"
    >
        <template #extra>
          <el-button type="primary" @click="router.back()">返回</el-button>
        </template>
      </el-result>
</template>