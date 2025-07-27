/**
 * 生产环境域名
 */
export const PRO_URL = '';

/**
 * 预发环境域名
 */
export const PRE_URL = '';

/**
 * 测试环境域名
 */
export const TEST_URL = 'http://81.70.39.188:8211';

/**
 * 开发环境域名
 */
export const DEV_URL = 'http://localhost:5173';

export enum Env {
  PRE = 'pre',
  TEST = 'test',
  DEV = 'dev',
  PRO = 'pro',
}

export const getEnv = (): Env => {
  if (window.location.hostname.includes('localhost')) {
    return Env.DEV;
  }

  // if (window.location.hostname.includes('test.')) {
  //   return Env.TEST;
  // }
  //
  // if (window.location.hostname.includes('pre.')) {
  //   return Env.PRE;
  // }

  return Env.TEST;
};

export const getUrl = () => {
  const env = getEnv();
  const map = {
    [Env.DEV]: DEV_URL,
    [Env.TEST]: TEST_URL,
    [Env.PRE]: PRE_URL,
    [Env.PRO]: PRO_URL,
  };
  return map[env];
};
