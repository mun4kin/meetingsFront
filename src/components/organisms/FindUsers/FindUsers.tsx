import { GhostScreen, Search } from 'juicyfront';
import React from 'react';
import './FindUsers.scss';
import { IDebounceResult } from 'juicyfront/types/projects.types';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersPending } from '../../../_store/actions/users.actions';
import { IUser } from '../../../_store/types/registration.types';
import { IStore } from '../../../_store';
import CardUser from '../../molecules/CardUser';

interface IProps{
  users:IUser[],
  setUsers:(user:IUser[])=>void}

const FindUsers: React.FC<IProps> = ({ setUsers, users }:IProps) => {
  const searchUsers:IUser[] = useSelector((store: IStore) => store.users.collection);
  const dispatch = useDispatch();
  // -------------------------------------------------------------------------------------------------------------------
  const onDebounceHandler = (data:IDebounceResult) => {
    dispatch(getUsersPending(data.debounceString));
  };
  const onClickHandler = (item:IUser) => {
    if (!~users.findIndex((i) => i.userId === item.userId)) {
      setUsers([ ...[item], ...users, ]);
    }
  };
  const usersTSX = searchUsers.map(item => {
    const check = ~users.findIndex((i) => i.userId === item.userId) ? 'icon' : undefined;
    return <div key={item.userId} className={'users__items'} onClick={() => onClickHandler(item)}>
      <CardUser data={item} type={check}/>
    </div>;
  });

  return (
    <div className='find__wrapper'>
      <Search placeholder='Search users ' onDebounce={onDebounceHandler}/>
      <div className='find-results__wrapper'>
        {usersTSX.length ? usersTSX : <GhostScreen/> }
      </div>

    </div>
  );
};

export default FindUsers;
