const props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElCarousel;
/** @type {[typeof __VLS_components.ElCarousel, typeof __VLS_components.elCarousel, typeof __VLS_components.ElCarousel, typeof __VLS_components.elCarousel, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "full" },
    height: (props.height),
    motionBlur: (__VLS_ctx.motionBlur),
    indicatorPosition: (__VLS_ctx.indicatorPosition),
}));
const __VLS_2 = __VLS_1({
    ...{ class: "full" },
    height: (props.height),
    motionBlur: (__VLS_ctx.motionBlur),
    indicatorPosition: (__VLS_ctx.indicatorPosition),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
for (const [carousel] of __VLS_getVForSourceType((__VLS_ctx.imageList))) {
    const __VLS_5 = {}.ElCarouselItem;
    /** @type {[typeof __VLS_components.ElCarouselItem, typeof __VLS_components.elCarouselItem, typeof __VLS_components.ElCarouselItem, typeof __VLS_components.elCarouselItem, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        ...{ class: "center" },
    }));
    const __VLS_7 = __VLS_6({
        ...{ class: "center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_8.slots.default;
    const __VLS_9 = {}.ElImage;
    /** @type {[typeof __VLS_components.ElImage, typeof __VLS_components.elImage, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        src: (carousel),
        fit: "cover",
        ...{ class: "full" },
    }));
    const __VLS_11 = __VLS_10({
        src: (carousel),
        fit: "cover",
        ...{ class: "full" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    var __VLS_8;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
/** @type {__VLS_StyleScopedClasses['center']} */ ;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
