import { User } from '../../data';
import { request } from '../core/http';
import { transformIResponse } from '../tools/transform-response';

/**
 * 基于(用户名/电话号)+密码登录
 * @param usernameOrPhone
 * @param password
 * @returns
 */
export const requestLoginByPhoneOrUserName = async (usernameOrPhone: string, password: string) => {
  const res = await request.post('/api/v1/users/login/username-phone-password', {
    usernameOrPhone,
    password,
  });
  return transformIResponse<User>(res);
};

/**
 * 基于用户名密码注册
 * @param usernameOrPhone
 * @param password
 * @returns
 */
export const requestRegisterByUsername = async (username: string, password: string) => {
  const res = await request.post('/api/v1/users/register/username', {
    username,
    password,
  });
  return transformIResponse<void>(res);
};

/**
 * 获取用户自己的信息
 * @returns 
 */
export const requestMyInfo = async () => {
  const res = await request.get('/api/v1/users/own');
  return transformIResponse<User>(res);
};
