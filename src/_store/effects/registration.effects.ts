import { ofType } from 'redux-observable';
import {
  catchError, map, switchMap
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from 'redux-actions';
import { showErrorMessage } from '../_commonActions/error.actions';
import { IUser } from '../types/registration.types';
import { registration } from '../services/registration.services';
import { registrationPending, registrationSuccess } from '../actions/registration.actions';
import { sendNotification } from 'juicyfront';

/** Регистрация пользователя */
export const registrationEffect$ = (actions$: Observable<Action<IUser>>) =>
  actions$.pipe(
    ofType(registrationPending.toString()),
    switchMap(({ payload }) =>
      registration(payload).pipe(
        map((result: boolean) => {
          sendNotification({
            title: 'Success',
            message: `User ${payload.firstName} ${payload.firstName} has successfully registered`,
            variant: 'green'
          });
          return registrationSuccess(result);
        }),
        catchError(showErrorMessage)
      ))
  );
