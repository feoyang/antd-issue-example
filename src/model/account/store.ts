import { atom } from 'jotai';
import { User } from '../../data';

export const accountAtoms = {
  // 用户登录的token
  token: atom<string | null>(),
  // 星联云科平台的token
  xlykToken: atom<string | null>(),
  // 登录之后的用户信息
  selfInfo: atom<User | undefined>(undefined),
};
