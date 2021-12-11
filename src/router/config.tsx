import React, {
  ComponentType, lazy, LazyExoticComponent, ReactNode
} from 'react';


export interface IRoute {
  /** Адрес */
  path: string;
  /** Точность совпадения */
  exact: boolean;
  /** Защищенный роут */
  private?: boolean;
  /** Компонент */
  component?: LazyExoticComponent<ComponentType<any>>;
  // /** Для каких ролей доступен данный роут */
  // RoleGuard?: UserRole[];
  /** Дочерние роуты */
  routes?: IRoute[];
  /** Редирект*/
  redirect?: string;
  /** Прелоудер ф*/
  fallback: NonNullable<ReactNode> | null;
}

export const routes: IRoute[] = [

  {
    path: '/home',
    exact: false,
    fallback: <div/>,
    component: lazy(() => import('../components/pages/Home'))
  },
  {
    path: '/login',
    exact: true,
    fallback: <div/>,
    component: lazy(() => import('../components/pages/Login'))
  },
  {
    path: '/registration',
    exact: true,
    fallback: <div/>,
    component: lazy(() => import('../components/pages/Registration'))
  },
  {
    path: '/',
    exact: true,
    fallback: <div/>,
    redirect: '/home'
  },
  {
    path: '*',
    exact: false,
    fallback: <div/>,
    redirect: '/home'
  },
];
