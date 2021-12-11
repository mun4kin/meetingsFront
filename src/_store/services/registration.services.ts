import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Axios from 'axios-observable';
import { IUser } from '../types/registration.types';

/** Регистрация пользователя */
export const registration = (payload: IUser): Observable<boolean> => {
  return Axios.post('/users/registration', payload).pipe(map(( data ) => {

    return true;
  }));
};
