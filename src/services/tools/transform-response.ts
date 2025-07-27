import type { AxiosResponse } from 'axios';
import { IResponse } from '../core/types';

/**
 * 不包含success code message data的响应体
 * @param axiosResponse
 */
export const transformResponse = <T = any> (axiosResponse: AxiosResponse<T>): T => {
  if (axiosResponse.status >= 200 && axiosResponse.status < 300) {
    // const err = axiosResponse as unknown as Error;
    // err.message || 'Unknown Error'
    return axiosResponse.data;
  } else {
    throw new Error(`${axiosResponse.status}: ${axiosResponse.statusText}`);
  }
};

/**
 * 包含success code message data的响应体
 * @param axiosResponse
 */
export const transformIResponse = <T = any> (axiosResponse: AxiosResponse<IResponse<T>>): T => {
  if (axiosResponse.status >= 200 && axiosResponse.status < 300) {
    const res = axiosResponse.data;
    const err = axiosResponse as unknown as Error;

    if (res?.code === 200) {
      return res?.data || {} as any;
    }

    throw new Error(res.message || err.message || 'Unknown Error');
  } else {
    throw new Error(`${axiosResponse.status}: ${axiosResponse.statusText}`);
  }
};
