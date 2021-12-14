import { IMeetings } from '../types/meetings.types';

export const meetingMock:IMeetings = {
  meetingId: 1,
  description: 'test_descr',
  name: 'test_name',
  datetime: 1639469624438,
  users: [
    {
      userId: 1,
      firstName: 'first1',
      secondName: 'seecond1',
      email: '111@mail.ru1',
      photo: 'testurl1'
    },
    {
      userId: 2,
      isCreator: true,
      firstName: 'first2',
      secondName: 'seecond2',
      email: '111@mail.ru2',
      photo: 'testurl2'
    }
  ]

};
