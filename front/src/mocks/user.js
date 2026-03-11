import mockResponse, { mockPagedTableData } from '@/mocks/wrapper';
import Mock from 'mockjs';
export default [
    {
        url: '/api/user/getUsers',
        method: 'get',
        response: ({ query }) => {
            const data = Mock.mock({
                'list|10': [
                    {
                        name: '@cword(2, 3)',
                        username: '@word(5, 10)',
                        workNumber: '@int(100000000000, 999999999999)',
                        facultyName: () => Mock.Random.pick(['国土资源工程学院', '信息工程与自动化学院', '冶金与能源工程学院', '医学院', '马克思主义学院', '体育学院', '化学工程学院']),
                        grade: () => Mock.Random.pick(['大一', '大二', '大三', '大四', '研一', '研二', '研三']),
                        graduated: () => Mock.Random.pick([true, false]),
                        valid: true,
                        userRole: 'ROLE_USER',
                    },
                ],
            });
            return mockResponse(20000, mockPagedTableData(data.list), 'OK');
        }
    },
    {
        url: '/api/user/getUserInfo',
        method: 'get',
        response: ({ query }) => {
            const data = Mock.mock({ registerDay: 1, signedUpToday: true, signUpRank: 1 });
            return mockResponse(20000, data, 'OK');
        }
    }
];
