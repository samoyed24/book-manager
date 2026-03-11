import { DeleteFilled, Search } from '@element-plus/icons-vue';
import CustomInput from '@/components/Base/CustomInput.vue';
const props = defineProps();
const emit = defineEmits(['update-filter']);
const handleUpdateFilter = () => emit('update-filter', form);
const form = reactive(props.initializer?.() || props.generator());
const reset = () => {
    Object.assign(form, props.generator());
    handleUpdateFilter();
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['filter-area-space']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ref: "formRef",
    model: (__VLS_ctx.form),
}));
const __VLS_2 = __VLS_1({
    ref: "formRef",
    model: (__VLS_ctx.form),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_6 = {}.ElSpace;
/** @type {[typeof __VLS_components.ElSpace, typeof __VLS_components.elSpace, typeof __VLS_components.ElSpace, typeof __VLS_components.elSpace, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    direction: "vertical",
    ...{ class: "filter-area-space" },
}));
const __VLS_8 = __VLS_7({
    direction: "vertical",
    ...{ class: "filter-area-space" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
__VLS_9.slots.default;
const __VLS_10 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    gutter: (10),
}));
const __VLS_12 = __VLS_11({
    gutter: (10),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
__VLS_13.slots.default;
const __VLS_14 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    span: (21),
}));
const __VLS_16 = __VLS_15({
    span: (21),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_17.slots.default;
const __VLS_18 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    gutter: (10),
}));
const __VLS_20 = __VLS_19({
    gutter: (10),
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
for (const [item, index] of __VLS_getVForSourceType((props.upperInput))) {
    const __VLS_22 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
        key: (index),
        span: (item.span),
    }));
    const __VLS_24 = __VLS_23({
        key: (index),
        span: (item.span),
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    __VLS_25.slots.default;
    const __VLS_26 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
        label: (item.label),
    }));
    const __VLS_28 = __VLS_27({
        label: (item.label),
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    __VLS_29.slots.default;
    /** @type {[typeof CustomInput, ]} */ ;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(CustomInput, new CustomInput({
        modelValue: (__VLS_ctx.form[item.prop]),
        inputProps: (item.input),
    }));
    const __VLS_31 = __VLS_30({
        modelValue: (__VLS_ctx.form[item.prop]),
        inputProps: (item.input),
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    var __VLS_29;
    var __VLS_25;
}
var __VLS_21;
var __VLS_17;
const __VLS_33 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    span: (3),
}));
const __VLS_35 = __VLS_34({
    span: (3),
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
__VLS_36.slots.default;
const __VLS_37 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}));
const __VLS_39 = __VLS_38({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
let __VLS_41;
let __VLS_42;
let __VLS_43;
const __VLS_44 = {
    onClick: (__VLS_ctx.handleUpdateFilter)
};
__VLS_40.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_40.slots;
    const __VLS_45 = {}.Search;
    /** @type {[typeof __VLS_components.Search, ]} */ ;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({}));
    const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
}
var __VLS_40;
var __VLS_36;
var __VLS_13;
const __VLS_49 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    gutter: (10),
}));
const __VLS_51 = __VLS_50({
    gutter: (10),
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
__VLS_52.slots.default;
const __VLS_53 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    span: (21),
}));
const __VLS_55 = __VLS_54({
    span: (21),
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
__VLS_56.slots.default;
const __VLS_57 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    gutter: (10),
}));
const __VLS_59 = __VLS_58({
    gutter: (10),
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
__VLS_60.slots.default;
for (const [item, index] of __VLS_getVForSourceType((props.lowerInput))) {
    const __VLS_61 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
        key: (index),
        span: (item.span),
    }));
    const __VLS_63 = __VLS_62({
        key: (index),
        span: (item.span),
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    __VLS_64.slots.default;
    const __VLS_65 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
        label: (item.label),
    }));
    const __VLS_67 = __VLS_66({
        label: (item.label),
    }, ...__VLS_functionalComponentArgsRest(__VLS_66));
    __VLS_68.slots.default;
    /** @type {[typeof CustomInput, ]} */ ;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent(CustomInput, new CustomInput({
        modelValue: (__VLS_ctx.form[item.prop]),
        inputProps: (item.input),
    }));
    const __VLS_70 = __VLS_69({
        modelValue: (__VLS_ctx.form[item.prop]),
        inputProps: (item.input),
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    var __VLS_68;
    var __VLS_64;
}
var __VLS_60;
var __VLS_56;
const __VLS_72 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    span: (3),
}));
const __VLS_74 = __VLS_73({
    span: (3),
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
__VLS_75.slots.default;
const __VLS_76 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    ...{ 'onClick': {} },
    type: "warning",
    ...{ style: {} },
}));
const __VLS_78 = __VLS_77({
    ...{ 'onClick': {} },
    type: "warning",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
let __VLS_80;
let __VLS_81;
let __VLS_82;
const __VLS_83 = {
    onClick: (__VLS_ctx.reset)
};
__VLS_79.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_79.slots;
    const __VLS_84 = {}.DeleteFilled;
    /** @type {[typeof __VLS_components.DeleteFilled, ]} */ ;
    // @ts-ignore
    const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({}));
    const __VLS_86 = __VLS_85({}, ...__VLS_functionalComponentArgsRest(__VLS_85));
}
var __VLS_79;
var __VLS_75;
var __VLS_52;
var __VLS_9;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['filter-area-space']} */ ;
// @ts-ignore
var __VLS_5 = __VLS_4;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            DeleteFilled: DeleteFilled,
            Search: Search,
            CustomInput: CustomInput,
            handleUpdateFilter: handleUpdateFilter,
            form: form,
            reset: reset,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
