import { Button, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { EntranceFormHeader, EntranceFormWrapper } from '../form-styles';

export interface RegisterFormDataType {
  account: string;
  password: string;
}

export const RegisterForm = () => {
  const navigate = useNavigate();

  return (
    <EntranceFormWrapper>
      <EntranceFormHeader>用户注册</EntranceFormHeader>
      <Form<RegisterFormDataType>
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
        <Form.Item
          name="rePassword"
          validateTrigger="onSubmit"
          rules={[
            {
              required: true,
              message: '请再次输入密码',
              type: 'string',
              whitespace: true,
            },
          ]}
        >
          <Input.Password placeholder="请再次输入密码" prefix={<LockOutlined />} />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          注册
        </Button>
      </Form>
      <div>
        <Typography.Text type="secondary">已有账号？</Typography.Text>
        <Typography.Link
          onClick={() => navigate('/account/login')}
        >
          点击登录
        </Typography.Link>
      </div>
    </EntranceFormWrapper>
  );
};
