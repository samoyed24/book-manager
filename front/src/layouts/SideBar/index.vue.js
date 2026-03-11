import { useRoute } from 'vue-router';
import SideBarItem from '@/layouts/SideBar/SideBarItem.vue';
const route = useRoute();
const props = defineProps();
const parentRoute = props.routes;
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElMenu;
/** @type {[typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    defaultActive: (__VLS_ctx.route.path),
    mode: "vertical",
    ellipsis: (false),
    ...{ class: "glass-menu sidebar" },
    backgroundColor: "none",
    router: true,
}));
const __VLS_2 = __VLS_1({
    defaultActive: (__VLS_ctx.route.path),
    mode: "vertical",
    ellipsis: (false),
    ...{ class: "glass-menu sidebar" },
    backgroundColor: "none",
    router: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "scroll-wrapper" },
});
const __VLS_5 = {}.ElScrollbar;
/** @type {[typeof __VLS_components.ElScrollbar, typeof __VLS_components.elScrollbar, typeof __VLS_components.ElScrollbar, typeof __VLS_components.elScrollbar, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
for (const [menuRoute] of __VLS_getVForSourceType((__VLS_ctx.parentRoute.children))) {
    /** @type {[typeof SideBarItem, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(SideBarItem, new SideBarItem({
        key: (menuRoute.path),
        route: (menuRoute),
        parentPath: (__VLS_ctx.parentRoute.path),
    }));
    const __VLS_10 = __VLS_9({
        key: (menuRoute.path),
        route: (menuRoute),
        parentPath: (__VLS_ctx.parentRoute.path),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
}
var __VLS_8;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['glass-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-wrapper']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SideBarItem: SideBarItem,
            route: route,
            parentRoute: parentRoute,
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
