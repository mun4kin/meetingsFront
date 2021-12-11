import { createTypedAction } from 'redux-actions-ts';
import { IUser } from '../types/registration.types';

export const getUsersPending = createTypedAction<string>('[Pending] Получение пользователей');
export const getUsersSuccess = createTypedAction<IUser[]>('[Success] Получение пользователей');
