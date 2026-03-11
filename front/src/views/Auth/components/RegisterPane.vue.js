import { postRegister } from '@/api/auth';
import logo from '@/assets/logo.png';
import CustomForm from '@/components/Base/CustomForm.vue';
import { facultyOptions, gradeOptions } from '@/constants/user';
import { useUserAuthStore } from '@/stores/auth';
import { validateMethodGenerator } from '@/util/user';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const userAuth = useUserAuthStore();
const router = useRouter();
const defaultRegisterGetter = () => {
    return {
        username: '',
        password: '',
        name: '',
        workNumber: '',
        idNumber: '',
        facultyName: '',
        major: '',
        grade: '',
    };
};
const formItems = [
    {
        label: '用户名',
        prop: 'username',
        input: {
            type: 'input',
            placeholder: '请输入用户名(4~16个字符)',
        },
    },
    {
        label: '密码',
        prop: 'password',
        input: {
            type: 'input',
            showPassword: true,
            placeholder: '请输入密码(8~32个字符)',
        },
    },
    {
        label: '姓名',
        prop: 'name',
        input: {
            type: 'input',
            placeholder: '请输入您的真实姓名',
        },
    },
    {
        label: '学号/工号',
        prop: 'workNumber',
        input: {
            type: 'input',
            placeholder: '请输入学号/工号',
        },
    },
    {
        label: '身份证号',
        prop: 'idNumber',
        input: {
            type: 'input',
            placeholder: '请输入身份证号',
        },
    },
    {
        label: '学院',
        prop: 'facultyName',
        input: {
            type: 'select',
            placeholder: '请选择您的学院',
            options: facultyOptions,
        },
    },
    {
        label: '专业',
        prop: 'major',
        input: {
            type: 'input',
            placeholder: '请输入您的专业名称',
        },
    },
    {
        label: '年级',
        prop: 'grade',
        input: {
            type: 'select',
            placeholder: '请选择您的年级',
            options: gradeOptions,
        },
    },
];
const customFormRef = ref(null);
const validationRules = {
    username: [
        {
            required: true,
            message: '请输入用户名(4~16个字符)',
            trigger: 'blur',
        },
        {
            validator: validateMethodGenerator('username', '用户名'),
            trigger: 'blur',
        },
        {
            min: 4,
            message: '用户名需至少4个字符',
            trigger: 'blur',
        },
        {
            max: 16,
            message: '用户名需最多16个字符',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: '请输入密码(8~32个字符)',
            trigger: 'blur',
        },
        {
            min: 8,
            message: '密码需至少8个字符',
            trigger: 'blur',
        },
        {
            max: 32,
            message: '密码需最多32个字符',
            trigger: 'blur',
        },
    ],
    name: [
        {
            required: true,
            message: '请输入您的姓名',
            trigger: 'blur',
        },
    ],
    workNumber: [
        {
            required: true,
            message: '请输入学号/工号(12位数字)',
            trigger: 'blur',
        },
        {
            pattern: /^\d{12}$/,
            message: '请输入正确格式的学号/工号',
            trigger: 'blur',
        },
        {
            validator: validateMethodGenerator('workNumber', '学号/工号'),
            trigger: 'blur',
        }
    ],
    idNumber: [
        {
            required: true,
            message: '请输入身份证号',
            trigger: 'blur',
        },
        {
            pattern: /^(?:\d{15}|\d{17}(\d|X|x))$/,
            message: '请输入正确格式的身份证号',
            trigger: 'blur',
        },
        {
            validator: validateMethodGenerator('idNumber', '身份证号'),
            trigger: 'blur',
        }
    ],
    facultyName: [
        {
            required: true,
            message: '请选择您的学院',
            trigger: 'blur',
        },
    ],
};
const handleRegister = async (registerData) => {
    try {
        const resp = await postRegister(registerData);
        ElMessage.success('注册成功，已经为您自动登录');
        customFormRef.value?.getFormDefault();
        if (resp.data) {
            userAuth.setUser(resp.data);
        }
        router.push('/panel/dashboard');
    }
    catch (err) {
        let _err = err;
        ElMessage.error(_err.errMsg);
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
    label: "注册",
    name: "register",
    ...{ class: "full login-pane" },
}));
const __VLS_2 = __VLS_1({
    label: "注册",
    name: "register",
    ...{ class: "full login-pane" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "full center login-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "image-container center" },
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
/** @type {[typeof CustomForm, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(CustomForm, new CustomForm({
    ref: "customFormRef",
    formItems: (__VLS_ctx.formItems),
    defaultGetter: (__VLS_ctx.defaultRegisterGetter),
    submit: ({
        method: __VLS_ctx.handleRegister,
        submitText: '注册',
        validationRules: __VLS_ctx.validationRules
    }),
}));
const __VLS_10 = __VLS_9({
    ref: "customFormRef",
    formItems: (__VLS_ctx.formItems),
    defaultGetter: (__VLS_ctx.defaultRegisterGetter),
    submit: ({
        method: __VLS_ctx.handleRegister,
        submitText: '注册',
        validationRules: __VLS_ctx.validationRules
    }),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {typeof __VLS_ctx.customFormRef} */ ;
var __VLS_12 = {};
var __VLS_11;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
/** @type {__VLS_StyleScopedClasses['login-pane']} */ ;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
/** @type {__VLS_StyleScopedClasses['center']} */ ;
/** @type {__VLS_StyleScopedClasses['login-container']} */ ;
/** @type {__VLS_StyleScopedClasses['image-container']} */ ;
/** @type {__VLS_StyleScopedClasses['center']} */ ;
/** @type {__VLS_StyleScopedClasses['full']} */ ;
/** @type {__VLS_StyleScopedClasses['separate-container']} */ ;
// @ts-ignore
var __VLS_13 = __VLS_12;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            logo: logo,
            CustomForm: CustomForm,
            defaultRegisterGetter: defaultRegisterGetter,
            formItems: formItems,
            customFormRef: customFormRef,
            validationRules: validationRules,
            handleRegister: handleRegister,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
