import React from 'react';
import { Button, Card, Col, Row, Space, Statistic } from 'antd';
import {
  ArrowUpOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@/utils/constants';
import AppHeader from '@/core/components/Layout/AppHeader';
import { globalMessages } from '@/core/components/messages/common';



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

const Home: React.FC = () => {
  const { t } = useTranslation();


  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <AppHeader 
        title={t(globalMessages.welcomeMessage, { appName: APP_NAME })}
        subtitle={t(globalMessages.appDescription)}
      />

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
    </div>
  );
};

export default Home;
