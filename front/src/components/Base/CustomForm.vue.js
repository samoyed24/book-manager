import { ElMessage, ElMessageBox } from 'element-plus';
const props = defineProps();
const model = ref();
const submitLoading = ref(false);
const setSubmitLoading = (loading) => {
    submitLoading.value = loading;
};
const formLoading = ref(false);
const setLoading = (state) => {
    formLoading.value = state;
};
const formRef = ref();
const handleSubmit = async () => {
    if (!props.submit)
        return;
    const submitAction = async () => {
        setSubmitLoading(true);
        try {
            if (props.submit?.method) {
                console.log(model.value);
                await props.submit.method(model.value);
                props.submit?.callbackOnDone?.();
            }
        }
        finally {
            setSubmitLoading(false);
        }
    };
    if (props.submit.validationRules && formRef.value) {
        const valid = await formRef.value.validate().catch(() => false);
        if (!valid)
            return;
        if (props.submit?.useConfirm) {
            const confirmed = await ElMessageBox.confirm(props.submit.confirmText || '是否确认提交表单？', '请注意').catch(() => false);
            if (!confirmed)
                return;
        }
        await submitAction();
    }
};
const getFormDefault = () => {
    setLoading(true);
    try {
        model.value = props.defaultGetter();
    }
    catch (e) {
        ElMessage.error('表单数据获取失败: ' + e);
    }
    finally {
        setLoading(false);
    }
};
const fetchData = async () => {
    if (!props.fetchMethod)
        return;
    setLoading(true);
    try {
        const { data } = await props.fetchMethod();
        if (props.converter) {
            model.value = props.converter(data);
        }
        else {
            model.value = data;
        }
    }
    catch (e) {
        ElMessage.error('表单数据获取失败: ' + e);
    }
    finally {
        setLoading(false);
    }
};
const __VLS_exposed = {
    getFormDefault
};
defineExpose(__VLS_exposed);
getFormDefault();
fetchData();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ref: "formRef",
    model: (__VLS_ctx.model),
    labelWidth: "auto",
    rules: (props.submit?.validationRules),
}));
const __VLS_2 = __VLS_1({
    ref: "formRef",
    model: (__VLS_ctx.model),
    labelWidth: "auto",
    rules: (props.submit?.validationRules),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.formLoading) }, null, null);
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_4 = {};
__VLS_3.slots.default;
for (const [item, idx] of __VLS_getVForSourceType((props.formItems))) {
    const __VLS_6 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        key: (idx),
        label: (item?.label),
        prop: item.prop,
    }));
    const __VLS_8 = __VLS_7({
        key: (idx),
        label: (item?.label),
        prop: item.prop,
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_9.slots.default;
    const __VLS_10 = {}.CustomInput;
    /** @type {[typeof __VLS_components.CustomInput, typeof __VLS_components.customInput, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        modelValue: (__VLS_ctx.model[item.prop]),
        inputProps: (item.input),
    }));
    const __VLS_12 = __VLS_11({
        modelValue: (__VLS_ctx.model[item.prop]),
        inputProps: (item.input),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    var __VLS_9;
}
if (props.submit) {
    const __VLS_14 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
        loading: (__VLS_ctx.submitLoading),
    }));
    const __VLS_16 = __VLS_15({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
        loading: (__VLS_ctx.submitLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    let __VLS_18;
    let __VLS_19;
    let __VLS_20;
    const __VLS_21 = {
        onClick: (__VLS_ctx.handleSubmit)
    };
    __VLS_17.slots.default;
    (props.submit.submitText || '提交');
    var __VLS_17;
}
var __VLS_3;
// @ts-ignore
var __VLS_5 = __VLS_4;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            model: model,
            submitLoading: submitLoading,
            formLoading: formLoading,
            formRef: formRef,
            handleSubmit: handleSubmit,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
