
import React, { useState } from 'react';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore } from './_store';
import intercept from './api/interceptor';
import App from './App';
import { ConnectedRouter } from 'connected-react-router';


intercept();


const Main: React.FC = () => {
  const [history] = useState(createHashHistory());
  const [store] = useState(createStore(history));
  return <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>;


};


export default Main;
