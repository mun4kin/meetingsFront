import React from 'react';
import Router from './router/Router';
import { routes } from './router/config';
import { Notifications } from 'juicyfront';

function App() {
  return (
    <div id={ process.env.REACT_APP_NAME }>
      <Router routes={ routes }/>
      <Notifications/>
    </div>
  );
}

export default App;
