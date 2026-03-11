import SideBarItem from './SideBarItem.vue';
const props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.route.children && __VLS_ctx.route.meta?.show) {
    const __VLS_0 = {}.ElSubMenu;
    /** @type {[typeof __VLS_components.ElSubMenu, typeof __VLS_components.elSubMenu, typeof __VLS_components.ElSubMenu, typeof __VLS_components.elSubMenu, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        index: (__VLS_ctx.route.path),
        ...{ class: "glass-sub-item" },
    }));
    const __VLS_2 = __VLS_1({
        index: (__VLS_ctx.route.path),
        ...{ class: "glass-sub-item" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_asFunctionalDirective(__VLS_directives.vPermissions)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.route.meta.requiredPermissions) }, null, null);
    var __VLS_4 = {};
    __VLS_3.slots.default;
    {
        const { title: __VLS_thisSlot } = __VLS_3.slots;
        const __VLS_5 = {}.ElIcon;
        /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
        const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
        __VLS_8.slots.default;
        const __VLS_9 = ((__VLS_ctx.route.meta.icon));
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({}));
        const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
        var __VLS_8;
        (__VLS_ctx.route.meta?.title);
    }
    for (const [children] of __VLS_getVForSourceType((__VLS_ctx.route.children))) {
        /** @type {[typeof SideBarItem, ]} */ ;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(SideBarItem, new SideBarItem({
            route: (children),
            parentPath: (__VLS_ctx.parentPath + '/' + __VLS_ctx.route.path),
        }));
        const __VLS_14 = __VLS_13({
            route: (children),
            parentPath: (__VLS_ctx.parentPath + '/' + __VLS_ctx.route.path),
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    }
    var __VLS_3;
}
else if (__VLS_ctx.route.meta?.show) {
    const __VLS_16 = {}.ElMenuItem;
    /** @type {[typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        key: (__VLS_ctx.route.path),
        index: (__VLS_ctx.parentPath + '/' + __VLS_ctx.route.path),
        ...{ class: "glass-item" },
    }));
    const __VLS_18 = __VLS_17({
        key: (__VLS_ctx.route.path),
        index: (__VLS_ctx.parentPath + '/' + __VLS_ctx.route.path),
        ...{ class: "glass-item" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_asFunctionalDirective(__VLS_directives.vPermissions)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.route.meta.requiredPermissions) }, null, null);
    var __VLS_20 = {};
    __VLS_19.slots.default;
    const __VLS_21 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({}));
    const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
    __VLS_24.slots.default;
    const __VLS_25 = ((__VLS_ctx.route.meta.icon));
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    var __VLS_24;
    (__VLS_ctx.route.meta?.title);
    var __VLS_19;
}
/** @type {__VLS_StyleScopedClasses['glass-sub-item']} */ ;
/** @type {__VLS_StyleScopedClasses['glass-item']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SideBarItem: SideBarItem,
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
