import { Admin } from 'pages/Admin';
import { AdminLoginPage } from 'pages/AdminPage';
import { CreativeTask } from 'pages/CreativeTask';
import { FormPage } from 'pages/FormPage';
import { MainPage } from 'pages/MainPage';
import { PersonalPage } from 'pages/PersonalPage';
import { RouteProps } from 'react-router';
import { AppRoutes, RoutePath } from 'shared/config/router';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  role?: string;
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: <PersonalPage />,
    authOnly: true
  },
  [AppRoutes.FORM]: {
    path: RoutePath.form,
    element: <FormPage />,
    authOnly: true
  },
  [AppRoutes.CREATIVE_TASK]: {
    path: RoutePath.creative_task,
    element: <CreativeTask />,
    authOnly: true
  },
  [AppRoutes.ADMIN_LOGIN]: {
    path: RoutePath.admin_login,
    element: <AdminLoginPage />
  },
  [AppRoutes.ADMIN]: {
    path: RoutePath.admin,
    element: <Admin />,
    authOnly: true,
    role: 'admin'
  }
}