import { ofType, StateObservable } from 'redux-observable';
import {
  catchError, map, switchMap
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from 'redux-actions';
import { showErrorMessage } from '../_commonActions/error.actions';
import { IUser } from '../types/registration.types';
import { getUsers } from '../services/users.services';
import { getUsersPending, getUsersSuccess } from '../actions/users.actions';
import { IStore } from '../index';
// =====================================================================================================================
/** Получение пользователей */
export const getUsersEffect$ = (actions$: Observable<Action<string>>, store$: StateObservable<IStore>) =>
  actions$.pipe(
    ofType(getUsersPending.toString()),
    switchMap(({ payload }) =>
      getUsers(payload, store$.value.login.currentUser?.token).pipe(
        map((result: IUser[]) => getUsersSuccess(result)),
        catchError(showErrorMessage)
      ))
  );
// =====================================================================================================================
