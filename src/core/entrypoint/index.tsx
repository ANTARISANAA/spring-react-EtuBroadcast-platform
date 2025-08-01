import { App as AntApp } from 'antd';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from '@/pages/Auth/Login';
import Home from '@/pages/Home/Home';
import NotFound from '@/pages/NotFound/NotFound';
import Profile from '@/pages/Profile/Profile';
import StudentsPage from '@/pages/Students';
import DefaultErrorBoundary from '../components/errorBoundary/DefaultErrorBoundary';
import { ModalProvider } from '../components/modals';
import ThemeProvider from '../theme';
import LayoutComponent from '@/core/components/Layout/Layout';
import { privateRoutes } from '@/config/privateRoutes';
import { AuthProvider } from '@/core/context/AuthContext';
import { ProtectedRoute } from '@/core/components/ProtectedRoute';

export default function Entrypoint() {
  return (
    <ThemeProvider>
      <DefaultErrorBoundary>
        <AntApp>
          <AuthProvider>
            <ModalProvider>
              <Router>
                <div className="app">
                  <Routes>
                    {/* Public routes */}
                    <Route path={privateRoutes.login.path} element={<Login />} />
                    {/* Protected routes with layout */}
                    <Route path={privateRoutes.home.path} element={
                      <ProtectedRoute>
                        <LayoutComponent />
                      </ProtectedRoute>
                    }>
                      <Route index element={<Home />} />
                      <Route path={privateRoutes.students.path} element={<StudentsPage />} />
                      <Route path={privateRoutes.profile.path} element={<Profile />} />
                    </Route>

                    {/* 404 route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </Router>
            </ModalProvider>
          </AuthProvider>
        </AntApp>
      </DefaultErrorBoundary>
    </ThemeProvider>
  );
}
