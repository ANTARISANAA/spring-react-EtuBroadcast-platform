import React, { useState } from 'react';
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
  DashboardOutlined,
  GlobalOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import appLogo from '../../../assets/app-logo.png';

const { Header, Sider, Content } = AntLayout;
const { Title } = Typography;

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  console.log('Layout component loaded');

  // Language options
  const languageOptions = [
    { key: 'en', label: 'English', flag: '🇺🇸' },
    { key: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  // Menu items
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: t('navigation.home'),
    },
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: t('navigation.dashboard'),
    },
    {
      key: '/students',
      icon: <TeamOutlined />,
      label: t('navigation.students'),
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: t('navigation.profile'),
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: t('navigation.settings'),
    },
  ];

  // User menu items
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: t('navigation.profile'),
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('navigation.settings'),
      onClick: () => navigate('/settings'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('navigation.logout'),
      onClick: () => {
        // Handle logout
        localStorage.removeItem('authToken');
        navigate('/login');
      },
    },
  ];

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
            {collapsed ? '' : 'My App'}
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
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                  John Doe
                </span>
              </Space>
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
