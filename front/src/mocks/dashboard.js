import mockResponse from '@/mocks/wrapper';
export default [
    {
        url: '/api/signUp',
        method: 'post',
        response: () => {
            return mockResponse(20000, {
                rank: 7,
                success: true,
            }, "签到成功");
        },
    },
];
