import React, { useState } from 'react';
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
import { createMeetingPending } from '../../../_store/actions/meetings.actions';

const schema = yup.object({
  name: yup.string().required(),
  date: yup.string().required(),
  time: yup.string().required()
}).required();

interface IProps{
  user:IUser
  close:(b:boolean)=>void
}
const NewMeeting: React.FC<IProps> = ({ user, close }:IProps) => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {} as IMeetings,
    resolver: yupResolver(schema)
  });
  const { handleSubmit, register, formState } = form;
  const [users, setUsers] = useState<IUser[]>([
    {
      ...user,
      isCreator: true
    }
  ]);
  // -------------------------------------------------------------------------------------------------------------------
  const onSubmit = handleSubmit((data:IMeetings) => {
    if (data.date && data.time) {
      const [day, month, year] = data.date.split('.');
      const [hours, minutes] = data.time.split(':');
      dispatch(createMeetingPending({
        ...data,
        datetime: new Date(+year, +month, +day, +hours, +minutes, 0).getTime(),
        date: undefined,
        time: undefined,
        users
      }));
      close(false);
    }
  });
  // -------------------------------------------------------------------------------------------------------------------
  const avatarsTsx = users.map(item =>
    <div key={item.userId} className={'avatars__items'}>
      <AvatarStatus variant={'white'} photo={item.photo} type={item.isCreator ? 'boss' : undefined}/>
    </div>);
  // -------------------------------------------------------------------------------------------------------------------
  return (
    <div className='new-meeting__wrapper'>
      <FormProvider { ...form }>
        <form className='new-meeting__form' onSubmit={onSubmit}>
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
              <Button fullWidth type='submit' > Create</Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>


  );
};

export default NewMeeting;
