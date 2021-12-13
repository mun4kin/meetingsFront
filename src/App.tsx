import React, { useEffect } from 'react';
import Router from './router/Router';
import { routes } from './router/config';
import { Notifications } from 'juicyfront';

function App() {
  useEffect(() => {
    console.warn('================================================================');
    console.log(`%c Active application is ${process.env.REACT_APP_ENV}`, 'color:DodgerBlue;font-size:large');
    console.log(`%c ${process.env.REACT_APP_V}`, 'color:red;font-size:large');
    console.warn('================================================================');

  }, []);
  return (
    <div id={ process.env.REACT_APP_NAME }>
      <Router routes={ routes }/>
      <Notifications/>
    </div>
  );
}

export default App;
