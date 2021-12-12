import { createTypedAction } from 'redux-actions-ts';
import { ILogin } from '../types/login.types';
import { IUser } from '../types/registration.types';


export const sendLoginPending = createTypedAction<ILogin>('[Pending] Authorization in the system');
export const sendLoginSuccess = createTypedAction<IUser>('[Success] Authorization in the system');


export const logOff = createTypedAction<void>('User logout');
