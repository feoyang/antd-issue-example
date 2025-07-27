import type { AxiosResponse } from 'axios';

export const transformFile = <T = any> (axiosResponse: AxiosResponse): T => {
  if (axiosResponse.status >= 200 && axiosResponse.status < 300) {
    const res = axiosResponse.data;
    const err = axiosResponse as unknown as Error;

    return res;

    throw new Error(res.message || err.message || 'Unknown Error');
  } else {
    throw new Error(`${axiosResponse.status}: ${axiosResponse.statusText}`);
  }
};
