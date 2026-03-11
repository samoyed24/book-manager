import mockResponse from '@/mocks/wrapper';
export default [
    {
        url: '/api/login',
        method: 'post',
        response: ({ body }) => {
            const { username, password } = body;
            if (username === 'admin' && password === 'admin123') {
                return mockResponse(20000, {
                    username: 'admin',
                    roles: ['ROLE_ADMIN'],
                }, "登录成功");
            }
            return mockResponse(40003, null, "用户名或密码错误");
        },
    },
    {
        url: '/api/logout',
        method: 'post',
        response: () => {
            return mockResponse(20000, null, "退出登录成功");
        },
    }
];
