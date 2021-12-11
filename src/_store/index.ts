import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {
  applyMiddleware, combineReducers, createStore as createReduxStore
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import loginReducer, { ILoginState } from './reducers/login.reducer';
import { sendLoginEffect$ } from './effects/login.effects';
import registrationReducer, { IUseristrationState } from './reducers/registration.reducer';
import { registrationEffect$ } from './effects/registration.effects';

import { History } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import meetingsReducer, { IMeetingsState } from './reducers/meetings.reducer';
import {
  getAllMeetingsEffect$, createMeetingEffect$, deleteMeetingEffect$
} from './effects/meetings.effects';
import usersReducer, { IUsersState } from './reducers/users.reducer';
import { getUsersEffect$ } from './effects/users.effects';
// =====================================================================================================================
export interface IStore {
  login: ILoginState;
  registration: IUseristrationState;
  meetings: IMeetingsState;
  users: IUsersState;

  /* [types:end] */
}

// =====================================================================================================================
/** Register reducers */
export const createReducers = (history: History<unknown>) => combineReducers({
  router: connectRouter(history),
  login: loginReducer,
  meetings: meetingsReducer,
  users: usersReducer,
  registration: registrationReducer,
  /* [reducers:end] */
});
// =====================================================================================================================
/** Create store */
export const createStore = (history: History<unknown>) => {
  const observableMiddleware = createEpicMiddleware();

  const store = createReduxStore(
    createReducers(history),
    composeWithDevTools(applyMiddleware(observableMiddleware, routerMiddleware(history)))
  );

  /** Register effects */
  // @ts-ignore
  observableMiddleware.run(combineEpics(
    // @ts-ignore
    sendLoginEffect$,
    getAllMeetingsEffect$,
    getUsersEffect$,
    createMeetingEffect$,
    deleteMeetingEffect$,
    registrationEffect$,
    /* [effects:end] */
  ));
  // =====================================================================================================================
  return store;
};
