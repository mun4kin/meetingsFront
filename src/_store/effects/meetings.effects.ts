import { ofType, StateObservable } from 'redux-observable';
import {
  catchError, map, mergeMap, switchMap
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from 'redux-actions';
import { showErrorMessage } from '../_commonActions/error.actions';
import { IMeetings } from '../types/meetings.types';
import {
  getAllMeetings, createMeeting, deleteMeeting
} from '../services/meetings.services';
import {
  getAllMeetingsPending, getAllMeetingsSuccess, createMeetingPending, createMeetingSuccess,
  deleteMeetingPending, deleteMeetingSuccess
} from '../actions/meetings.actions';
import { IStore } from '../index';
import { sendNotification } from 'juicyfront';

// =====================================================================================================================
/** Получение всех встреч */
export const getAllMeetingsEffect$ = (actions$: Observable<Action<void>>, store$: StateObservable<IStore>) =>
  actions$.pipe(
    ofType(getAllMeetingsPending.toString()),
    switchMap(() =>
      getAllMeetings(store$.value.login.currentUser?.token).pipe(
        map((result: IMeetings[]) => getAllMeetingsSuccess(result)),
        catchError(showErrorMessage)
      ))
  );

// =====================================================================================================================
/** Создание встречи */
export const createMeetingEffect$ = (actions$: Observable<Action<IMeetings>>, store$: StateObservable<IStore>) =>
  actions$.pipe(
    ofType(createMeetingPending.toString()),
    switchMap(({ payload }) =>
      createMeeting(payload, store$.value.login.currentUser?.token).pipe(
        mergeMap((result: boolean) => {
          sendNotification({
            message: 'A new meeting has been successfully created',
            variant: 'green',
            title: 'Success'
          });
          return [createMeetingSuccess(result), getAllMeetingsPending()];
        }),
        catchError(showErrorMessage)
      ))
  );
// =====================================================================================================================
/** Удаление встречи */
export const deleteMeetingEffect$ = (actions$: Observable<Action<number>>, store$: StateObservable<IStore>) =>
  actions$.pipe(
    ofType(deleteMeetingPending.toString()),
    switchMap(({ payload }) =>
      deleteMeeting(payload, store$.value.login.currentUser?.token).pipe(
        mergeMap((result: boolean) => {

          sendNotification({
            message: 'The meeting has been successfully deleted',
            variant: 'green',
            title: 'Success'
          });
          return [deleteMeetingSuccess(result), getAllMeetingsPending()];
        }),
        catchError(showErrorMessage)
      ))
  );
// =====================================================================================================================
