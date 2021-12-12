import React from 'react';
import './CardUser.scss';
import { IUser } from '../../../_store/types/registration.types';
import { AvatarStatus, Tile } from 'juicyfront';


interface IProps {
data:IUser
  type?:'icon',
}

const CardUser: React.FC<IProps> = ({ data, type }: IProps) => {
  return (
    <div className='tile__wrapper'>
      <Tile >
        <div className='tile-content__wrapper'>
          <AvatarStatus size={'xxxl'} type={type} variant={'white'} photo={data.photo} />
          <div>{data.firstName}</div>
          <div>{data.secondName}</div>
        </div>
      </Tile>
    </div>
  );
};

export default CardUser;
