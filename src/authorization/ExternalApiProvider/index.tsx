import { ReactNode } from 'react';
import { useRequest } from 'ahooks';
import { message, Spin } from 'antd';
import { requestXLYKApiToken, requestXLYKUserToken } from '../../services/requests/xlyk-account';
import { useToken } from '../../model/account/hooks';
import { useSetXLYKTokens } from '../../entries/home/model/xlyk-token/hooks';
import { getXLYKApiToken, setXLYKApiToken, setXLYKUserToken } from '../token';

export interface ExternalApiProviderProps {
  children: ReactNode;
  // 外部平台 API 端点
  apiEndpoint?: string;
  // 获取 token 的请求参数
  tokenRequestData?: Record<string, any>;
  // 是否自动获取 token
  autoFetch?: boolean;
}

export function ExternalApiProvider({
  children,
}: ExternalApiProviderProps) {
  const token = useToken();
  const setXLYKTokens = useSetXLYKTokens();

  const { loading: requestApiTokenLoading } = useRequest(requestXLYKApiToken, {
    manual: !!token,
    onSuccess: (res) => {
      setXLYKApiToken(res.ApiToken);
      runRequestXLYKUserToken();
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  const { run: runRequestXLYKUserToken, loading: requestUserTokenLoading } = useRequest(requestXLYKUserToken, {
    manual: true,
    onSuccess: (res) => {
      setXLYKUserToken(res.TokenV2);
      setXLYKTokens({
        ApiToken: getXLYKApiToken() || '',
        userToken: res.TokenV2,
      });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  if (requestApiTokenLoading || requestUserTokenLoading) {
    return <Spin fullscreen tip="加载中..." />;
  }

  return <>{children}</>;
}
