import React, { useEffect, useState } from 'react';
import './Home.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../_store';
import { IUser } from '../../../_store/types/registration.types';
import { deleteMeetingPending, getAllMeetingsPending } from '../../../_store/actions/meetings.actions';
import {
  Button, Calendar, Confirm, Modal, PageWithSections, Preloader
} from 'juicyfront';
import { IMeetingsState } from '../../../_store/reducers/meetings.reducer';
import { IPageSection } from 'juicyfront/types/projects.types';
import MeetingCard from '../../organisms/MeetingCard';
import { sendLoginSuccess } from '../../../_store/actions/login.actions';
import NewMeeting from '../../organisms/NewMeeting';


const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<number>(0);
  const history = useHistory();
  const user: IUser|undefined = useSelector((store: IStore) => store.login.currentUser);
  const meetings: IMeetingsState = useSelector((store: IStore) => store.meetings);
  const [sections, setSections] = useState<IPageSection[]>([]);
  // -------------------------------------------------------------------------------------------------------------------
  useEffect(() => {

    const sessionUser = sessionStorage.getItem('user');

    if (!user && !sessionUser) {
      history.push('/login');
    } else {
      !user && sessionUser && dispatch(sendLoginSuccess(JSON.parse(sessionUser)));
      dispatch(getAllMeetingsPending());
    }

  }, [user]);
  useEffect(() => {
    if (meetings.meetings.length) {
      const basicSect = [
        {
          id: 'buttons',
          hideBackground: true,
          withoutTileWrapper: true,
          component: (
            <div className='button_wrapper'>
              <Button onClick={() => {
                setModal(true);
              }} startAdornment={<Calendar/>} buttonType='text'> Create a new meeting</Button>
            </div>
          )
        }
      ];
      const sect = meetings.meetings.map((item:any) => {
        return {
          id: 'meetings-' + item.meetingId,
          title: item.name,
          component: (

            <MeetingCard setConfirmModal={setConfirmModal} data={item}/>
          )
        };
      });
      setSections([...basicSect, ...sect]);
    }
  }, [meetings]);

  const newMeetingsModalTSX = modal &&
    <Modal header='Create a meeting' onClose={() => setModal(false)}>
      <NewMeeting close={setModal} user={user as IUser} />
    </Modal>;


  const onActionHandler = () => {
    setConfirmModal(0);
    dispatch(deleteMeetingPending(confirmModal));
  };
  const confirmModalTSX = !!confirmModal &&
    <Modal >
      <Confirm textAccept={'Delete'} onAction={onActionHandler}/>
    </Modal>;


  return (
    meetings.isLoaded ?
      <div className='page__wrapper'>
        <PageWithSections
          title={`Hi ${user?.firstName}! You can plan your meetings.`}
          showNavigation={false}
          sections={sections}/>
        {newMeetingsModalTSX}
        {confirmModalTSX}

      </div> : <Preloader size='xl'/>
  );
};

export default Home;
