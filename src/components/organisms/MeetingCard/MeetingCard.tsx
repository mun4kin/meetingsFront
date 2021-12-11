import React from 'react';
import './MeetingCard.scss';
import { IMeetings } from '../../../_store/types/meetings.types';
import moment from 'moment';
import {
  AvatarStatus, Button, Menu, MenuVertical
} from 'juicyfront';


interface IProps {
    data:IMeetings
  setConfirmModal:(n:number)=>void
}

const MeetingCard: React.FC<IProps> = ({ data, setConfirmModal }: IProps) => {


  // -------------------------------------------------------------------------------------------------------------------
  const date = moment(+data.datetime);

  const onDeleteHandler = () => {


    setConfirmModal(data.meetingId);
  };

  const avatars = data.users.map(item =>
    <div key={item.userId} className={'avatars__items'}>
      <AvatarStatus variant={'white'} photo={item.photo} type={item.isCreator ? 'boss' : undefined}/>
    </div>);


  return (
    <div className='card__wrapper'>
      <div className='date__wrapper'>
        <div className='date__time'>{date.format('LT') }</div>
        <div className='date__number'>{date.format('Do MMMM ') }</div>


      </div>

      <div className='text__wrapper'>{data.description}</div>
      <div className='avatars__wrapper'>
        {avatars}
      </div>
      <div className='menu__wrapper'>
        <Menu list={[
          {
            label: 'Удалить',
            handler: onDeleteHandler
          }
        ]}>
          <Button buttonType='icon'>
            <MenuVertical/>
          </Button>
        </Menu>
      </div>
    </div>
  );
};

export default MeetingCard;
