import React, {
  useEffect, useMemo, useState
} from 'react';
import './NewMeeting.scss';
import {
  AvatarStatus,
  Button, FormGroup, Input
} from 'juicyfront';
import { FormProvider, useForm } from 'react-hook-form';
import { IMeetings } from '../../../_store/types/meetings.types';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import DateControl from '../../atoms/DateControl';
import TimeControl from '../../atoms/TimeControl';
import FindUsers from '../FindUsers';
import { IUser } from '../../../_store/types/registration.types';
import { useDispatch } from 'react-redux';
import { createMeetingPending, updateMeetingPending } from '../../../_store/actions/meetings.actions';
import moment from 'moment';

interface IProps{
  user:IUser
  close:(b:boolean)=>void
  editMeeting: React.MutableRefObject<IMeetings | undefined>
}
const NewMeeting: React.FC<IProps> = ({ user, close, editMeeting }:IProps) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    editMeeting.current ?
      setUsers(editMeeting.current.users) :
      setUsers( [
        {
          ...user,
          isCreator: true
        }
      ]);
  }, [editMeeting]);
  // -------------------------------------------------------------------------------------------------------------------
  const schema = useMemo(() => yup.object({
    name: yup.string().required(),
    date: yup.string().required(),
    time: yup.string().required()
  }).required(), []);


  const form = useForm({
    defaultValues: editMeeting.current ? {
      ...editMeeting.current,
      time: moment( editMeeting.current ?.datetime).add(-1 * new Date().getTimezoneOffset()).format('HH:mm'),
      date: moment( editMeeting.current ?.datetime).add(-1 * new Date().getTimezoneOffset()).format('DD.MM.YYYY'),
    } : {} as IMeetings,
    resolver: yupResolver(schema)
  });

  const { handleSubmit, register, formState } = form;
  // -------------------------------------------------------------------------------------------------------------------
  const onSubmitHandler = handleSubmit((data:IMeetings) => {
    if (data.date && data.time) {
      const [day, month, year] = data.date.split('.');
      const [hours, minutes] = data.time.split(':');
      const result = {
        ...data,
        datetime: new Date(+year, +month - 1, +day, +hours, +minutes, 0).getTime(),
        date: undefined,
        time: undefined,
        users
      };

      if ( editMeeting.current ) {
        editMeeting.current = undefined;
        dispatch(updateMeetingPending(result));
      } else {
        dispatch(createMeetingPending(result));
      }

      close(false);
    }
  });
  // -------------------------------------------------------------------------------------------------------------------
  const onClickHandler = (item:IUser) => {
    !item.isCreator && setUsers(users.filter((i) => i.userId !== item.userId));
  };
  // -------------------------------------------------------------------------------------------------------------------
  const avatarsTsx = users.map(item =>
    <div key={item.userId} className={'avatars__items'} onClick={() => onClickHandler(item)}>
      <AvatarStatus variant={'white'} photo={item.photo} type={item.isCreator ? 'boss' : undefined}/>
    </div>);
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='new-meeting__wrapper'>
      <FormProvider { ...form }>
        <form className='new-meeting__form' onSubmit={onSubmitHandler}>
          <div className='new-meeting__form-item'>
            <FormGroup label='Meeting name' required errorMessage={ formState.errors.name?.message}>
              <Input {...register('name')} placeholder='Meeting name' invalid={!!formState.errors.name}/>
            </FormGroup>
          </div>
          <div className='new-meeting__form-item'>
            <FormGroup label='Meeting description' >
              <Input {...register('description')} placeholder='Meeting description' />
            </FormGroup>
          </div>
          <div className='new-meeting__form-item new-meeting__date'>
            <div className='new-meeting__date-item'>
              <FormGroup label='Meeting description' required errorMessage={ formState.errors.date?.message}>
                <DateControl locale='en' name='date' min={ Date.now() } invalid={!!formState.errors.date} placeholder='Select date'/>
              </FormGroup>
            </div>
            <div className='new-meeting__date-item'>
              <FormGroup label='Meeting description' required errorMessage={ formState.errors.time?.message}>
                <TimeControl name='time' min='08:00' max='18:00' />
              </FormGroup>
            </div>
          </div>
          <div className='new-meeting__people'>
            <div className='new-meeting__people-text'>Participants:</div>
            {avatarsTsx}
          </div>
          <FindUsers setUsers={setUsers} users={users}/>
          <div className='new-meeting__form-item new-meeting__form-buttons'>
            <div className='new-meeting__form-button'>
              <Button fullWidth type='submit' >{editMeeting.current ? 'Update' : 'Create' }</Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default NewMeeting;
