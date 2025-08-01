import React, { useMemo, useState } from 'react';
import {
  Layout as AntLayout,
  Avatar,
  Button,
  Dropdown,
  Menu,
  Space,
  Typography,
  theme,
} from 'antd';
import {
  GlobalOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { privateRoutes } from '@/config/privateRoutes';
import  { appLanguages } from '@/i18n';
import { APP_NAME } from '@/utils/constants';
import appLogo from '../../../assets/app-logo.png';
import { globalMessages } from '../messages/common';
import { useAuth } from '@/core/context/AuthContext';

const { Header, Sider, Content } = AntLayout;
const { Title } = Typography;

// Language options - moved inside component to be reactive to language changes

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, admin } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Language options - moved inside component to be reactive to language changes
  const languageOptions = useMemo(
    () => [
      { key: appLanguages.en, label: t(globalMessages.english), flag: '🇺🇸' },
      { key: appLanguages.fr, label: t(globalMessages.french), flag: '🇫🇷' },
    ],
    [t]
  );

  // Menu items - moved inside component to be reactive to language changes
  const menuItems = useMemo(
    () => [
      {
        key: privateRoutes.home.path,
        icon: <HomeOutlined />,
        label: t(privateRoutes.home.label),
      },
      {
        key: privateRoutes.students.path,
        icon: <TeamOutlined />,
        label: t(privateRoutes.students.label),
      },
      {
        key: privateRoutes.profile.path,
        icon: <UserOutlined />,
        label: t(privateRoutes.profile.label),
      },
    ],
    [t]
  );

  // User menu items
  const userMenuItems = useMemo(
    () => [
      {
        key: privateRoutes.profile.path,
        icon: <UserOutlined />,
        label: t(privateRoutes.profile.label),
        onClick: () => navigate('/profile'),
      },
      {
        type: 'divider' as const,
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: t('auth.signOut'),
        onClick: () => {
          logout();
          navigate(privateRoutes.login.path);
        },
      },
    ],
    [navigate, t, logout]
  );

  // Handle language change
  const handleLanguageChange = ({ key }: { key: string }) => {
    i18n.changeLanguage(key);
  };

  // Handle menu click
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: colorBgContainer,
          borderRight: `1px solid ${colorBgContainer}`,
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{ padding: '16px', textAlign: 'center' }}
        >
          <img
            src={appLogo}
            alt="App Logo"
            style={{
              width: collapsed ? 40 : 64,
              height: collapsed ? 40 : 64,
              marginBottom: 8,
              transition: 'width 0.2s, height 0.2s',
              objectFit: 'contain',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
          <Title
            level={4}
            style={{
              margin: 0,
              color: '#8b5cf6',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {collapsed ? '' : APP_NAME}
          </Title>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ fontFamily: 'Poppins, sans-serif' }}
        />
      </Sider>
      <AntLayout>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${colorBgContainer}`,
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          <Space size="middle">
            {/* Language Selector */}
            <Dropdown
              menu={{
                items: languageOptions.map((lang) => ({
                  key: lang.key,
                  label: (
                    <Space>
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </Space>
                  ),
                })),
                onClick: handleLanguageChange,
              }}
              placement="bottomRight"
            >
              <Button
                type="text"
                icon={<GlobalOutlined />}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {
                  languageOptions.find((lang) => lang.key === i18n.language)
                    ?.flag
                }
              </Button>
            </Dropdown>

            {/* User Menu */}
            <Dropdown
              menu={{
                items: userMenuItems,
              }}
              placement="bottomRight"
            >
              <Button
                type="text"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Avatar
                  size="small"
                  style={{
                    backgroundColor: '#8b5cf6',
                  }}
                >
                  {admin?.fullName?.charAt(0) || 'A'}
                </Avatar>
                <span>{admin?.fullName || 'Admin'}</span>
              </Button>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
