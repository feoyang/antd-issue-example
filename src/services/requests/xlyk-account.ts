import md5 from 'crypto-js/md5';
import { request } from '../core/http';
import { transformXLYKResponse } from '../tools/transform-response';

// 配置在vite.config中
const BASE_URL = '/xlyk';
const API_ID = '1566213dbff65578f98c2773602647b3';
const API_PASSWORD = 'DB082C4FEA2C2C29FF3E1E36D1EFF559';
const API_SECRET = 'satlic.com.yl';
const LOGIN_NAME = 'zhihuinongye';
const LOGIN_PASSWORD = 'zhihuinongye';

export interface RequestXLYKApiTokenRes {
  ApiId: string;
  ValidityUtcTime: string;
  ApiToken: string;
  ApiTokenValidityUtcTime: string;
  IotConfig: string;
}

export const requestXLYKApiToken = async () => {
  const timeStamp = Date.now();
  const loginPassword = md5(`${timeStamp}${API_PASSWORD}`).toString();
  const body = {
    apiId: API_ID,
    timeStamp,
    loginPassword,
    sign: md5(`${API_ID}${API_SECRET}${timeStamp}${loginPassword}`).toString(),
  };

  const res = await request.post(`${BASE_URL}/authorize/api/v2/AuthAccess/GetApiAccessToken`, body);
  return transformXLYKResponse<RequestXLYKApiTokenRes>(res);
};

export interface RequestXLYKUserTokenRes {
  UserId: number;
  UserName: string;
  Telphone: string;
  TokenV1: string;
  TokenV2: string;
  DefaultProjectID: number;
  DefaultProjectCategoryID: number;
  TokenValidityUTCTime: string;
  TitleLogoUrl: string | null;
  LogoPath: string | null;
  ToolRight: number;
  ToolExpirationDate: string;
  PwdExpirationTime: string;
  LastViewProjectId: number | null;
}

export const requestXLYKUserToken = async () => {
  const body = {
    loginName: LOGIN_NAME,
    password: md5(`${LOGIN_PASSWORD}.COM`).toString(),
    channel: 'app',
  };

  const res = await request.post(`${BASE_URL}/account/api/v2/User/UserLogin`, body);
  return transformXLYKResponse<RequestXLYKUserTokenRes>(res);
};
