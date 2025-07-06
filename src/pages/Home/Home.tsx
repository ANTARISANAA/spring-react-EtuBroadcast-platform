import React from 'react';
import { Avatar, Card, Col, Row, Typography } from 'antd';
import {
  BellOutlined,
  BookOutlined,
  PlusOutlined,
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { privateRoutes } from '@/config/privateRoutes';
import AppHeader from '@/core/components/Layout/AppHeader';
import { globalMessages } from '@/core/components/messages/common';
import { APP_NAME } from '@/utils/constants';
import { messages } from './messages';

const { Title, Paragraph } = Typography;

const quickActions = [
  {
    titleKey: messages.addNewStudent,
    descriptionKey: messages.addNewStudentDescription,
    icon: <PlusOutlined />,
    color: '#52c41a',
    action: 'add',
  },
  {
    titleKey: messages.searchStudents,
    descriptionKey: messages.searchStudentsDescription,
    icon: <SearchOutlined />,
    color: '#1890ff',
    action: 'search',
  },
  {
    titleKey: messages.sendInvitation,
    descriptionKey: messages.sendInvitationDescription,
    icon: <BellOutlined />,
    color: '#722ed1',
    action: 'invite',
  },
];

const systemOverviewItems = [
  {
    titleKey: messages.studentManagement,
    descriptionKey: messages.studentManagementDescription,
    icon: <BookOutlined />,
    color: '#1890ff',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-500',
  },
  {
    titleKey: messages.invitationSystem,
    descriptionKey: messages.invitationSystemDescription,
    icon: <BellOutlined />,
    color: '#722ed1',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-500',
  },
  {
    titleKey: messages.studentCommunication,
    descriptionKey: messages.studentCommunicationDescription,
    icon: <TeamOutlined />,
    color: '#52c41a',
    bgColor: 'bg-green-50',
    textColor: 'text-green-500',
  },
];

const guideSteps = [
  {
    titleKey: messages.step1Title,
    descriptionKey: messages.step1Description,
    icon: <UserOutlined />,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-500',
  },
  {
    titleKey: messages.step2Title,
    descriptionKey: messages.step2Description,
    icon: <BellOutlined />,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-500',
  },
  {
    titleKey: messages.step3Title,
    descriptionKey: messages.step3Description,
    icon: <TeamOutlined />,
    bgColor: 'bg-green-100',
    textColor: 'text-green-500',
  },
];

const keyFeatures = [
  messages.studentDatabaseManagement,
  messages.bulkInvitationSending,
  messages.individualStudentInvitations,
  messages.responseTracking,
  messages.contactInformationManagement,
];

const useCases = [
  messages.courseRegistrationInvitations,
  messages.academicEventNotifications,
  messages.welcomeMessagesForNewStudents,
  messages.importantAnnouncements,
  messages.followUpCommunications,
];

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <AppHeader
        title={t(globalMessages.welcomeMessage, { appName: APP_NAME })}
        subtitle={t(globalMessages.appDescription)}
      />

      {/* Project Description */}
      <Card title={t(messages.aboutEduBroadcast)} className="shadow-sm">
        <div className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <Title level={4}>{t(messages.projectDescription)}</Title>
            <Paragraph className="text-gray-700">
              {t(messages.projectDescriptionText)}
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-blue-50 p-4">
              <Title level={5} className="text-blue-700">
                {t(messages.keyFeatures)}
              </Title>
              <ul className="space-y-2 text-gray-700">
                {keyFeatures.map((feature, index) => (
                  <li key={index}>• {t(feature)}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 p-4">
              <Title level={5} className="text-green-700">
                {t(messages.useCases)}
              </Title>
              <ul className="space-y-2 text-gray-700">
                {useCases.map((useCase, index) => (
                  <li key={index}>• {t(useCase)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card title={t(messages.quickActions)} className="shadow-sm">
        <Row gutter={[16, 16]}>
          {quickActions.map((action, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                className="cursor-pointer text-center transition-all duration-200 hover:shadow-md"
                onClick={() =>
                  (window.location.href = privateRoutes.students.path)
                }
              >
                <div
                  className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-xl text-white"
                  style={{ backgroundColor: action.color }}
                >
                  {action.icon}
                </div>
                <Title level={5} className="mb-2">
                  {t(action.titleKey)}
                </Title>
                <Paragraph className="text-sm text-gray-600">
                  {t(action.descriptionKey)}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* System Overview */}
      <Card title={t(messages.systemOverview)} className="shadow-sm">
        <div className="space-y-4">
          {systemOverviewItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between rounded-lg ${item.bgColor} p-3`}
            >
              <div className="flex items-center">
                <div className={`mr-3 text-xl ${item.textColor}`}>
                  {item.icon}
                </div>
                <div>
                  <div className="font-medium">{t(item.titleKey)}</div>
                  <div className="text-sm text-gray-600">
                    {t(item.descriptionKey)}
                  </div>
                </div>
              </div>
              <div className={`font-medium ${item.textColor}`}>
                {t(messages.active)}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* How to Send Invitations Guide */}
      <Card title={t(messages.howToSendInvitations)} className="shadow-sm">
        <Row gutter={[16, 16]}>
          {guideSteps.map((step, index) => (
            <Col xs={24} md={8} key={index}>
              <div className="p-4 text-center">
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${step.bgColor}`}
                >
                  <div className={`text-2xl ${step.textColor}`}>
                    {step.icon}
                  </div>
                </div>
                <Title level={5}>{t(step.titleKey)}</Title>
                <Paragraph className="text-gray-600">
                  {t(step.descriptionKey)}
                </Paragraph>
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default Home;
