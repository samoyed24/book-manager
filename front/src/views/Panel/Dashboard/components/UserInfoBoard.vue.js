import { useUserAuthStore } from '@/stores/auth';
import avatar from '@/assets/avatar.png';
import { ElNotification } from 'element-plus';
import { getUserInfo, postSignUp } from '@/api/dashboard';
import { WordsOfWisdom } from '@/util/utils';
const userInfoBoardData = ref();
const user = useUserAuthStore().getUser();
const getCurrentHour = () => {
    const nowDate = new Date();
    return nowDate.getHours();
};
const getGreetings = () => {
    const hour = getCurrentHour();
    let timeType;
    if (hour >= 0 && hour < 6) {
        timeType = '凌晨好';
    }
    else if (hour >= 6 && hour < 12) {
        timeType = '早上好';
    }
    else if (hour == 12) {
        timeType = '中午好';
    }
    else if (hour > 12 && hour < 18) {
        timeType = '下午好';
    }
    else {
        timeType = '晚上好';
    }
    return `${timeType}，${user.username}`;
};
const getUserInfoBoardData = () => {
    const wordOfWisdom = new WordsOfWisdom();
    userInfoBoardData.value = {
        username: user.username,
        greetings: getGreetings(),
        registerDay: 7,
        signUp: {
            loading: false,
            doneToday: false,
            rank: 0,
        },
        wordOfWisdom: wordOfWisdom.getRandom(),
    };
};
getUserInfoBoardData();
const fetchUserInfo = async () => {
    try {
        const { data } = await getUserInfo();
        if (userInfoBoardData.value) {
            userInfoBoardData.value.registerDay = data.registerDay;
            userInfoBoardData.value.signUp.doneToday = data.signedUpToday;
            userInfoBoardData.value.signUp.rank = data.signUpRank;
        }
    }
    catch (err) {
        ElNotification.error(`获取用户信息失败: ${err.errMsg}`);
    }
};
fetchUserInfo();
const fetchSignUp = async () => {
    ElNotification.info('正在签到中...');
    userInfoBoardData.value.signUp.loading = true;
    try {
        const { data } = await postSignUp();
        userInfoBoardData.value.signUp.doneToday = true;
        userInfoBoardData.value.signUp.rank = data?.rank;
        ElNotification.success(`签到成功，今日签到排名: ${data?.rank}`);
    }
    catch (err) {
        const error = err;
        ElNotification.error(`签到失败: ${error.errMsg}`);
    }
    finally {
        userInfoBoardData.value.signUp.loading = false;
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.CustomCard;
/** @type {[typeof __VLS_components.CustomCard, typeof __VLS_components.customCard, typeof __VLS_components.CustomCard, typeof __VLS_components.customCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    header: ({ text: __VLS_ctx.getGreetings() }),
}));
const __VLS_2 = __VLS_1({
    header: ({ text: __VLS_ctx.getGreetings() }),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "avatar-zone center" },
});
const __VLS_5 = {}.ElAvatar;
/** @type {[typeof __VLS_components.ElAvatar, typeof __VLS_components.elAvatar, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    shape: "square",
    src: (__VLS_ctx.avatar),
    id: "avatar",
}));
const __VLS_7 = __VLS_6({
    shape: "square",
    src: (__VLS_ctx.avatar),
    id: "avatar",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
(__VLS_ctx.user.username);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "small-gray-text" },
});
(__VLS_ctx.userInfoBoardData?.registerDay);
const __VLS_9 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: ({ width: '100%', marginTop: '20px' }) },
    loading: (__VLS_ctx.userInfoBoardData?.signUp.loading),
    disabled: (__VLS_ctx.userInfoBoardData?.signUp.doneToday),
}));
const __VLS_11 = __VLS_10({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: ({ width: '100%', marginTop: '20px' }) },
    loading: (__VLS_ctx.userInfoBoardData?.signUp.loading),
    disabled: (__VLS_ctx.userInfoBoardData?.signUp.doneToday),
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
let __VLS_13;
let __VLS_14;
let __VLS_15;
const __VLS_16 = {
    onClick: (__VLS_ctx.fetchSignUp)
};
__VLS_12.slots.default;
if (__VLS_ctx.userInfoBoardData?.signUp.rank) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.userInfoBoardData?.signUp.rank);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
var __VLS_12;
if (__VLS_ctx.userInfoBoardData?.wordOfWisdom) {
    {
        const { footer: __VLS_thisSlot } = __VLS_3.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "small-gray-text" },
        });
        (__VLS_ctx.userInfoBoardData.wordOfWisdom);
    }
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['avatar-zone']} */ ;
/** @type {__VLS_StyleScopedClasses['center']} */ ;
/** @type {__VLS_StyleScopedClasses['small-gray-text']} */ ;
/** @type {__VLS_StyleScopedClasses['small-gray-text']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            avatar: avatar,
            userInfoBoardData: userInfoBoardData,
            user: user,
            getGreetings: getGreetings,
            fetchSignUp: fetchSignUp,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
