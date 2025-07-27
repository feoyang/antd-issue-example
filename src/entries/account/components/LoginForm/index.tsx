import { Button, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { EntranceFormHeader, EntranceFormWrapper } from '../form-styles';
import { setToken } from '../../../../authorization/token';
import { useSetUser } from '../../../../model/account/hooks';

export interface LoginFormDataType {
  account: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const setUser = useSetUser();

  const handleSubmit = () => {
    setToken('1234567890');
    setUser({
      id: '123456789',
      name: '张三',
    });
    navigate('/home');
  };

  return (
    <EntranceFormWrapper>
      <EntranceFormHeader>欢迎登录系统</EntranceFormHeader>
      <Form<LoginFormDataType>
        size="large"
        style={{ width: '100%' }}
      >
        <Form.Item
          name="account"
          validateTrigger="onSubmit"
          rules={[
            {
              required: true,
              message: '请输入手机号',
              type: 'string',
              whitespace: true,
            },
            {
              pattern: /^1[3-9]\d{9}$/,
              message: '请输入正确的手机号',
            },
          ]}
        >
          <Input placeholder="请输入手机号" prefix={<PhoneOutlined />} />
        </Form.Item>
        <Form.Item
          name="password"
          validateTrigger="onSubmit"
          rules={[
            {
              required: true,
              message: '请输入密码',
              type: 'string',
              whitespace: true,
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          onClick={handleSubmit}
        >
          登录
        </Button>
      </Form>
      <div>
        <Typography.Text type="secondary">没有账号？</Typography.Text>
        <Typography.Link
          onClick={() => navigate('/account/register')}
        >
          点击注册
        </Typography.Link>
      </div>
    </EntranceFormWrapper>
  );
};
