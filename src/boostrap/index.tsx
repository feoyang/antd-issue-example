import { ReactNode } from 'react';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { getToken } from '../authorization/token';
import { useSetUser } from '../model/account/hooks';
import { requestMyInfo } from '../services/requests/account';

export const Bootstrap = ({ children }: { children: ReactNode }) => {
  const token = getToken();
  const setUser = useSetUser();

  useRequest(requestMyInfo, {
    onSuccess(res) {
      setUser(res);
    },
    onError(err) {
      message.error(err.message);
    },
    ready: !!token,
  });

  return <>{children}</>;
};
