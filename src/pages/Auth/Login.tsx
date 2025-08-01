import React from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import {  LockOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import appLogo from '../../assets/app-logo.png';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Login values:', values);
    // Handle login logic here
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
              <div className="flex items-center justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    {t('auth.rememberMe')}
                  </label>
                </Form.Item>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {t('auth.forgotPassword')}
                </Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {t('auth.signIn')}
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center">
            <Text className="text-gray-600">
              {t('auth.dontHaveAccount')}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800"
              >
                {t('auth.signUp')}
              </Link>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
