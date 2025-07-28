import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { clearToken, getToken, setToken } from '../../authorization/token';
import type { IHttpInstance, RequestInterceptor, ResponseInterceptor } from './tools';
import { baseHttpFactory } from './tools';

export type RequestOnFulfilled = RequestInterceptor[0];
export type RequestOnRejected = RequestInterceptor[1];
export type ResponseOnFulfilled = ResponseInterceptor[0];
export type ResponseOnRejected = ResponseInterceptor[1];


const httpRequestInterceptorFactory = () => {
  const onFulfilled: RequestOnFulfilled = (config) => {
    const { headers, url } = config;

    const token = getToken();

    return {
      ...config,
      headers: {
        ...headers,
        ...token && url?.includes('/api/v1') && { 'Authorization': token },
      },
    } as InternalAxiosRequestConfig;
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

  const onRejected: ResponseOnRejected = (res: AxiosError) => {
    if (res.response?.status === 401) {
      clearToken();
      location.href = '/account/login';
    }
    return Promise.resolve(res.response);
  };

  return [onFulfilled, onRejected] as ResponseInterceptor;
};

export const httpFactory = () => {
  return baseHttpFactory<IHttpInstance>({
    requestInterceptor: [httpRequestInterceptorFactory()],
    responseInterceptor: [httpResponseInterceptorFactory()],
  });
};
