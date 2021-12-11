import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';

import { sendLoginSuccess } from '../actions/login.actions';
import { IUser } from '../types/registration.types';

export interface ILoginState {
  currentUser?: IUser;
}

const initialState: ILoginState = { currentUser: undefined };

const loginReducer = handleTypedActions(
  [
    /** Авторизация в системе */
    createTypedHandler(sendLoginSuccess, (state: ILoginState, action: Action<IUser>): ILoginState => {
      sessionStorage.setItem('user', JSON.stringify( action.payload));
      return {
        ...state,
        currentUser: action.payload
      };
    }),
  ],
  initialState
);

export default loginReducer;
