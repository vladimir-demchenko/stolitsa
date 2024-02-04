import { Admin } from 'pages/Admin';
import { AdminFAQs } from 'pages/AdminFAQs';
import { AdminLoginPage } from 'pages/AdminPage';
import { AdminShifts } from 'pages/AdminShifts';
import { AdminUserProfile } from 'pages/AdminUsersProfile';
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
  },
  [AppRoutes.ADMIN_USERS]: {
    path: RoutePath.admin_users,
    element: <Admin />,
    authOnly: true,
    role: 'admin'
  },
  [AppRoutes.ADMIN_USERS_PROFILE]: {
    path: `${RoutePath.admin_users_profile}:id`,
    element: <AdminUserProfile />,
    authOnly: true,
    role: 'admin'
  },
  [AppRoutes.ADMIN_FAQS]: {
    path: RoutePath.admin_faqs,
    element: <AdminFAQs />,
    authOnly: true,
    role: 'admin'
  },
  [AppRoutes.ADMIN_SHIFTS]: {
    path: RoutePath.admin_shifts,
    element: <AdminShifts />,
    authOnly: true,
    role: 'admin'
  }
}