import { useRoute } from 'vue-router';
const route = useRoute();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.route.meta.show) {
    const __VLS_0 = {}.ElText;
    /** @type {[typeof __VLS_components.ElText, typeof __VLS_components.elText, typeof __VLS_components.ElText, typeof __VLS_components.elText, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        size: "large",
        tag: "b",
    }));
    const __VLS_2 = __VLS_1({
        size: "large",
        tag: "b",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    (__VLS_ctx.route.meta?.title);
    var __VLS_3;
}
if (__VLS_ctx.route.meta.show) {
    const __VLS_4 = {}.ElBreadcrumb;
    /** @type {[typeof __VLS_components.ElBreadcrumb, typeof __VLS_components.elBreadcrumb, typeof __VLS_components.ElBreadcrumb, typeof __VLS_components.elBreadcrumb, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        separator: "/",
        ...{ class: "custom-breadcrumb" },
    }));
    const __VLS_6 = __VLS_5({
        separator: "/",
        ...{ class: "custom-breadcrumb" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    for (const [{ path, meta }] of __VLS_getVForSourceType((__VLS_ctx.route.matched))) {
        const __VLS_8 = {}.ElBreadcrumbItem;
        /** @type {[typeof __VLS_components.ElBreadcrumbItem, typeof __VLS_components.elBreadcrumbItem, typeof __VLS_components.ElBreadcrumbItem, typeof __VLS_components.elBreadcrumbItem, ]} */ ;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
            key: (path),
        }));
        const __VLS_10 = __VLS_9({
            key: (path),
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        __VLS_11.slots.default;
        (meta.title);
        var __VLS_11;
    }
    var __VLS_7;
}
/** @type {__VLS_StyleScopedClasses['custom-breadcrumb']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            route: route,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
