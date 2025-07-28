import { ReactNode } from 'react';
import { useRequest } from 'ahooks';
import { message, Spin } from 'antd';
import { getToken } from '../token';
import { useGetDefaultUrl } from '../../hooks/useGoHome';
import { useUniRedirect } from '../../hooks/useUniRedirect';
import { requestMyInfo } from '../../services/requests/account';
import { useSetUser } from '../../model/account/hooks';

export const AutoLogin = ({ children }: { children: ReactNode }) => {
  const token = getToken();
  const setUser = useSetUser();
  const getDefaultUrl = useGetDefaultUrl();
  const uniRedirect = useUniRedirect();

  const { loading } = useRequest(requestMyInfo, {
    onSuccess(res) {
      setUser(res);
      // 如果获取个人信息成功，则说明保存的token还有效。
      message.success('登录成功');
      uniRedirect(getDefaultUrl());
    },
    onError(err) {
      message.error(err.message);
    },
    ready: !!token,
  });

  return (
    <>
      <Spin tip="登录中..." fullscreen spinning={loading} />
      {children}
    </>
  );
};
