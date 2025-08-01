import React from 'react';
import { Avatar, Card, Form, Input, Space, Typography, Tag } from 'antd';
import { MailOutlined, UserOutlined, CrownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/core/context/AuthContext';

const { Title, Text } = Typography;

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { admin } = useAuth();
  const [form] = Form.useForm();

  // If no admin data, show loading or redirect
  if (!admin) {
    return (
      <div className="mx-auto max-w-xl">
        <Card>
          <div className="text-center">
            <Text type="secondary">{t('profile.loading')}</Text>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <Space direction="vertical" size="large" className="w-full">
          <div className="flex items-center space-x-4">
            <Avatar size={64} icon={<UserOutlined />} />
            <div>
              <Title level={3} className="mb-0">
                {admin.fullName}
              </Title>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">{admin.email}</span>
                <Tag color="gold" icon={<CrownOutlined />}>
                  {admin.role}
                </Tag>
              </div>
            </div>
          </div>

          <Form
            form={form}
            layout="vertical"
            initialValues={{
              fullName: admin.fullName,
              email: admin.email,
              role: admin.role,
            }}
            disabled={true} // Make form read-only
          >
            <Form.Item
              name="fullName"
              label={t('profile.fullName')}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="email"
              label={t('profile.email')}
            >
              <Input prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item
              name="role"
              label={t('profile.role')}
            >
              <Input prefix={<CrownOutlined />} />
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Profile;
