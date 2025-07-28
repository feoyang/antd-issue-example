import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { clearToken } from '../../../../authorization/token';
import { LeftWrapper, RightWrapper } from '../../layout/style';

export const Mine = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    clearToken();
    navigate('/account/login');
  };

  return (
    <>
      <LeftWrapper>
        <Button onClick={handleClick}>退出登录</Button>
      </LeftWrapper>
      <RightWrapper>
        123
      </RightWrapper>
    </>
  );
};
