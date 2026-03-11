import { useUserAuthStore } from '@/stores/auth';
// 判断是否有权限
const hasPermission = (value, el) => {
    const user = useUserAuthStore();
    // 检查是否配置了权限参数
    if (!Array.isArray(value) || value.length === 0) {
        // throw new Error(`v-permission 需要配置权限，例如 v-permission="['xxx']"`);
        return true;
    }
    // 获取用户权限
    const ruleNames = user.permissions;
    if (!Array.isArray(ruleNames)) {
        console.warn('权限数据 "menu/getRuleNames" 格式不正确，请检查 store 配置。');
        return;
    }
    // 判断是否有权限
    const hasAuth = value.some((val) => ruleNames.includes(val));
    if (!hasAuth && el.parentNode) {
        el.parentNode.removeChild(el); // 移除元素
    }
    return hasAuth;
};
export default {
    install(app) {
        app.directive('permissions', {
            mounted(el, binding) {
                hasPermission(binding.value, el);
            },
            updated(el, binding) {
                hasPermission(binding.value, el);
            },
        });
    },
};
