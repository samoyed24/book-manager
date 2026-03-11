const props = defineProps();
const slots = useSlots();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    bodyStyle: ({ padding: __VLS_ctx.noPadding ? 0 : undefined }),
    headerClass: "custom-header",
}));
const __VLS_2 = __VLS_1({
    bodyStyle: ({ padding: __VLS_ctx.noPadding ? 0 : undefined }),
    headerClass: "custom-header",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
if (__VLS_ctx.slots.header || __VLS_ctx.header) {
    {
        const { header: __VLS_thisSlot } = __VLS_3.slots;
        var __VLS_5 = {};
        if (__VLS_ctx.header?.icon) {
            const __VLS_7 = {}.ElIcon;
            /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
            // @ts-ignore
            const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
                size: (18),
                ...{ style: ({ paddingRight: '8px' }) },
            }));
            const __VLS_9 = __VLS_8({
                size: (18),
                ...{ style: ({ paddingRight: '8px' }) },
            }, ...__VLS_functionalComponentArgsRest(__VLS_8));
            __VLS_10.slots.default;
            const __VLS_11 = ((__VLS_ctx.header?.icon));
            // @ts-ignore
            const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({}));
            const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
            var __VLS_10;
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.header?.text);
    }
}
if (__VLS_ctx.slots.default) {
    {
        const { default: __VLS_thisSlot } = __VLS_3.slots;
        var __VLS_15 = {};
    }
}
if (__VLS_ctx.slots.footer) {
    {
        const { footer: __VLS_thisSlot } = __VLS_3.slots;
        var __VLS_17 = {};
    }
}
var __VLS_3;
// @ts-ignore
var __VLS_6 = __VLS_5, __VLS_16 = __VLS_15, __VLS_18 = __VLS_17;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            slots: slots,
        };
    },
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
