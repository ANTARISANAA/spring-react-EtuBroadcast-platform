import React from 'react';
import { Button, Card, Form, Switch, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Settings updated:', values);
    // Handle settings update logic here
  };

  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <Title level={3}>{t('navigation.settings')}</Title>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            notifications: true,
            darkMode: false,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="notifications"
            label="Enable Notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item name="darkMode" label="Dark Mode" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Settings;
