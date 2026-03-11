import SideBar from '@/layouts/SideBar/index.vue';
import MainContainer from '@/layouts/MainContainer.vue';
import HeaderBar from '@/layouts/HeaderBar.vue';
import router from '@/router';
const sideBarRoutes = router.options.routes.filter(route => route.path === '/panel')[0];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElContainer;
/** @type {[typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "panel-layout full" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "panel-layout full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.ElHeader;
/** @type {[typeof __VLS_components.ElHeader, typeof __VLS_components.elHeader, typeof __VLS_components.ElHeader, typeof __VLS_components.elHeader, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
/** @type {[typeof HeaderBar, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(HeaderBar, new HeaderBar({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
var __VLS_8;
const __VLS_12 = {}.ElContainer;
/** @type {[typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ class: "full" },
    ...{ style: {} },
}));
const __VLS_14 = __VLS_13({
    ...{ class: "full" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
const __VLS_16 = {}.ElAside;
/** @type {[typeof __VLS_components.ElAside, typeof __VLS_components.elAside, typeof __VLS_components.ElAside, typeof __VLS_components.elAside, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ class: "full" },
}));
const __VLS_18 = __VLS_17({
    ...{ class: "full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
/** @type {[typeof SideBar, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(SideBar, new SideBar({
    routes: (__VLS_ctx.sideBarRoutes),
}));
const __VLS_21 = __VLS_20({
    routes: (__VLS_ctx.sideBarRoutes),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
var __VLS_19;
const __VLS_23 = {}.ElMain;
/** @type {[typeof __VLS_components.ElMain, typeof __VLS_components.elMain, typeof __VLS_components.ElMain, typeof __VLS_components.elMain, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({}));
const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
__VLS_26.slots.default;
/** @type {[typeof MainContainer, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(MainContainer, new MainContainer({}));
const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
var __VLS_26;
var __VLS_15;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['panel-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SideBar: SideBar,
            MainContainer: MainContainer,
            HeaderBar: HeaderBar,
            sideBarRoutes: sideBarRoutes,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
