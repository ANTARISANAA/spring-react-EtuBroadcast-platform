import React from 'react';
import { Avatar, Button, Card, Form, Input, Space, Typography } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Profile update:', values);
    // Handle profile update logic here
  };

  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <Space direction="vertical" size="large" className="w-full">
          <div className="flex items-center space-x-4">
            <Avatar size={64} icon={<UserOutlined />} />
            <div>
              <Title level={3} className="mb-0">
                John Doe
              </Title>
              <span className="text-gray-500">john.doe@email.com</span>
            </div>
          </div>

          <Form
            form={form}
            layout="vertical"
            initialValues={{
              name: 'John Doe',
              email: 'john.doe@email.com',
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: t('validation.required') }]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: t('validation.required') },
                { type: 'email', message: t('validation.email') },
              ]}
            >
              <Input prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Profile;
