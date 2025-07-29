import { ReactNode } from 'react';
import { message } from 'antd';
import { useRequest } from 'ahooks';
import { getToken, getXLYKApiToken, setXLYKApiToken, setXLYKUserToken } from '../authorization/token';
import { useSetUser } from '../model/account/hooks';
import { requestMyInfo } from '../services/requests/account';
import { requestXLYKApiToken, requestXLYKUserToken } from '../services/requests/xlyk-account';
import { useSetXLYKTokens } from '../entries/home/model/xlyk-token/hooks';

export const Bootstrap = ({ children }: { children: ReactNode }) => {
  const token = getToken();
  const setUser = useSetUser();
  const setXLYKTokens = useSetXLYKTokens();

  useRequest(requestMyInfo, {
    onSuccess(res) {
      setUser(res);
    },
    onError(err) {
      message.error(err.message);
    },
    ready: !!token,
  });

  const { run: runRequestXLYKApiToken } = useRequest(requestXLYKApiToken, {
    onSuccess(res) {
      setXLYKApiToken(res.ApiToken);
      runRequestXLYKUserToken();
    },
    onError(err) {
      message.error(err.message);
    },
  });

  const { run: runRequestXLYKUserToken } = useRequest(requestXLYKUserToken, {
    onSuccess(res) {
      setXLYKUserToken(res.TokenV2);
      setXLYKTokens({
        ApiToken: getXLYKApiToken() || '',
        userToken: res.TokenV2,
      });
    },
    onError(err) {
      message.error(err.message);
    },
  });

  // 每10分钟获取一次星联云科的apitoken和usertoken，防止过期
  setTimeout(() => {
    runRequestXLYKApiToken();
  }, 1000 * 60 * 10);

  return <>{children}</>;
};
