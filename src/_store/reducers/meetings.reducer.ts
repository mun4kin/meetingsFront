import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';
import { IMeetings } from '../types/meetings.types';
import { getAllMeetingsSuccess } from '../actions/meetings.actions';
import { logOff } from '../actions/login.actions';

export interface IMeetingsState {
  meetings: IMeetings[];
  isLoaded:boolean
}

const initialState: IMeetingsState = {
  meetings: [],
  isLoaded: false
};

const meetingsReducer = handleTypedActions(
  [
    /** Receiving all meetings */
    createTypedHandler(getAllMeetingsSuccess, (_state: IMeetingsState, action: Action<IMeetings[]>): IMeetingsState => {
      return {
        meetings: action.payload,
        isLoaded: true
      };
    }),
    /** User logout */
    createTypedHandler(logOff, ( ): IMeetingsState => {
      sessionStorage.removeItem('user');
      return { ...initialState };
    }),
  ],
  initialState
);

export default meetingsReducer;
