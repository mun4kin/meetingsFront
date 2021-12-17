import { ofType } from 'redux-observable';
import {
  catchError, map, mergeMap, switchMap
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from 'redux-actions';
import { showErrorMessage } from '../_commonActions/error.actions';

import { sendLogin } from '../services/login.services';
import {
  logOff, sendLoginPending, sendLoginSuccess
} from '../actions/login.actions';
import { ILogin } from '../types/login.types';
import { IUser } from '../types/registration.types';
import { push } from 'connected-react-router';
// =====================================================================================================================
/** User registration  in system*/
export const sendLoginEffect$ = (actions$: Observable<Action<ILogin>>) =>
  actions$.pipe(
    ofType(sendLoginPending.toString()),
    switchMap(({ payload }) =>
      sendLogin(payload).pipe(
        mergeMap((result: IUser) => [sendLoginSuccess(result), push('/home')]),
        catchError(showErrorMessage)
      ))
  );
// =====================================================================================================================
/** User registration  in system*/
export const logOffEffect$ = (actions$: Observable<Action<ILogin>>) =>
  actions$.pipe(
    ofType(logOff.toString()),
    map(() => push('/login'))
  );

// =====================================================================================================================
