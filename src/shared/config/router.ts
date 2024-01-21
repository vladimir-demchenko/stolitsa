export enum AppRoutes {
  MAIN = 'main',
  PROFILE = 'profile',
  FORM = 'form',
  CREATIVE_TASK = 'creative_task'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.FORM]: '/form',
  [AppRoutes.CREATIVE_TASK]: '/task'
}