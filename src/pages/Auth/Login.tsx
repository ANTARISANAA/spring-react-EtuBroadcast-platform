import React from 'react';
import { Button, Card, Divider, Form, Input, Space, Typography } from 'antd';
import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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
          <Title level={2} className="text-gradient">
            {t('auth.signIn')}
          </Title>
          <Text className="text-gray-600">
            Welcome back! Please sign in to your account.
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
              <Input prefix={<UserOutlined />} placeholder="Enter your email" />
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
                placeholder="Enter your password"
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

          <Divider>or</Divider>

          <Button icon={<GoogleOutlined />} block size="large" className="mb-4">
            Continue with Google
          </Button>

          <div className="text-center">
            <Text className="text-gray-600">
              Don't have an account?{' '}
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
