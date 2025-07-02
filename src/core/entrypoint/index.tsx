import { App as AntApp, Layout } from 'antd';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Home from '@/pages/Home/Home';
import NotFound from '@/pages/NotFound/NotFound';
import Profile from '@/pages/Profile/Profile';
import Settings from '@/pages/Settings/Settings';
import StudentsPage from '@/pages/Students';
import DefaultErrorBoundary from '../components/errorBoundary/DefaultErrorBoundary';
import { ModalProvider } from '../components/modals';
import ThemeProvider from '../theme';

export default function Entrypoint() {
  return (
    <ThemeProvider>
      <DefaultErrorBoundary>
        <AntApp>
          <ModalProvider>
            <Router>
              <div className="app">
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected routes with layout */}
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="students" element={<StudentsPage />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>

                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </Router>
          </ModalProvider>
        </AntApp>
      </DefaultErrorBoundary>
    </ThemeProvider>
  );
}
