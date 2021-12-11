import { ofType } from 'redux-observable';
import {
  catchError, mergeMap, switchMap
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from 'redux-actions';
import { showErrorMessage } from '../_commonActions/error.actions';

import { sendLogin } from '../services/login.services';
import { sendLoginPending, sendLoginSuccess } from '../actions/login.actions';
import { ILogin } from '../types/login.types';
import { IUser } from '../types/registration.types';
import { push } from 'connected-react-router';

/** Авторизация в системе */
export const sendLoginEffect$ = (actions$: Observable<Action<ILogin>>) =>
  actions$.pipe(
    ofType(sendLoginPending.toString()),
    switchMap(({ payload }) =>
      sendLogin(payload).pipe(
        mergeMap((result: IUser) => [sendLoginSuccess(result), push('/home')]),
        catchError(showErrorMessage)
      ))
  );
