import React from 'react';
import { Typography, Space, Tag } from 'antd';
import { APP_NAME, APP_VERSION } from '@/utils/constants';
import i18n from '@/i18n';
import { globalMessages } from '../messages/common';

const { Title, Text } = Typography;

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  title = APP_NAME, 
  subtitle = i18n.t(globalMessages.appDescription)
}) => {
  return (
    <div className="mb-6">
      <Space direction="vertical" size="small" className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <Title level={2} style={{ margin: 0, color: '#8b5cf6' }}>
              {title}
            </Title>
            <Text type="secondary" className="text-base">
              {subtitle}
            </Text>
          </div>
          <Tag color="purple" className="text-xs">
            v{APP_VERSION}
          </Tag>
        </div>
      </Space>
    </div>
  );
};

export default AppHeader; 