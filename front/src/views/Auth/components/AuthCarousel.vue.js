import Carousel1 from '@/assets/auth/carousel-1.jpg';
import Carousel2 from '@/assets/auth/carousel-2.jpg';
import Carousel3 from '@/assets/auth/carousel-3.jpg';
const carouselList = ref([
    Carousel1, Carousel2, Carousel3
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.CustomCarousel;
/** @type {[typeof __VLS_components.CustomCarousel, typeof __VLS_components.customCarousel, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    imageList: (__VLS_ctx.carouselList),
    height: ('100%'),
}));
const __VLS_2 = __VLS_1({
    imageList: (__VLS_ctx.carouselList),
    height: ('100%'),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
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
