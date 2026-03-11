import book1 from '@/assets/dashboard/book-1.jpg';
import book2 from '@/assets/dashboard/book-2.jpg';
import book3 from '@/assets/dashboard/book-3.jpg';
const carouselList = [
    book1, book2, book3
];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.CustomCard;
/** @type {[typeof __VLS_components.CustomCard, typeof __VLS_components.customCard, typeof __VLS_components.CustomCard, typeof __VLS_components.customCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    noPadding: (true),
}));
const __VLS_2 = __VLS_1({
    noPadding: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_3.slots;
    const __VLS_5 = {}.CustomCarousel;
    /** @type {[typeof __VLS_components.CustomCarousel, typeof __VLS_components.customCarousel, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        imageList: (__VLS_ctx.carouselList),
        height: ('160px'),
        indicatorPosition: ('none'),
        motionBlur: (true),
    }));
    const __VLS_7 = __VLS_6({
        imageList: (__VLS_ctx.carouselList),
        height: ('160px'),
        indicatorPosition: ('none'),
        motionBlur: (true),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            carouselList: carouselList,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
