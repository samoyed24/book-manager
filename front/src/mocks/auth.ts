import { MockMethod } from 'vite-plugin-mock';
import mockResponse from '@/mocks/wrapper';
import { AuthFormData, UserStoreData } from 'types/api';

export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }: { body: AuthFormData }) => {
      const { username, password } = body;
      if (username === 'admin' && password === 'admin123') {
        return mockResponse<UserStoreData>(
            20000,
            {
              username: 'admin',
              roles: ['ROLE_ADMIN'], 
            },
            "登录成功"
        )
      }
      return mockResponse(
        40003,
        null,
        "用户名或密码错误"
      )
    },
  },
  {
    url: '/api/logout',
    method: 'post',
    response: () => {
      return mockResponse(
        20000,
        null,
        "退出登录成功"
      )
    },
  }
] as MockMethod[];
