export enum AppRoutes {
  MAIN = 'main',
  PROFILE = 'profile',
  FORM = 'form',
  CREATIVE_TASK = 'creative_task',
  ADMIN_LOGIN = 'admin_login',
  ADMIN = 'admin'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.FORM]: '/form',
  [AppRoutes.CREATIVE_TASK]: '/task',
  [AppRoutes.ADMIN_LOGIN]: '/admin_login',
  [AppRoutes.ADMIN]: '/admin',
}