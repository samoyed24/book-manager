import { GeneralDeltaColor } from '@/constants/general';
import { useTransition } from '@vueuse/core';
const props = defineProps();
const source = ref(0);
const outputValue = ref();
watch(() => props.value, (newVal) => {
    if (!props.transition) {
        outputValue.value = newVal;
    }
    else {
        source.value = props.transition.fromValue;
        const transition = useTransition(source, {
            duration: props.transition.duration,
        });
        outputValue.value = transition;
        source.value = newVal;
    }
}, {
    immediate: true, // ⭐ 非常关键：首次渲染
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-outer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "statistic-icon" },
});
var __VLS_0 = {};
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (props.icon.fromElIcon) {
    const __VLS_2 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(__VLS_2, new __VLS_2({
        size: "40",
    }));
    const __VLS_4 = __VLS_3({
        size: "40",
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    __VLS_5.slots.default;
    const __VLS_6 = ((props.icon.fromElIcon));
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    var __VLS_5;
}
else if (props.icon.fromAsset) {
    const __VLS_10 = {}.ElImage;
    /** @type {[typeof __VLS_components.ElImage, typeof __VLS_components.elImage, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        src: (props.icon.fromAsset),
    }));
    const __VLS_12 = __VLS_11({
        src: (props.icon.fromAsset),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "statistic-main" },
});
const __VLS_14 = {}.ElStatistic;
/** @type {[typeof __VLS_components.ElStatistic, typeof __VLS_components.elStatistic, typeof __VLS_components.ElStatistic, typeof __VLS_components.elStatistic, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    value: (__VLS_ctx.outputValue.value),
    precision: (props.precision),
}));
const __VLS_16 = __VLS_15({
    value: (__VLS_ctx.outputValue.value),
    precision: (props.precision),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_17.slots.default;
{
    const { title: __VLS_thisSlot } = __VLS_17.slots;
    (props.title);
}
{
    const { suffix: __VLS_thisSlot } = __VLS_17.slots;
    var __VLS_18 = {};
    (props.suffix);
    if (props.toolTipContent) {
        const __VLS_20 = {}.ElTooltip;
        /** @type {[typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ]} */ ;
        // @ts-ignore
        const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
            effect: "dark",
            content: (props.toolTipContent),
            placement: "top",
        }));
        const __VLS_22 = __VLS_21({
            effect: "dark",
            content: (props.toolTipContent),
            placement: "top",
        }, ...__VLS_functionalComponentArgsRest(__VLS_21));
        __VLS_23.slots.default;
        const __VLS_24 = {}.ElIcon;
        /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
            size: "14",
        }));
        const __VLS_26 = __VLS_25({
            size: "14",
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        __VLS_27.slots.default;
        const __VLS_28 = {}.Warning;
        /** @type {[typeof __VLS_components.Warning, ]} */ ;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({}));
        const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
        var __VLS_27;
        var __VLS_23;
    }
}
var __VLS_17;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "footer" },
});
(props.footer?.description || '\u00A0');
if (props.footer?.delta?.arrow == 'Up') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ style: ({ color: __VLS_ctx.GeneralDeltaColor.Up }) },
    });
    (props.footer?.delta?.value);
    const __VLS_32 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        size: "8",
    }));
    const __VLS_34 = __VLS_33({
        size: "8",
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    __VLS_35.slots.default;
    const __VLS_36 = {}.ArrowUpBold;
    /** @type {[typeof __VLS_components.ArrowUpBold, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
    const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
    var __VLS_35;
}
else if (props.footer?.delta?.arrow == 'Down') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ style: ({ color: __VLS_ctx.GeneralDeltaColor.Down }) },
    });
    (props.footer?.delta?.value);
    const __VLS_40 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        size: "8",
    }));
    const __VLS_42 = __VLS_41({
        size: "8",
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_43.slots.default;
    const __VLS_44 = {}.ArrowDownBold;
    /** @type {[typeof __VLS_components.ArrowDownBold, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
    const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
    var __VLS_43;
}
else if (props.footer?.delta?.arrow == 'None') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ style: ({ color: __VLS_ctx.GeneralDeltaColor.None }) },
    });
    (props.footer?.delta?.value);
    const __VLS_48 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        size: "8",
    }));
    const __VLS_50 = __VLS_49({
        size: "8",
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    __VLS_51.slots.default;
    const __VLS_52 = {}.Minus;
    /** @type {[typeof __VLS_components.Minus, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({}));
    const __VLS_54 = __VLS_53({}, ...__VLS_functionalComponentArgsRest(__VLS_53));
    var __VLS_51;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (props.footer?.delta?.value);
}
/** @type {__VLS_StyleScopedClasses['card-outer']} */ ;
/** @type {__VLS_StyleScopedClasses['statistic-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['statistic-main']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_19 = __VLS_18;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            GeneralDeltaColor: GeneralDeltaColor,
            outputValue: outputValue,
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
