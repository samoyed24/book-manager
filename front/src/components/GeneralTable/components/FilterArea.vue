<script setup lang="ts">
import { DeleteFilled, Search } from '@element-plus/icons-vue';
import CustomInput, { GeneralInputProps } from '@/components/Base/CustomInput.vue'
import { TableData } from './CustomTable.vue';

export interface FilterParams {
    [key: string]: any;
}

export interface FilterInputAreaProps<T extends FilterParams> {
    upperInput: FilterItem<T>[]
    lowerInput: FilterItem<T>[]
    generator: () => T
    initializer?: () => T
}

export interface FilterItem<T extends TableData> {
    prop: keyof T
    span: number
    label: string
    input: GeneralInputProps
}

const props = defineProps<FilterInputAreaProps<FilterParams>>()

const emit = defineEmits(['update-filter'])

const handleUpdateFilter = () => emit('update-filter', form)

const form = reactive(props.initializer?.() || props.generator())

const reset = () => {
  Object.assign(form, props.generator())
  handleUpdateFilter()
}

</script>

<template>
  <el-form ref="formRef" :model="form">
    <el-space direction="vertical" class="filter-area-space">
      <el-row :gutter="10">
        <el-col :span="21">
          <el-row :gutter="10">
            <el-col v-for="(item, index) in props.upperInput" :key="index" :span="item.span">
              <el-form-item :label="item.label">
                <custom-input v-model="form[item.prop]" :input-props="item.input" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" style="width: 100%" @click="handleUpdateFilter">
            <template #icon>
                <Search />
            </template>
            搜索
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="21">
          <el-row :gutter="10">
            <el-col v-for="(item, index) in props.lowerInput" :key="index" :span="item.span">
              <el-form-item :label="item.label">
                 <custom-input v-model="form[item.prop]" :input-props="item.input" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3">
          <el-button @click="reset" type="warning" style="width: 100%">
            <template #icon>
                <DeleteFilled />
            </template>
            重置
          </el-button>
        </el-col>
      </el-row>
    </el-space>
  </el-form>
</template>

<style scoped>
.filter-area-space {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.filter-area-space > * {
  width: 100%;
}
.el-form-item {
  margin-bottom: 0;
}
</style>