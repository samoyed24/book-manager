const props = defineProps();
const item = props.inputProps;
const data = defineModel();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {};
const __VLS_modelEmit = defineEmits();
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.item.type === 'input') {
    const __VLS_0 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        modelValue: (__VLS_ctx.data),
        placeholder: (__VLS_ctx.item.placeholder),
        ...{ style: ({ width: __VLS_ctx.item.width }) },
        showPassword: (__VLS_ctx.item.showPassword),
    }));
    const __VLS_2 = __VLS_1({
        modelValue: (__VLS_ctx.data),
        placeholder: (__VLS_ctx.item.placeholder),
        ...{ style: ({ width: __VLS_ctx.item.width }) },
        showPassword: (__VLS_ctx.item.showPassword),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_4 = {};
    var __VLS_3;
}
else if (__VLS_ctx.item.type === 'date') {
    const __VLS_5 = {}.ElDatePicker;
    /** @type {[typeof __VLS_components.ElDatePicker, typeof __VLS_components.elDatePicker, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        modelValue: (__VLS_ctx.data),
        type: (__VLS_ctx.item.subType),
        startPlaceholder: (__VLS_ctx.item.startPlaceholder),
        endPlaceholder: (__VLS_ctx.item.endPlaceholder),
        ...{ style: ({ width: __VLS_ctx.item.width }) },
    }));
    const __VLS_7 = __VLS_6({
        modelValue: (__VLS_ctx.data),
        type: (__VLS_ctx.item.subType),
        startPlaceholder: (__VLS_ctx.item.startPlaceholder),
        endPlaceholder: (__VLS_ctx.item.endPlaceholder),
        ...{ style: ({ width: __VLS_ctx.item.width }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    var __VLS_9 = {};
    var __VLS_8;
}
else if (__VLS_ctx.item.type === 'select') {
    const __VLS_10 = {}.ElSelect;
    /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        placeholder: (__VLS_ctx.item.placeholder),
        modelValue: (__VLS_ctx.data),
        options: (__VLS_ctx.item.options),
        ...{ style: ({ width: __VLS_ctx.item.width }) },
    }));
    const __VLS_12 = __VLS_11({
        placeholder: (__VLS_ctx.item.placeholder),
        modelValue: (__VLS_ctx.data),
        options: (__VLS_ctx.item.options),
        ...{ style: ({ width: __VLS_ctx.item.width }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    var __VLS_14 = {};
    var __VLS_13;
}
else if (__VLS_ctx.item.type === 'textarea') {
    const __VLS_15 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        type: "textarea",
        placeholder: (__VLS_ctx.item.placeholder),
        modelValue: (__VLS_ctx.data),
        rows: (__VLS_ctx.item.rows),
        ...{ style: ({ width: __VLS_ctx.item.width }) },
        autosize: (__VLS_ctx.item.autosize),
        showWordLimit: (__VLS_ctx.item.showWordLimit),
        resize: (__VLS_ctx.item.resize),
        maxlength: (__VLS_ctx.item.maxLength),
        minlength: (__VLS_ctx.item.minLength),
    }));
    const __VLS_17 = __VLS_16({
        type: "textarea",
        placeholder: (__VLS_ctx.item.placeholder),
        modelValue: (__VLS_ctx.data),
        rows: (__VLS_ctx.item.rows),
        ...{ style: ({ width: __VLS_ctx.item.width }) },
        autosize: (__VLS_ctx.item.autosize),
        showWordLimit: (__VLS_ctx.item.showWordLimit),
        resize: (__VLS_ctx.item.resize),
        maxlength: (__VLS_ctx.item.maxLength),
        minlength: (__VLS_ctx.item.minLength),
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    var __VLS_19 = {};
    var __VLS_18;
}
else if (__VLS_ctx.item.type === 'number') {
    const __VLS_20 = {}.ElInputNumber;
    /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        placeholder: (__VLS_ctx.item.placeholder),
        modelValue: (__VLS_ctx.data),
        max: (__VLS_ctx.item.max),
        min: (__VLS_ctx.item.min),
        step: (__VLS_ctx.item.step),
        precision: (__VLS_ctx.item.precision),
        ...{ style: ({ width: __VLS_ctx.item.width }) },
    }));
    const __VLS_22 = __VLS_21({
        placeholder: (__VLS_ctx.item.placeholder),
        modelValue: (__VLS_ctx.data),
        max: (__VLS_ctx.item.max),
        min: (__VLS_ctx.item.min),
        step: (__VLS_ctx.item.step),
        precision: (__VLS_ctx.item.precision),
        ...{ style: ({ width: __VLS_ctx.item.width }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    var __VLS_24 = {};
    __VLS_23.slots.default;
    {
        const { suffix: __VLS_thisSlot } = __VLS_23.slots;
        (__VLS_ctx.item.suffix);
    }
    var __VLS_23;
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            item: item,
            data: data,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
