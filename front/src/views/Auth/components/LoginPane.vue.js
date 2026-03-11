import { postLogin } from '@/api/auth';
import { APIError } from '@/api/wrapper';
import logo from '@/assets/logo.png';
import { useUserAuthStore } from '@/stores/auth';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const userAuth = useUserAuthStore();
const router = useRouter();
const defaultLoginGetter = () => {
    return {
        username: '',
        password: '',
    };
};
const submitLoading = ref(false);
const formItems = [
    {
        label: '用户名',
        prop: 'username',
        input: {
            type: 'input',
            placeholder: '请输入用户名',
        },
    },
    {
        label: '密码',
        prop: 'password',
        input: {
            type: 'input',
            showPassword: true,
            placeholder: '请输入密码',
        },
    },
];
const validationRules = {
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        },
    ]
};
const handleLogin = async (loginData) => {
    try {
        submitLoading.value = false;
        const resp = await postLogin(loginData);
        ElMessage.success('登录成功');
        if (resp.data) {
            userAuth.setUser(resp.data);
        }
        router.push('/panel/dashboard');
    }
    catch (err) {
        if (err instanceof APIError) {
            ElMessage.error(err.errMsg);
        }
    }
    finally {
        submitLoading.value = true;
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElTabPane;
/** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    label: "登录",
    name: "login",
    ...{ class: "full login-pane" },
}));
const __VLS_2 = __VLS_1({
    label: "登录",
    name: "login",
    ...{ class: "full login-pane" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "full center login-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "full separate-container center" },
});
const __VLS_5 = {}.ElImage;
/** @type {[typeof __VLS_components.ElImage, typeof __VLS_components.elImage, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ style: {} },
    src: (__VLS_ctx.logo),
    fit: "scale-down",
}));
const __VLS_7 = __VLS_6({
    ...{ style: {} },
    src: (__VLS_ctx.logo),
    fit: "scale-down",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "full separate-container" },
});
const __VLS_9 = {}.CustomForm;
/** @type {[typeof __VLS_components.CustomForm, typeof __VLS_components.customForm, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    formItems: (__VLS_ctx.formItems),
    defaultGetter: (__VLS_ctx.defaultLoginGetter),
    submit: ({
        method: __VLS_ctx.handleLogin,
        // submitLoading,
        submitText: '登录',
        validationRules: __VLS_ctx.validationRules
    }),
}));
const __VLS_11 = __VLS_10({
    formItems: (__VLS_ctx.formItems),
    defaultGetter: (__VLS_ctx.defaultLoginGetter),
    submit: ({
        method: __VLS_ctx.handleLogin,
        // submitLoading,
        submitText: '登录',
        validationRules: __VLS_ctx.validationRules
    }),
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
/** @type {__VLS_StyleScopedClasses['login-pane']} */ ;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
/** @type {__VLS_StyleScopedClasses['center']} */ ;
/** @type {__VLS_StyleScopedClasses['login-container']} */ ;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
/** @type {__VLS_StyleScopedClasses['separate-container']} */ ;
/** @type {__VLS_StyleScopedClasses['center']} */ ;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
/** @type {__VLS_StyleScopedClasses['separate-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            logo: logo,
            defaultLoginGetter: defaultLoginGetter,
            formItems: formItems,
            validationRules: validationRules,
            handleLogin: handleLogin,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
