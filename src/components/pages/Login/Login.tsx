
import React from 'react';
import './Login.scss';
import { Button, Input } from 'juicyfront';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { ILogin } from '../../../_store/types/login.types';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useDispatch } from 'react-redux';
import { sendLoginPending } from '../../../_store/actions/login.actions';

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
}).required();

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleSubmit, register, formState } = useForm({
    defaultValues: {} as ILogin,
    resolver: yupResolver(schema)
  });

  const onSubmit = handleSubmit((data) => {


    dispatch(sendLoginPending(data));

  });
  const onClickHandler = () => history.push('./registration');
  return (
    <div className='login__wrapper'>
      <form onSubmit={onSubmit} className='login__form'>
        <div className='login__form-item'>
          <Input defaultValue={'111@mail.ru'} {...register('email')} placeholder='E-mail' invalid={!!formState.errors.email}/>
        </div>
        <div className='login__form-item'>

          <Input defaultValue={'111@mail.ru'} {...register('password')} placeholder='Password' type='password'/>
        </div>
        <div className='login__form-item login__form-buttons'>
          <Button type='submit' > Войти</Button>
          <Button buttonType='secondary' onClick={onClickHandler}> Регистрация</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
