import React, {
  ComponentType, lazy, LazyExoticComponent, ReactNode
} from 'react';


export interface IRoute {
  /** Address */
  path: string;
  /** Matching precision */
  exact: boolean;
  /** Secure route */
  private?: boolean;
  /** ComponentTSX */
  component?: LazyExoticComponent<ComponentType<any>>;
  /** Children routes*/
  routes?: IRoute[];
  /** Redirection*/
  redirect?: string;
  /** Preloader*/
  fallback: NonNullable<ReactNode> | null;
}

export const routes: IRoute[] = [

  {
    path: '/home',
    exact: false,
    private: true,
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
