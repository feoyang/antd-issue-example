import { Button, Form, Input, message, Typography } from 'antd';
import { useNavigate, useSearchParams } from 'react-router';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { EntranceFormHeader, EntranceFormWrapper } from '../form-styles';
import { useSetUser } from '../../../../model/account/hooks';
import { requestLoginByPhoneOrUserName } from '../../../../services/requests/account';

export interface LoginFormDataType {
  account: string;
  password: string;
}

export const LoginForm = () => {
  const [searchParams] = useSearchParams();
  const phone = searchParams.get('phone');
  const navigate = useNavigate();
  const setUser = useSetUser();

  const { loading, run: login } = useRequest(requestLoginByPhoneOrUserName, {
    manual: true,
    onSuccess: (res) => {
      setUser(res);
      navigate('/home');
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handleFinish = (values: LoginFormDataType) => {
    login(values.account, values.password);
  };

  return (
    <EntranceFormWrapper>
      <EntranceFormHeader>欢迎登录系统</EntranceFormHeader>
      <Form<LoginFormDataType>
        size="large"
        style={{ width: '100%' }}
        onFinish={handleFinish}
        initialValues={{
          account: phone || '',
        }}
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
            {
              min: 6,
              message: '密码长度不能小于6位',
            },
            {
              max: 16,
              message: '密码长度不能大于16位',
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
          登录
          </Button>
        </Form.Item>
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
