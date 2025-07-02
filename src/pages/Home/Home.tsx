import React from 'react';
import { Button, Card, Col, Row, Space, Statistic, Typography } from 'antd';
import {
  ArrowUpOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: 'Total Users',
      value: 1128,
      icon: <UserOutlined />,
      color: '#8b5cf6', // Purple
      increase: 12,
    },
    {
      title: 'Total Orders',
      value: 93,
      icon: <ShoppingCartOutlined />,
      color: '#ed4bff', // Secondary purple
      increase: 8,
    },
    {
      title: 'Revenue',
      value: 11280,
      icon: <DollarOutlined />,
      color: '#0ea5e9', // Accent blue
      increase: 15,
      prefix: '$',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8 text-center">
        <Title
          level={2}
          className="text-gradient mb-4"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {t('messages.welcomeMessage')}
        </Title>
        <Paragraph
          className="text-lg text-gray-600"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Welcome to your dashboard. Here's an overview of your application.
        </Paragraph>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-8">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card className="hover:shadow-glow border-0 shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    prefix={stat.prefix}
                    valueStyle={{
                      color: stat.color,
                      fontSize: '24px',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  />
                  <div className="mt-2 flex items-center text-green-600">
                    <ArrowUpOutlined className="mr-1" />
                    <span className="text-sm font-medium">
                      {stat.increase}%
                    </span>
                  </div>
                </div>
                <div
                  className="rounded-full p-3"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <div style={{ color: stat.color, fontSize: '24px' }}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Quick Actions" className="h-full border-0 shadow-lg">
            <Space direction="vertical" size="middle" className="w-full">
              <Button type="primary" size="large" block className="btn-primary">
                Create New Project
              </Button>
              <Button size="large" block className="btn-secondary">
                View Reports
              </Button>
              <Button size="large" block className="btn-accent">
                Manage Users
              </Button>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Recent Activity" className="h-full border-0 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center rounded-lg bg-primary-50 p-3">
                <div className="mr-3 h-2 w-2 rounded-full bg-primary-500"></div>
                <div>
                  <div className="font-medium">New user registered</div>
                  <div className="text-sm text-gray-500">2 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center rounded-lg bg-secondary-50 p-3">
                <div className="mr-3 h-2 w-2 rounded-full bg-secondary-500"></div>
                <div>
                  <div className="font-medium">Order completed</div>
                  <div className="text-sm text-gray-500">5 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center rounded-lg bg-accent-50 p-3">
                <div className="mr-3 h-2 w-2 rounded-full bg-accent-500"></div>
                <div>
                  <div className="font-medium">Payment received</div>
                  <div className="text-sm text-gray-500">10 minutes ago</div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
