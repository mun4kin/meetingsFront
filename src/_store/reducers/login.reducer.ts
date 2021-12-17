import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';

import { sendLoginSuccess, logOff } from '../actions/login.actions';
import { IUser } from '../types/registration.types';


export interface ILoginState {
  currentUser?: IUser;
}
const init = ():IUser|undefined => {
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : undefined;
};


const initialState: ILoginState = { currentUser: init() };

const loginReducer = handleTypedActions(
  [
    /** User registration  in system*/
    createTypedHandler(sendLoginSuccess, (state: ILoginState, action: Action<IUser>): ILoginState => {
      sessionStorage.setItem('user', JSON.stringify( action.payload));
      return {
        ...state,
        currentUser: action.payload
      };
    }),
    /** User logout */
    createTypedHandler(logOff, ( ): ILoginState => {
      sessionStorage.removeItem('user');
      return { ...initialState };
    }),
  ],
  initialState
);

export default loginReducer;
