import { createTypedAction } from 'redux-actions-ts';
import { IUser } from '../types/registration.types';

export const getUsersPending = createTypedAction<string>('[Pending] Receiving all users');
export const getUsersSuccess = createTypedAction<IUser[]>('[Success] Receiving all users');


export const clearUsers = createTypedAction<void>('[Success] clear start');
