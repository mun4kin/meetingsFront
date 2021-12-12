import React from 'react';
import './MeetingCard.scss';
import { IMeetings } from '../../../_store/types/meetings.types';
import moment from 'moment';
import {
  AvatarStatus, Button, Menu, MenuVertical
} from 'juicyfront';
import { IListElement } from 'juicyfront/types';


interface IProps {
    data:IMeetings
    setConfirmModal:(n:number)=>void
    isCreater:boolean
}

const MeetingCard: React.FC<IProps> = ({ data, setConfirmModal, isCreater }: IProps) => {


  // -------------------------------------------------------------------------------------------------------------------
  const date = moment(+data.datetime).add(-1 * new Date().getTimezoneOffset());
  const onDeleteHandler = () => {

    setConfirmModal(data.meetingId);
  };

  const avatarsTSX = () => {
    return <>

      { data.users.slice(-3).map(item =>
        <div key={item.userId} className={'avatars__items'}>
          <AvatarStatus variant={'white'} photo={item.photo} type={item.isCreator ? 'boss' : undefined}/>
        </div>)}
      {data.users.length > 3 &&
            <div className='avatars__count'>+{data.users.length - 3}</div>}

    </>;
  };


  const listItems:IListElement[] = [
    {
      label: 'Delete',
      disabled: !isCreater,
      handler: onDeleteHandler
    }
  ];
  return (
    <div className='card__wrapper'>
      <div className='date__wrapper'>
        <div className='date__number'>{date.format('Do  ') }</div>
        <div className='date__part-wrapper'>
          <div className='date__month'>{date.format(' MMMM ') }</div>
          <div className='date__time'>{date.format('dd , LT') }</div>
        </div>
      </div>

      <div className='text__wrapper'>{data.description}</div>
      <div className='avatars__wrapper'>

        {avatarsTSX()}
      </div>
      <div className='menu__wrapper'>
        <Menu list={listItems} position='bottom-end' >
          <Button buttonType='icon' >
            <MenuVertical/>
          </Button>
        </Menu>
      </div>
    </div>
  );
};

export default MeetingCard;
