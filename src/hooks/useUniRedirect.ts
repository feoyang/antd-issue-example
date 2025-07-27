import { useLocation, useNavigate } from 'react-router';
import { useMemoizedFn } from 'ahooks';


export const useUniRedirect = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const path = decodeURIComponent(new URLSearchParams(search).get('redirect') || '');

  /**
   * 如果没有 redirect，则兜底跳转的位置
   */
  return useMemoizedFn((fallback: string) => {
    if (path) {
      navigate(path);
    } else {
      navigate(fallback);
    }
  });
};
