import { ILogin } from './login.types';

export interface IUser extends ILogin{
  userId?:number;
  firstName?:string;
  secondName?:string;
  passwordR?:string;
  token?:string;
  photo?:string;
  isCreator?:string;
}
