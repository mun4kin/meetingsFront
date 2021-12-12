import { createTypedAction } from 'redux-actions-ts';
import { IMeetings } from '../types/meetings.types';

export const getAllMeetingsPending = createTypedAction<void>('[Pending] Receiving all meetings');
export const getAllMeetingsSuccess = createTypedAction<IMeetings[]>('[Success] Receiving all meetings');


export const createMeetingPending = createTypedAction<IMeetings>('[Pending] Meeting creation');
export const createMeetingSuccess = createTypedAction<boolean>('[Success] Meeting creation');

export const deleteMeetingPending = createTypedAction<number>('[Pending] Meeting removing');
export const deleteMeetingSuccess = createTypedAction<boolean>('[Success] Meeting removing');
