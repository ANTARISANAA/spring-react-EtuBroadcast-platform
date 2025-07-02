import { ConfigProvider } from 'antd';
import { defaultTheme } from './config';

type ThemeProviderProps = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <ConfigProvider theme={defaultTheme}>{children}</ConfigProvider>;
}
