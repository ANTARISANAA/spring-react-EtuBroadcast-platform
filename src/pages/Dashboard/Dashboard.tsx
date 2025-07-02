import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Title level={2}>{t('navigation.dashboard')}</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Analytics Overview">
            <p>Dashboard content will go here with charts and analytics.</p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Performance Metrics">
            <p>Performance metrics and KPIs will be displayed here.</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
