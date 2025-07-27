import { useNavigate } from 'react-router';
import { useMemoizedFn } from 'ahooks';

export const useGetDefaultUrl = () => {

  return useMemoizedFn(() => {
    return '/home';
  });
};

export const useGoHome = () => {
  const navigate = useNavigate();

  const getDefaultUrl = useGetDefaultUrl();
  return useMemoizedFn(() => {
    const url = getDefaultUrl();
    return navigate(url);
  });
};
