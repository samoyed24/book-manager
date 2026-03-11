import { ElMessageBox } from 'element-plus';
import merge from 'lodash.merge';
const props = defineProps();
const formVisible = ref(false);
const setVisible = (visible) => {
    formVisible.value = visible;
};
const destroyAfterClosed = () => {
    props.onClose();
};
const divComponent = shallowRef();
const dialogProps = reactive({
    title: '弹出窗口',
    fullscreen: false,
    showClose: true,
    destroyOnClose: true,
    confirmBeforeClose: true,
    footer: {
        show: true,
        cancel: {
            show: true,
            text: '取消',
            method: () => { setVisible(false); }
        },
        confirm: {
            show: true,
            text: '确认',
            method: () => { setVisible(false); }
        }
    },
    width: '60%',
    draggable: false,
});
const divProps = ref();
const openDialog = (component, _dialogProps, _divProps) => {
    divComponent.value = component;
    if (_dialogProps) {
        merge(dialogProps, _dialogProps);
    }
    if (_divProps) {
        divProps.value = _divProps;
    }
    setVisible(true);
};
const closeDialog = () => {
    setVisible(false);
};
const handleBeforeClose = (done) => {
    if (dialogProps.confirmBeforeClose) {
        ElMessageBox.confirm('确认关闭窗口吗？您做出的更改可能不会保存！', '注意', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
            done();
        });
    }
    else {
        done();
    }
};
const __VLS_exposed = {
    openDialog,
    closeDialog,
};
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClosed': {} },
    title: (__VLS_ctx.dialogProps.title),
    modelValue: (__VLS_ctx.formVisible),
    fullscreen: (__VLS_ctx.dialogProps.fullscreen),
    width: (__VLS_ctx.dialogProps.width),
    center: (true),
    showClose: (__VLS_ctx.dialogProps.showClose),
    destroyOnClose: (true),
    draggable: (__VLS_ctx.dialogProps.draggable),
    beforeClose: (__VLS_ctx.handleBeforeClose),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClosed': {} },
    title: (__VLS_ctx.dialogProps.title),
    modelValue: (__VLS_ctx.formVisible),
    fullscreen: (__VLS_ctx.dialogProps.fullscreen),
    width: (__VLS_ctx.dialogProps.width),
    center: (true),
    showClose: (__VLS_ctx.dialogProps.showClose),
    destroyOnClose: (true),
    draggable: (__VLS_ctx.dialogProps.draggable),
    beforeClose: (__VLS_ctx.handleBeforeClose),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClosed: (__VLS_ctx.destroyAfterClosed)
};
var __VLS_8 = {};
__VLS_3.slots.default;
const __VLS_9 = ((__VLS_ctx.divComponent));
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    ...(__VLS_ctx.divProps),
}));
const __VLS_11 = __VLS_10({
    ...(__VLS_ctx.divProps),
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
if (__VLS_ctx.dialogProps.footer?.show) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        slot: "footer",
    });
    const __VLS_13 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
        ...{ 'onClick': {} },
    }));
    const __VLS_15 = __VLS_14({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    let __VLS_17;
    let __VLS_18;
    let __VLS_19;
    const __VLS_20 = {
        onClick: (__VLS_ctx.dialogProps.footer.cancel?.method)
    };
    __VLS_16.slots.default;
    (__VLS_ctx.dialogProps.footer.cancel?.text);
    var __VLS_16;
    const __VLS_21 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_23 = __VLS_22({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    let __VLS_25;
    let __VLS_26;
    let __VLS_27;
    const __VLS_28 = {
        onClick: (__VLS_ctx.dialogProps.footer.confirm?.method)
    };
    __VLS_24.slots.default;
    (__VLS_ctx.dialogProps.footer.confirm?.text);
    var __VLS_24;
}
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            formVisible: formVisible,
            destroyAfterClosed: destroyAfterClosed,
            divComponent: divComponent,
            dialogProps: dialogProps,
            divProps: divProps,
            handleBeforeClose: handleBeforeClose,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
