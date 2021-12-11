import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Axios from 'axios-observable';
import { IUser } from '../types/registration.types';

// =====================================================================================================================
/** Получение пользователей */
export const getUsers = (payload: string, token = ''): Observable<IUser[]> => {
  return Axios.post('/users/all', { search: payload }, { headers: { 'authorization': token } })
    .pipe(map(({ data }) => data));
};
// =====================================================================================================================
