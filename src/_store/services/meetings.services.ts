import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Axios from 'axios-observable';
import { IMeetings } from '../types/meetings.types';
// =====================================================================================================================
/** Receiving all meetings */
export const getAllMeetings = (token = ''): Observable<IMeetings[]> => {
  return Axios.get('/meeting/all', { headers: { 'authorization': token } })
    .pipe(map(({ data }) => data));
};
// =====================================================================================================================

/** Meeting creation */
export const createMeeting = (payload: IMeetings, token = ''): Observable<boolean> => {
  return Axios.post('/meeting/create', payload, { headers: { 'authorization': token } })
    .pipe(map(() => true));
};
// =====================================================================================================================

/** Meeting removing */
export const deleteMeeting = (payload: number, token = ''): Observable<boolean> => {

  return Axios.post('/meeting/delete', { meetingId: payload }, { headers: { 'authorization': token } })
    .pipe(map(() => true));
};
// =====================================================================================================================
