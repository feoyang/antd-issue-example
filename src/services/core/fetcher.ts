import { AxiosError } from 'axios';
import { clearToken, setToken } from '../../authorization/token';
import type { IHttpInstance, RequestInterceptor, ResponseInterceptor } from './tools';
import { baseHttpFactory } from './tools';
import { AuthManager } from './request-manager';

export type RequestOnFulfilled = RequestInterceptor[0];
export type RequestOnRejected = RequestInterceptor[1];
export type ResponseOnFulfilled = ResponseInterceptor[0];
export type ResponseOnRejected = ResponseInterceptor[1];


const httpRequestInterceptorFactory = () => {
  const authManager = new AuthManager();

  const onFulfilled: RequestOnFulfilled = (config) => {
    return authManager.applyAuth(config);
  };

  return [onFulfilled] as RequestInterceptor;
};

const httpResponseInterceptorFactory = () => {
  const onFulfilled: ResponseOnFulfilled = (res) => {
    const token = res.headers['authorization'];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    token && setToken(token);
    return res;
  };

  const onRejected: ResponseOnRejected = (error: AxiosError) => {
    // 401未授权错误处理
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || '';
      // 检查是否是需要登录的API
      if (requestUrl.includes('/api/v1') || requestUrl.includes('agrox.horai.cn')) {
        clearToken();
        // 避免在已经在登录页面时重复跳转
        if (!location.pathname.includes('/account/login')) {
          location.href = '/account/login';
        }
      }
    }

    // 对于所有错误，继续抛出以便上层处理
    return Promise.reject(error);
  };

  return [onFulfilled, onRejected] as ResponseInterceptor;
};

export const httpFactory = () => {
  return baseHttpFactory<IHttpInstance>({
    requestInterceptor: [httpRequestInterceptorFactory()],
    responseInterceptor: [httpResponseInterceptorFactory()],
  });
};
