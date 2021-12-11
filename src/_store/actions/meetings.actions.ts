import { createTypedAction } from 'redux-actions-ts';
import { IMeetings } from '../types/meetings.types';

export const getAllMeetingsPending = createTypedAction<void>('[Pending] Получение всех встреч');
export const getAllMeetingsSuccess = createTypedAction<IMeetings[]>('[Success] Получение всех встреч');


export const createMeetingPending = createTypedAction<IMeetings>('[Pending] Создание встречи');
export const createMeetingSuccess = createTypedAction<boolean>('[Success] Создание встречи');

export const deleteMeetingPending = createTypedAction<number>('[Pending] Удаление встречи');
export const deleteMeetingSuccess = createTypedAction<boolean>('[Success] Удаление встречи');
