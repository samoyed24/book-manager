import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps();
const getRouteFromName = () => {
    return router.getRoutes().find(r => r.name == props.routeName);
};
const selectedRoute = getRouteFromName();
const handleChangeRoute = () => {
    if (!selectedRoute)
        return;
    router.push(selectedRoute?.path);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['entry-container']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-area']} */ ;
/** @type {__VLS_StyleScopedClasses['entry-container']} */ ;
/** @type {__VLS_StyleScopedClasses['title-area']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "entry-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.handleChangeRoute) },
    ...{ class: "icon-area" },
});
const __VLS_0 = ((__VLS_ctx.selectedRoute?.meta?.icon));
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "icon" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "icon" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "title-area" },
});
(__VLS_ctx.selectedRoute?.meta?.title);
/** @type {__VLS_StyleScopedClasses['entry-container']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-area']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['title-area']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            selectedRoute: selectedRoute,
            handleChangeRoute: handleChangeRoute,
        };
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
