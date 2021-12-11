import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';
import { IMeetings } from '../types/meetings.types';
import { getAllMeetingsSuccess, createMeetingSuccess, deleteMeetingSuccess } from '../actions/meetings.actions';

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
    /** Получение всех встреч */
    createTypedHandler(getAllMeetingsSuccess, (_state: IMeetingsState, action: Action<IMeetings[]>): IMeetingsState => {

      return {
        meetings: action.payload,
        isLoaded: true
      };
    }),
    /** Создание встречи */
    createTypedHandler(createMeetingSuccess, (state: IMeetingsState, action: Action<boolean>): IMeetingsState => {

      return { ...state, };
    }),
    /** Удаление встречи */
    createTypedHandler(deleteMeetingSuccess, (state: IMeetingsState, action: Action<boolean>): IMeetingsState => {
      
      return {
      ...state,
      };
    }),
  ],
  initialState
);

export default meetingsReducer;
