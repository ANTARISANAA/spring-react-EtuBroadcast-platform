import { theme } from 'antd';

export const colors = {
  primary: {
    main: '#B60F22',
    light: '#fafbfc',
    success: '#d4edda',
    error: '#f8eced',
  },
  secondary: {
    main: '#F6C249',
  },
  text: {
    main: '#2F2F2F',
    lightGrey: '#828282',
    darkGreen: '#000c',
    error: '#79494d',
  },
};

export const defaultTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#8b5cf6', // Purple primary
    colorSuccess: '#10b981', // Green
    colorWarning: '#f59e0b', // Amber
    colorError: '#ef4444', // Red
    colorInfo: '#0ea5e9', // Sky blue
    borderRadius: 12,
    fontFamily: 'Poppins, system-ui, sans-serif',
    fontSize: 14,
  },
  components: {
    Button: {
      borderRadius: 12,
      controlHeight: 44,
      fontWeight: 500,
    },
    Input: {
      borderRadius: 12,
      controlHeight: 44,
    },
    Card: {
      borderRadius: 16,
      boxShadow:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    Menu: {
      borderRadius: 12,
      itemBorderRadius: 8,
    },
    Layout: {
      headerBg: '#ffffff',
      siderBg: '#ffffff',
    },
  },
};

// need thos for customization in  https://ant.design/theme-editor
