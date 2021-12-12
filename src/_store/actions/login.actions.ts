import { createTypedAction } from 'redux-actions-ts';
import { ILogin } from '../types/login.types';
import { IUser } from '../types/registration.types';


export const sendLoginPending = createTypedAction<ILogin>('[Pending] Авторизация в системе');
export const sendLoginSuccess = createTypedAction<IUser>('[Success] Авторизация в системе');


export const logOff = createTypedAction<void>('Выход пользователя');
