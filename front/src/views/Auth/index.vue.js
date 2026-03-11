import LoginPane from './components/LoginPane.vue';
import RegisterPane from './components/RegisterPane.vue';
import AuthCarousel from './components/AuthCarousel.vue';
const activeName = ref('login');
const formRef = ref(null);
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
    ...{ class: "center auth-layout" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "center auth-layout" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "auth-container glass-menu" },
});
const __VLS_5 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ class: "full" },
}));
const __VLS_7 = __VLS_6({
    ...{ class: "full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    span: (12),
}));
const __VLS_11 = __VLS_10({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
/** @type {[typeof AuthCarousel, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(AuthCarousel, new AuthCarousel({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
var __VLS_12;
const __VLS_16 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    span: (12),
}));
const __VLS_18 = __VLS_17({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.ElTabs;
/** @type {[typeof __VLS_components.ElTabs, typeof __VLS_components.elTabs, typeof __VLS_components.ElTabs, typeof __VLS_components.elTabs, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.activeName),
    type: "border-card",
    ...{ class: "full" },
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.activeName),
    type: "border-card",
    ...{ class: "full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
/** @type {[typeof LoginPane, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(LoginPane, new LoginPane({}));
const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
/** @type {[typeof RegisterPane, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(RegisterPane, new RegisterPane({}));
const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
var __VLS_23;
var __VLS_19;
var __VLS_8;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['center']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-container']} */ ;
/** @type {__VLS_StyleScopedClasses['glass-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LoginPane: LoginPane,
            RegisterPane: RegisterPane,
            AuthCarousel: AuthCarousel,
            activeName: activeName,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
