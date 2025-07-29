import { InternalAxiosRequestConfig } from 'axios';
import { getToken, getXLYKApiToken, getXLYKUserToken } from '../../authorization/token';

// 定义认证策略接口
interface AuthStrategy {
  matches(url: string): boolean;
  applyAuth(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig;
}

// 普通API认证策略
class StandardApiAuthStrategy implements AuthStrategy {
  matches(url: string) {
    return url?.startsWith('/api/v1') ?? false;
  }

  applyAuth(config: InternalAxiosRequestConfig) {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = token;
    }
    return config;
  }
}

// XLYK API认证策略
class XLYKAuthStrategy implements AuthStrategy {

  matches(url: string) {
    return url?.startsWith('/xlyk') ?? false;
  }

  applyAuth(config: InternalAxiosRequestConfig) {
    const apiToken = getXLYKApiToken();
    const userToken = getXLYKUserToken();

    config.headers = config.headers || {};
    if (apiToken) {
      config.headers['ApiToken'] = apiToken;
    }
    if (userToken) {
      config.headers['userToken'] = userToken;
    }

    return config;
  }
}

// 认证管理器
export class AuthManager {
  private strategies: AuthStrategy[] = [
    new XLYKAuthStrategy(),
    new StandardApiAuthStrategy(),
  ];

  applyAuth(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const { url } = config;
    const strategy = this.strategies.find(s => s.matches(url || ''));
    return strategy ? strategy.applyAuth(config) : config;
  }
}
