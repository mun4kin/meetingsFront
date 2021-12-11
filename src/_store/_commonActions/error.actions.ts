import { createTypedAction } from 'redux-actions-ts';
import { of } from 'rxjs';
import { sendNotification } from 'juicyfront';
import { push } from 'connected-react-router';

export const errorAction = createTypedAction<void>('[Error]');

export const showErrorMessage = (e: any) => {
  let message = 'Server unknown error';
  try {
    message = e.response.data.detail;
  } catch (e) {

  }
  sendNotification({
    message,
    variant: 'red',
    title: 'Error'
  });

  if (message === 'User is unauthorized') {
    return of(push('/login'));
  }

  return of(errorAction());
};
