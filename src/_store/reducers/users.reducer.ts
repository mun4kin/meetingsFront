import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';
import { IUser } from '../types/registration.types';
import { getUsersSuccess } from '../actions/users.actions';

export interface IUsersState {
  collection: IUser[];
}

const initialState: IUsersState = { collection: [] };

const usersReducer = handleTypedActions(
  [
    /** Receiving all users */
    createTypedHandler(getUsersSuccess, (state: IUsersState, action: Action<IUser[]>): IUsersState => {

      return {
        ...state,
        collection: action.payload
      };
    }),
  ],
  initialState
);

export default usersReducer;
