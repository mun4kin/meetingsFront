import { createTypedAction } from 'redux-actions-ts';
import { IUser } from '../types/registration.types';

export const registrationPending = createTypedAction<IUser>('[Pending] Регистрация пользователя');
export const registrationSuccess = createTypedAction<boolean>('[Success] Регистрация пользователя');
