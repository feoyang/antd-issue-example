import { ReactNode } from 'react';
import { useLocation } from 'react-router';
import qs from 'qs';
import { Navigate } from 'react-router-dom';
import { getToken } from '../token';

/**
 * 统一身份校验组件
 */
export interface AuthorizationProps {
  children: ReactNode;
}

export function Authorization({ children }: AuthorizationProps) {
  const token = getToken();
  const location = useLocation();
  const redirectPath = location.pathname + location.search;
  const toPathname = `/account/login?${qs.stringify({ redirect: encodeURIComponent(redirectPath) })}`;

  if (!token) {
    return <Navigate to={toPathname} />;
  }

  return (
    <>{children}</>
  );
}
