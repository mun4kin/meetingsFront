import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Axios from 'axios-observable';
import { ILogin } from '../types/login.types';
import { IUser } from '../types/registration.types';
// =====================================================================================================================
/** Авторизация в системе */
export const sendLogin = (payload: ILogin): Observable<IUser> => {
  return Axios.post('/users/login', payload).pipe(map(({ data }) => data));
};
// =====================================================================================================================
