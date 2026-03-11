<script setup lang="ts">
import { APIError, APIResponse } from '@/api/wrapper'

export interface DescriptionsModel {}

export interface CustomDescriptionsItemProps<T extends DescriptionsModel> {
    prop: keyof T
    label?: string
    span?: number
    width?: number | string
    rowspan?: number
    labelWidth?: number | string
    align?: 'left' | 'center' | 'right'
    labelAlign?: 'left' | 'center' | 'right'
}

export interface CustomDescriptionsProps<T extends DescriptionsModel, E extends any = T> {
    descriptionsItems: CustomDescriptionsItemProps<T>[]
    fetchMethod: () => Promise<APIResponse<E>>
    title?: string
    border?: boolean
    direction?: 'horizontal' | 'vertical'
    column?: number
    modelConverter?: (model: E) => T
}
const props = defineProps<CustomDescriptionsProps<DescriptionsModel, DescriptionsModel>>()

const descriptionLoading = ref(false)
const setLoading = (state: boolean) => {
    descriptionLoading.value = state
}

const descriptionsModel = ref<DescriptionsModel>({})

const fetchData = async () => {
    setLoading(true)
    try {
        const { data } = await props.fetchMethod()
        if (data) {
            if (props.modelConverter) {
                descriptionsModel.value = props.modelConverter(data)
            } else {
                descriptionsModel.value = data
            }
        }
    } catch (err) {
        if (err instanceof APIError) {
            
        }
    } finally {
        setLoading(false)
    }
}

fetchData()

</script>

<template>
    
    <el-descriptions 
        :title="title || ''" 
        :border="border || false"
        :column="column || 3"
        :direction="direction || 'vertical'"
        v-loading="descriptionLoading"
    >
        <el-descriptions-item
            v-for="item in descriptionsItems"
            :label="item.label"
            :span="item.span"
            :width="item.width"
            :rowspan="item.rowspan"
            :label-width="item.labelWidth"
            :align="item.align"
            :label-align="item.labelAlign"
        >
            {{ descriptionsModel[item.prop] }}
        </el-descriptions-item>
    </el-descriptions>
</template>