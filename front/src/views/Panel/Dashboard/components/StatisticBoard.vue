<script setup lang="ts">
import { getBookStatistics } from '@/api/book';
import { BookStatisticsResult } from 'types/book';

// const statisticsData = reactive<BookStatisticsResult>({
//     totalBook: 0,
//     soonExpireBorrow: 0,
//     registeredUser: 0,
//     myBorrow: 0,
//     myTotalBorrow: 0,
//     borrowedBook: 0,
// })

const statisticsData = ref<BookStatisticsResult>({
    totalBook: 0,
    soonExpireBorrow: 0,
    registeredUser: 0,
    myBorrow: 0,
    myTotalBorrow: 0,
    borrowedBook: 0,
})

const fetchData = async () => {
    const { data } = await getBookStatistics()
    if (data){
        statisticsData.value = data
    }
}

fetchData()
</script>

<template>
    <custom-card :header="{ icon: 'DataLine', text: '图书统计数据' }">
        <template #default>
            <el-row :gutter="10">
                <el-col :span="8">
                    <custom-statistic-card 
                        :transition="{ duration: 1000, fromValue: 0 }"
                        :value="statisticsData.totalBook"
                        title="馆内总藏书"
                        :precision="0"
                        :icon="{
                            fromElIcon: 'Collection'
                        }"
                        suffix="本"
                    />
                </el-col>
                <el-col :span="8">
                    <custom-statistic-card 
                        :transition="{ duration: 1000, fromValue: 0 }"
                        :value="statisticsData.borrowedBook"
                        title="当前借出书籍"
                        :precision="0"
                        :icon="{
                            fromElIcon: 'Upload'
                        }"
                        suffix="本"
                    />
                </el-col>                        
                <el-col :span="8">
                    <custom-statistic-card 
                        :transition="{ duration: 1000, fromValue: 0 }"
                        :value="statisticsData.registeredUser"
                        title="注册读者数"
                        :precision="0"
                        :icon="{
                            fromElIcon: 'Avatar'
                        }"
                        suffix="人"
                    />
                </el-col>
            </el-row>  
            <el-row :gutter="10">
                <el-col :span="8">
                    <custom-statistic-card 
                        :transition="{ duration: 1000, fromValue: 0 }"
                        :value="statisticsData.myBorrow"
                        title="我的当前借阅"
                        :precision="0"
                        :icon="{
                            fromElIcon: 'Management'
                        }"
                        suffix="本"
                    />
                </el-col>                        
                <el-col :span="8">
                    <custom-statistic-card 
                        :transition="{ duration: 1000, fromValue: 0 }"
                        :value="statisticsData.soonExpireBorrow"
                        title="7 日内到期借阅"
                        :precision="0"
                        :icon="{
                            fromElIcon: 'WarnTriangleFilled'
                        }"
                        suffix="本"
                    />
                </el-col>                        
                <el-col :span="8">
                    <custom-statistic-card 
                        :transition="{ duration: 1000, fromValue: 0 }"
                        :value="statisticsData.myTotalBorrow"
                        title="我的总借阅量"
                        :precision="0"
                        :icon="{
                            fromElIcon: 'Management'
                        }"
                        suffix="本"
                    />
                </el-col>
            </el-row>
        </template>
    </custom-card>
</template>

<style scoped>
.el-row {
  margin-bottom: 10px;
}
</style>