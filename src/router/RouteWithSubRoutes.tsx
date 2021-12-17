import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IRoute } from './config';
import { IUser } from '../_store/types/registration.types';
import { useSelector } from 'react-redux';
import { IStore } from '../_store';

const RouteWithSubRoutes = (route: IRoute) => {


  const user: IUser|undefined = useSelector((store: IStore) => store.login.currentUser);

  const renderRoute = (route: IRoute, props: any) => {
    if (route.redirect) {
      return <Redirect to={route.redirect} />;
    }

    if ((route.private && (user)) || !route.private) {
      return route.component && <route.component {...props} routes={route.routes} />;
    }

    return <Redirect to={'/login'} />;
  };

  return (
    <Suspense fallback={route.fallback}>
      <Route path={route.path} render={(props: any) => renderRoute(route, props)} />
    </Suspense>
  );
};

export default RouteWithSubRoutes;
