import { Admin } from 'pages/Admin';
import { AdminLoginPage } from 'pages/AdminPage';
import { CreativeTask } from 'pages/CreativeTask';
import { FormPage } from 'pages/FormPage';
import { MainPage } from 'pages/MainPage';
import { PersonalPage } from 'pages/PersonalPage';
import { RouteProps } from 'react-router';
import { AppRoutes, RoutePath } from 'shared/config/router';

export type AppRoutesProps = RouteProps;

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: <PersonalPage />
  },
  [AppRoutes.FORM]: {
    path: RoutePath.form,
    element: <FormPage />
  },
  [AppRoutes.CREATIVE_TASK]: {
    path: RoutePath.creative_task,
    element: <CreativeTask />
  },
  [AppRoutes.ADMIN_LOGIN]: {
    path: RoutePath.admin_login,
    element: <AdminLoginPage />
  },
  [AppRoutes.ADMIN]: {
    path: RoutePath.admin,
    element: <Admin />
  }
}