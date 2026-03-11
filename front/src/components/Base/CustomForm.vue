<script setup lang="ts">
import { ElMessage, ElMessageBox, FormInstance,  FormRules } from 'element-plus';
import { GeneralInputProps } from '@/components/Base/CustomInput.vue';
import { APIResponse } from '@/api/wrapper';

export interface FormModel {}
export interface FormItem<T extends FormModel> {
    prop: keyof T
    label?: string
    disabled?: boolean
    input: GeneralInputProps
}
export interface CustomFormProps<T extends FormModel, E = T> {
    formItems: FormItem<T>[]
    defaultGetter: () => T // 空对象生成器，必须要有
    fetchMethod?: () => Promise<APIResponse<E>> // 如果需要异步获取数据，需要传这个
    converter?: (raw: E) => T   // 有时我们需要复用其他方法，此时可以通过传一个 `converter` 将其他方法得到的对象转成我们实际编辑需要的对象
    submit?: {
        submitText?: string
        method: (model: T) => Promise<void>
        useConfirm?: boolean
        confirmText?: string
        validationRules?: FormRules<T>
        callbackOnDone?: () => void
    }
}
const props = defineProps<CustomFormProps<any>>()
const model = ref()

const submitLoading = ref(false)
const setSubmitLoading = (loading: boolean) => {
    submitLoading.value = loading
}

const formLoading = ref(false)
const setLoading = (state: boolean) => {
    formLoading.value = state
}

const formRef = ref<FormInstance>()

const handleSubmit = async () => {
    if (!props.submit) return;

    const submitAction = async () => {
        setSubmitLoading(true);
        try {
            if (props.submit?.method) {
                console.log(model.value)
                await props.submit.method(model.value);
                props.submit?.callbackOnDone?.();
            }
        } finally {
            setSubmitLoading(false);
        }
    };

    if (props.submit.validationRules && formRef.value) {
        const valid = await formRef.value.validate().catch(() => false);
        if (!valid) return;

        if (props.submit?.useConfirm) {
            const confirmed = await ElMessageBox.confirm(
                props.submit.confirmText || '是否确认提交表单？',
                '请注意'
            ).catch(() => false);
            if (!confirmed) return;
        }
        await submitAction();
    }
};

const getFormDefault = () => {
    setLoading(true)
    try {
        model.value = props.defaultGetter()
    } catch(e) {
        ElMessage.error('表单数据获取失败: ' + e)
    } finally {
        setLoading(false)
    }
}

const fetchData = async () => {
    if (!props.fetchMethod) return
    setLoading(true)
    try {
        const { data } = await props.fetchMethod() 
        if (props.converter) {
            model.value = props.converter(data)
        } else {
            model.value = data
        }
    } catch(e) {
        ElMessage.error('表单数据获取失败: ' + e)
    } finally {
        setLoading(false)
    }
}

defineExpose({
    getFormDefault
})

getFormDefault()
fetchData()

</script>

<template>
    <el-form ref="formRef" :model="model" v-loading="formLoading" label-width="auto" :rules="props.submit?.validationRules">
        <el-form-item v-for="(item, idx) in props.formItems" :key="idx" :label="item?.label" :prop="(item.prop as string)">
            <custom-input v-model="model[item.prop]" :input-props="item.input" />
        </el-form-item>
        <el-button v-if="props.submit" type="primary" style="width: 100%;" @click="handleSubmit" :loading="submitLoading">{{ props.submit.submitText || '提交' }}</el-button>
    </el-form>
</template>