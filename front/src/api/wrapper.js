import router from "@/router";
import { useUserAuthStore } from "@/stores/auth";
import axios, { AxiosError } from "axios";
import { ElMessage } from "element-plus";
export class APIError extends Error {
    errCode;
    errMsg;
    constructor({ errCode, errMsg }) {
        super();
        this.name = 'APIError';
        this.message = 'APIError';
        this.errMsg = errMsg;
        this.errCode = errCode;
    }
}
const user = useUserAuthStore();
const request = {
    async get(url, params, config) {
        return axios.get(url, { params, ...config })
            .then((res) => {
            const response = res.data;
            if (!String(response.code).startsWith('2')) {
                const err = new APIError({
                    errCode: response.code,
                    errMsg: response.message,
                });
                throw err;
            }
            return response;
        })
            .catch((err) => {
            if (err instanceof AxiosError) {
                const apiErr = new APIError({
                    errCode: err.response?.status,
                    errMsg: err.message,
                });
                throw apiErr;
            }
            else
                throw err;
        })
            .catch((err) => {
            if (String(err.errCode).startsWith('5')) {
                ElMessage.error(`Errcode: ${err.errCode} ${err.errMsg}`);
            }
            else if (String(err.errCode) === '401') {
                ElMessage.warning('您的登录状态已过期，请重新登录');
                user.clearUser();
                router.push('/auth');
            }
            throw err;
        });
    },
    async post(url, data, config) {
        return axios.post(url, data, config)
            .then((res) => {
            const response = res.data;
            if (!String(response.code).startsWith('2')) {
                const err = new APIError({
                    errCode: response.code,
                    errMsg: response.message,
                });
                throw err;
            }
            return response;
        })
            .catch((err) => {
            if (err instanceof AxiosError) {
                const apiErr = new APIError({
                    errCode: err.response?.status,
                    errMsg: err.message,
                });
                throw apiErr;
            }
            else
                throw err;
        })
            .catch((err) => {
            if (String(err.errCode).startsWith('5')) {
                ElMessage.error(`Errcode: ${err.errCode} ${err.errMsg}`);
            }
            else if (String(err.errCode) === '401') {
                ElMessage.warning('您的登录状态已过期，请重新登录');
                user.clearUser();
                router.push('/auth');
            }
            throw err;
        });
    },
};
export default request;
