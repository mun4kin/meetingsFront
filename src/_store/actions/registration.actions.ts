import { createTypedAction } from 'redux-actions-ts';
import { IUser } from '../types/registration.types';

export const registrationPending = createTypedAction<IUser>('[Pending] User registration');
export const registrationSuccess = createTypedAction<boolean>('[Success] User registration');
