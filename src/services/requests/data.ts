import qs from 'qs';
import { request } from '../core/http';
import { transformIResponse, transformResponse } from '../tools/transform-response';
import { Images } from '../../data';

export const APP_ID = '9a9aca8fae509e90afd0ad35d884719f';
export const APP_KEY = 'e2de2f5c0672c85bd240c3a7f3f7b366';

export const WEATHER_DEVICE_CODE = 'QXZL00000081';
export const CORNER_DEVICE_ID = '189';

export const requestToken = async () => {
  const url = 'https://iotapi.dongleezy.com/iotApps/getToken';

  const query = qs.stringify({
    appid: APP_ID,
    appkey: APP_KEY,
    timestamp: Date.now(),
  });
  const res = await request.get(`${url}?${query}`);

  return transformResponse(res);
};

export enum WeatherType {
  WEATHER='195',
  SOIL='194',
}

export const requestImages = async () => {
  const url = '/api/iotApps/getImages';
  const res = await request.get(url);

  return transformIResponse<Images>(res);
};

export const requestDeviceList = async () => {
  const url = 'https://iotapi.dongleezy.com/iotApps/device/iotDeviceList';
  const query = qs.stringify({
    appid: APP_ID,

    code: WEATHER_DEVICE_CODE,

    /**
     * 类型:2气象设备
     */
    type: 2,

    /**
     * 业务类型:2古树项目(必填)
     */
    platformType: 1,
    page: 1,
    size: 10,
  });
  const res = await request.get(`${url}?${query}`);
  return transformResponse(res);
};

export interface RequestChartDataParams {
  id: string;
  unit: string;
  startTime?: string;
  endTime: string;
}

export const requestChartData = async (params: RequestChartDataParams) => {
  const url = 'https://iotapi.dongleezy.com/iotApps/device/getDeviceChartData';
  const query = qs.stringify({
    ...params,
    appid: APP_ID,
  });

  const res = await request.get(`${url}?${query}`);

  return transformResponse(res);
};
