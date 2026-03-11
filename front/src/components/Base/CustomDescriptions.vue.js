import { APIError } from '@/api/wrapper';
const props = defineProps();
const descriptionLoading = ref(false);
const setLoading = (state) => {
    descriptionLoading.value = state;
};
const descriptionsModel = ref({});
const fetchData = async () => {
    setLoading(true);
    try {
        const { data } = await props.fetchMethod();
        if (data) {
            if (props.modelConverter) {
                descriptionsModel.value = props.modelConverter(data);
            }
            else {
                descriptionsModel.value = data;
            }
        }
    }
    catch (err) {
        if (err instanceof APIError) {
        }
    }
    finally {
        setLoading(false);
    }
};
fetchData();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.ElDescriptions;
/** @type {[typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    title: (__VLS_ctx.title || ''),
    border: (__VLS_ctx.border || false),
    column: (__VLS_ctx.column || 3),
    direction: (__VLS_ctx.direction || 'vertical'),
}));
const __VLS_2 = __VLS_1({
    title: (__VLS_ctx.title || ''),
    border: (__VLS_ctx.border || false),
    column: (__VLS_ctx.column || 3),
    direction: (__VLS_ctx.direction || 'vertical'),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.descriptionLoading) }, null, null);
var __VLS_4 = {};
__VLS_3.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.descriptionsItems))) {
    const __VLS_5 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        label: (item.label),
        span: (item.span),
        width: (item.width),
        rowspan: (item.rowspan),
        labelWidth: (item.labelWidth),
        align: (item.align),
        labelAlign: (item.labelAlign),
    }));
    const __VLS_7 = __VLS_6({
        label: (item.label),
        span: (item.span),
        width: (item.width),
        rowspan: (item.rowspan),
        labelWidth: (item.labelWidth),
        align: (item.align),
        labelAlign: (item.labelAlign),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_8.slots.default;
    (__VLS_ctx.descriptionsModel[item.prop]);
    var __VLS_8;
}
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            descriptionLoading: descriptionLoading,
            descriptionsModel: descriptionsModel,
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
