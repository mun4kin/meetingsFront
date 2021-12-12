import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';
import { IUser } from '../types/registration.types';
import { clearUsers, getUsersSuccess } from '../actions/users.actions';

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
    /** clear users */
    createTypedHandler(clearUsers, (): IUsersState => initialState),


  ],
  initialState
);

export default usersReducer;
