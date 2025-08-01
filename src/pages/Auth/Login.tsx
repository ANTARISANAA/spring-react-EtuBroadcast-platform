import React from 'react';
import { Button, Card, Form, Input, Typography, App } from 'antd';
import {  LockOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import {  useNavigate } from 'react-router-dom';
import { useAsync } from 'react-async-states';
import appLogo from '../../assets/app-logo.png';
import { authApi } from '@/config/api/auth';
import { useAuth } from '@/core/context/AuthContext';
import type { LoginRequest } from '@/utils/types';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { notification } = App.useApp();
  const [form] = Form.useForm();

  const {
    isPending,
    source: { runc },
  } = useAsync({
    producer: async ({ args: [credentials] }: { args: [LoginRequest] }) => {
      return await authApi.login(credentials);
    },
  });

  const onFinish = (values: LoginRequest) => {
    runc({
      args: [values],
      onSuccess: ({ data: response }) => {
        login(response);
        notification.success({
          message: t('auth.loginSuccess'),
        });
        navigate('/');
      },
      onError: ({ data: error }) => {
        notification.error({
          message: t((error as any).cause?.message || 'auth.loginError'),
        });
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex flex-col items-center mb-6">
            <img 
              src={appLogo} 
              alt={t('core.messages.appName')} 
              className="w-24 mb-4"
            />
            <Title level={1} className="text-gradient mb-2">
              {t('core.messages.appName')}
            </Title>
          </div>
          <Title level={2} className="text-gradient">
            {t('auth.signIn')}
          </Title>
          <Text className="text-gray-600">
            {t('auth.welcomeBack')}
          </Text>
        </div>

        <Card className="shadow-lg">
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              label={t('auth.email')}
              rules={[
                { required: true, message: t('validation.required') },
                { type: 'email', message: t('validation.email') },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder={t('auth.enterEmail')} />
            </Form.Item>

            <Form.Item
              name="password"
              label={t('auth.password')}
              rules={[
                { required: true, message: t('validation.required') },
                { min: 6, message: t('validation.minLength', { min: 6 }) },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={t('auth.enterPassword')}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={isPending}>
                {t('auth.signIn')}
              </Button>
            </Form.Item>
          </Form>

        </Card>
      </div>
    </div>
  );
};

export default Login;
