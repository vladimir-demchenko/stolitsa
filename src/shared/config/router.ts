export enum AppRoutes {
  MAIN = 'main',
  PROFILE = 'profile',
  FORM = 'form',
  CREATIVE_TASK = 'creative_task',
  ADMIN_LOGIN = 'admin_login',
  ADMIN = 'admin',
  ADMIN_USERS = 'admin_users',
  ADMIN_USERS_PROFILE = 'admin_users_profile',
  ADMIN_SHIFTS = 'admin_shifts',
  ADMIN_FAQS = 'admin_faqs'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.FORM]: '/form',
  [AppRoutes.CREATIVE_TASK]: '/task',
  [AppRoutes.ADMIN_LOGIN]: '/admin_login',
  [AppRoutes.ADMIN]: '/admin',
  [AppRoutes.ADMIN_USERS]: '/admin/users',
  [AppRoutes.ADMIN_USERS_PROFILE]: 'admin/users/',
  [AppRoutes.ADMIN_SHIFTS]: 'admin/shifts',
  [AppRoutes.ADMIN_FAQS]: 'admin/faqs'
}