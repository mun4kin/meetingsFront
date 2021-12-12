import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';

import { registrationSuccess } from '../actions/registration.actions';

export interface IUseristrationState {
  isSuccess?: boolean;
}

const initialState: IUseristrationState = { isSuccess: undefined };

const registrationReducer = handleTypedActions(
  [
    /** User's registration */
    createTypedHandler(registrationSuccess, (state: IUseristrationState, action: Action<boolean>): IUseristrationState => {

      return {
        ...state,
        isSuccess: action.payload
      };
    }),
  ],
  initialState
);

export default registrationReducer;
