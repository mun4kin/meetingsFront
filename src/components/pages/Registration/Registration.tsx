import React from 'react';
import './Registration.scss';
import {
  Button, FormGroup, Input, sendNotification
} from 'juicyfront';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IUser } from '../../../_store/types/registration.types';
import { useDispatch } from 'react-redux';
import { registrationPending } from '../../../_store/actions/registration.actions';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


const schema = yup.object({
  email: yup.string().required().email(),
  firstName: yup.string().required(),
  secondName: yup.string().required(),
  password: yup.string().required(),
  passwordR: yup.string().required(),
}).required();

const Registration: React.FC = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  // -------------------------------------------------------------------------------------------------------------------
  const onClick = () => history.push('./login');


  const { handleSubmit, register, formState } = useForm({
    defaultValues: {} as IUser,
    resolver: yupResolver(schema)
  });
  const onSubmit = handleSubmit((data) => {
    if (data.password !== data.passwordR) {
      sendNotification({
        title: 'Error',
        message: 'Passwords don\'t match',
        variant: 'red'
      });
    } else {
      dispatch(registrationPending(data));
    }

  });
  return (
    <div className='reg__wrapper'>
      <form className='reg_form' onSubmit={onSubmit}>
        <div className='reg__form-item'>
          <FormGroup label='E-mail' required errorMessage={ formState.errors.email?.message}>
            <Input {...register('email')} placeholder='E-mail' invalid={!!formState.errors.email}/>
          </FormGroup>
        </div>
        <div className='reg__form-item' >
          <FormGroup label='First Name' required errorMessage={ formState.errors.firstName?.message}>
            <Input {...register('firstName')} placeholder='First Name' invalid={!!formState.errors.firstName}/>
          </FormGroup>
        </div>
        <div className='reg__form-item' >
          <FormGroup label='Second Name' required errorMessage={ formState.errors.secondName?.message}>
            <Input {...register('secondName')} placeholder='Second Name' invalid={!!formState.errors.secondName}/>
          </FormGroup>
        </div>
        <div className='reg__form-item' >
          <FormGroup label='Photo Link' required>
            <Input {...register('photo')} placeholder='Photo Link' />
          </FormGroup>
        </div>
        <div className='reg__form-item' >
          <FormGroup label='Password' required errorMessage={ formState.errors.password?.message}>
            <Input {...register('password')} placeholder='Password' type='password' invalid={!!formState.errors.password}/>
          </FormGroup>
        </div>
        <div className='reg__form-item'>
          <FormGroup label='Repeat password' required errorMessage={ formState.errors.passwordR?.message}>
            <Input {...register('passwordR')} placeholder='Repeat password' type='password' invalid={!!formState.errors.passwordR}/>
          </FormGroup>
        </div>

        <div className='reg__form-item reg__form-buttons'>
          <div className='reg__form-button'>
            <Button fullWidth type='submit' > Registration</Button>
          </div>
          <div className='reg__form-button'>
            <Button buttonType='secondary' onClick={onClick}> Back</Button>
          </div>
        </div>
      </form>
    </div>


  );
};

export default Registration;
