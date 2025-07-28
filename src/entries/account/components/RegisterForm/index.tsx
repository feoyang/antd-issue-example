import { Button, Form, Input, message, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { EntranceFormHeader, EntranceFormWrapper } from '../form-styles';
import { requestRegisterByUsername } from '../../../../services/requests/account';

export interface RegisterFormDataType {
  account: string;
  password: string;
}

export const RegisterForm = () => {
  const navigate = useNavigate();

  const { loading, run: register } = useRequest(requestRegisterByUsername, {
    manual: true,
    onSuccess: (res) => {
      navigate(`/login?phone=${res}`);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handleFinish = (value: RegisterFormDataType) => {
    register(value.account, value.password);
  };

  return (
    <EntranceFormWrapper>
      <EntranceFormHeader>用户注册</EntranceFormHeader>
      <Form<RegisterFormDataType>
        size="large"
        style={{ width: '100%' }}
        onFinish={handleFinish}
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
            {
              min: 6,
              message: '密码长度不能小于6位',
            },
            {
              max: 16,
              message: '密码长度不能大于16位',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="请再次输入密码" prefix={<LockOutlined />} />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
        >
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
