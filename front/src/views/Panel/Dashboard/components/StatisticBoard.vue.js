import { getBookStatistics } from '@/api/book';
// const statisticsData = reactive<BookStatisticsResult>({
//     totalBook: 0,
//     soonExpireBorrow: 0,
//     registeredUser: 0,
//     myBorrow: 0,
//     myTotalBorrow: 0,
//     borrowedBook: 0,
// })
const statisticsData = ref({
    totalBook: 0,
    soonExpireBorrow: 0,
    registeredUser: 0,
    myBorrow: 0,
    myTotalBorrow: 0,
    borrowedBook: 0,
});
const fetchData = async () => {
    const { data } = await getBookStatistics();
    if (data) {
        statisticsData.value = data;
    }
};
fetchData();
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
    header: ({ icon: 'DataLine', text: '图书统计数据' }),
}));
const __VLS_2 = __VLS_1({
    header: ({ icon: 'DataLine', text: '图书统计数据' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_3.slots;
    const __VLS_5 = {}.ElRow;
    /** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        gutter: (10),
    }));
    const __VLS_7 = __VLS_6({
        gutter: (10),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_8.slots.default;
    const __VLS_9 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        span: (8),
    }));
    const __VLS_11 = __VLS_10({
        span: (8),
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    __VLS_12.slots.default;
    const __VLS_13 = {}.CustomStatisticCard;
    /** @type {[typeof __VLS_components.CustomStatisticCard, typeof __VLS_components.customStatisticCard, ]} */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
        transition: ({ duration: 1000, fromValue: 0 }),
        value: (__VLS_ctx.statisticsData.totalBook),
        title: "馆内总藏书",
        precision: (0),
        icon: ({
            fromElIcon: 'Collection'
        }),
        suffix: "本",
    }));
    const __VLS_15 = __VLS_14({
        transition: ({ duration: 1000, fromValue: 0 }),
        value: (__VLS_ctx.statisticsData.totalBook),
        title: "馆内总藏书",
        precision: (0),
        icon: ({
            fromElIcon: 'Collection'
        }),
        suffix: "本",
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    var __VLS_12;
    const __VLS_17 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
        span: (8),
    }));
    const __VLS_19 = __VLS_18({
        span: (8),
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    __VLS_20.slots.default;
    const __VLS_21 = {}.CustomStatisticCard;
    /** @type {[typeof __VLS_components.CustomStatisticCard, typeof __VLS_components.customStatisticCard, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        transition: ({ duration: 1000, fromValue: 0 }),
        value: (__VLS_ctx.statisticsData.borrowedBook),
        title: "当前借出书籍",
        precision: (0),
        icon: ({
            fromElIcon: 'Upload'
        }),
        suffix: "本",
    }));
    const __VLS_23 = __VLS_22({
        transition: ({ duration: 1000, fromValue: 0 }),
        value: (__VLS_ctx.statisticsData.borrowedBook),
        title: "当前借出书籍",
        precision: (0),
        icon: ({
            fromElIcon: 'Upload'
        }),
        suffix: "本",
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    var __VLS_20;
    const __VLS_25 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        span: (8),
    }));
    const __VLS_27 = __VLS_26({
        span: (8),
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_28.slots.default;
    const __VLS_29 = {}.CustomStatisticCard;
    /** @type {[typeof __VLS_components.CustomStatisticCard, typeof __VLS_components.customStatisticCard, ]} */ ;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
        transition: ({ duration: 1000, fromValue: 0 }),
        value: (__VLS_ctx.statisticsData.registeredUser),
        title: "注册读者数",
        precision: (0),
        icon: ({
            fromElIcon: 'Avatar'
        }),
        suffix: "人",
    }));
    const __VLS_31 = __VLS_30({
        transition: ({ duration: 1000, fromValue: 0 }),
        value: (__VLS_ctx.statisticsData.registeredUser),
        title: "注册读者数",
        precision: (0),
        icon: ({
            fromElIcon: 'Avatar'
        }),
        suffix: "人",
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    var __VLS_28;
    var __VLS_8;
    const __VLS_33 = {}.ElRow;
    /** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
        gutter: (10),
    }));
    const __VLS_35 = __VLS_34({
        gutter: (10),
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    __VLS_36.slots.default;
    const __VLS_37 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
        span: (8),
    }));
    const __VLS_39 = __VLS_38({
        span: (8),
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    __VLS_40.slots.default;
    const __VLS_41 = {}.CustomStatisticCard;
    /** @type {[typeof __VLS_components.CustomStatisticCard, typeof __VLS_components.customStatisticCard, ]} */ ;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
        transition: ({ duration: 1000, fromValue: 0 }),
        value: (__VLS_ctx.statisticsData.myBorrow),
        title: "我的当前借阅",
        precision: (0),
        icon: ({
            fromElIcon: 'Management'
        }),
        suffix: "本",
    }));
    const __VLS_43 = __VLS_42({
        transition: ({ duration: 1000, fromValue: 0 }),
        value: (__VLS_ctx.statisticsData.myBorrow),
        title: "我的当前借阅",
        precision: (0),
        icon: ({
            fromElIcon: 'Management'
        }),
        suffix: "本",
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    var __VLS_40;
    const __VLS_45 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        span: (8),
    }));
    const __VLS_47 = __VLS_46({
        span: (8),
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    __VLS_48.slots.default;
    const __VLS_49 = {}.CustomStatisticCard;
    /** @type {[typeof __VLS_components.CustomStatisticCard, typeof __VLS_components.customStatisticCard, ]} */ ;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
        transition: ({ duration: 1000, fromValue: 0 }),
        value: (__VLS_ctx.statisticsData.soonExpireBorrow),
        title: "7 日内到期借阅",
        precision: (0),
        icon: ({
            fromElIcon: 'WarnTriangleFilled'
        }),
        suffix: "本",
    }));
    const __VLS_51 = __VLS_50({
        transition: ({ duration: 1000, fromValue: 0 }),
        value: (__VLS_ctx.statisticsData.soonExpireBorrow),
        title: "7 日内到期借阅",
        precision: (0),
        icon: ({
            fromElIcon: 'WarnTriangleFilled'
        }),
        suffix: "本",
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    var __VLS_48;
    const __VLS_53 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
        span: (8),
    }));
    const __VLS_55 = __VLS_54({
        span: (8),
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    __VLS_56.slots.default;
    const __VLS_57 = {}.CustomStatisticCard;
    /** @type {[typeof __VLS_components.CustomStatisticCard, typeof __VLS_components.customStatisticCard, ]} */ ;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
        transition: ({ duration: 1000, fromValue: 0 }),
        value: (__VLS_ctx.statisticsData.myTotalBorrow),
        title: "我的总借阅量",
        precision: (0),
        icon: ({
            fromElIcon: 'Management'
        }),
        suffix: "本",
    }));
    const __VLS_59 = __VLS_58({
        transition: ({ duration: 1000, fromValue: 0 }),
        value: (__VLS_ctx.statisticsData.myTotalBorrow),
        title: "我的总借阅量",
        precision: (0),
        icon: ({
            fromElIcon: 'Management'
        }),
        suffix: "本",
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    var __VLS_56;
    var __VLS_36;
}
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            statisticsData: statisticsData,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
