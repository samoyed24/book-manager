import mockResponse from '@/mocks/wrapper';
import Mock from 'mockjs';
export default [
    {
        url: '/api/project',
        method: 'get',
        response: ({ query }) => {
            const data = Mock.mock({
                'list|10': [
                    {
                        name: '@cword(7, 12)',
                        client: '@cword(15, 20)',
                        amount: '@float(100000, 10000000, 2, 2)',
                        startDate: '@datetime',
                        status: () => Mock.Random.pick(['End', 'Process', 'Quality']),
                        description: '@cword(20, 50)'
                    },
                ],
                total: 56
            });
            return mockResponse(20000, data, 'OK');
        }
    },
];
