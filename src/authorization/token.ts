import { safeStorage } from '../common/safe-storage';

const TOKEN_KEY = 'country-token';
const XLYK_API_TOKEN_KEY = 'xlyk-api-token';
const XLYK_USER_TOKEN_KEY = 'xlyk-user-token';

export const getToken = () => {
  return safeStorage.getItem(TOKEN_KEY);
};

export const setToken = (value: string) => {
  safeStorage.setItem(TOKEN_KEY, value);
};

export const clearToken = () => {
  safeStorage.removeItem(TOKEN_KEY);
};

/**
 * 星联云科
 */
export const getXLYKApiToken = () => {
  return safeStorage.getItem(XLYK_API_TOKEN_KEY);
};

export const setXLYKApiToken = (value: string) => {
  safeStorage.setItem(XLYK_API_TOKEN_KEY, value);
};

export const clearXLYKApiToken = () => {
  safeStorage.removeItem(XLYK_API_TOKEN_KEY);
};

export const getXLYKUserToken = () => {
  return safeStorage.getItem(XLYK_USER_TOKEN_KEY);
};

export const setXLYKUserToken = (value: string) => {
  safeStorage.setItem(XLYK_USER_TOKEN_KEY, value);
};

export const clearXLYKUserToken = () => {
  safeStorage.removeItem(XLYK_USER_TOKEN_KEY);
};
