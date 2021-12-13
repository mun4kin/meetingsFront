import React, {
  useEffect, useRef, useState
} from 'react';
import './Home.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../_store';
import { IUser } from '../../../_store/types/registration.types';
import { deleteMeetingPending, getAllMeetingsPending } from '../../../_store/actions/meetings.actions';
import {
  Avatar,
  Button, Confirm, Edit, Menu, Modal, PageWithSections, Preloader
} from 'juicyfront';
import { IMeetingsState } from '../../../_store/reducers/meetings.reducer';
import { IPageSection } from 'juicyfront/types/projects.types';
import MeetingCard from '../../organisms/MeetingCard';
import { logOff, sendLoginSuccess } from '../../../_store/actions/login.actions';
import NewMeeting from '../../organisms/NewMeeting';
import { IMeetings } from '../../../_store/types/meetings.types';
import { clearUsers } from '../../../_store/actions/users.actions';


const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [showModalMeeting, setShowModalMeeting] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<number>(0);
  const [sections, setSections] = useState<IPageSection[]>([]);
  const history = useHistory();
  const user: IUser|undefined = useSelector((store: IStore) => store.login.currentUser);
  const meetings: IMeetingsState = useSelector((store: IStore) => store.meetings);
  const editMeetings = useRef<IMeetings|undefined>(undefined);

  useEffect(() => {
    dispatch(clearUsers());
  }, [showModalMeeting]);

  // -------------------------------------------------------------------------------------------------------------------
  /** check user's auth*/
  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user');

    if (!user && !sessionUser) {
      history.push('/login');
    } else {
      !user && sessionUser && dispatch(sendLoginSuccess(JSON.parse(sessionUser)));
      dispatch(getAllMeetingsPending());
    }
  }, [user]);
  // -------------------------------------------------------------------------------------------------------------------
  /** creation of main page body*/
  useEffect(() => {
    const basicSect:IPageSection[] = [
      {
        id: 'buttons',
        hideBackground: true,
        withoutTileWrapper: true,
        component: (
          <div className='button_wrapper'>
            <Button onClick={() => {
              setShowModalMeeting(true);
            }} startAdornment={<Edit/>} buttonType='text'> Create a new meeting</Button>
          </div>
        )
      }
    ];

    if (meetings.meetings.length) {

      const sect:IPageSection[] = meetings.meetings.map((item:IMeetings) => {
        /** is user have permission to delete  */
        const isCreater = !!~item.users.findIndex((mUser) => mUser.isCreator && user?.userId === mUser.userId);
        return {
          id: 'meetings-' + item.meetingId,
          title: item.name,
          component: (
            <MeetingCard onChange={onEditMeetingHandler} setConfirmModal={setConfirmModal} data={item} isCreater={isCreater}/>
          )
        };
      });
      setSections([...basicSect, ...sect]);
    } else {
      setSections([...basicSect]);
    }
  }, [meetings]);

  // -------------------------------------------------------------------------------------------------------------------

  const onConfirmActionHandler = () => {
    setConfirmModal(0);
    dispatch(deleteMeetingPending(confirmModal));
  };

  const logOffHandler = () => {
    dispatch(logOff());
  };

  const onEditMeetingHandler = (meeting:IMeetings) => {
    editMeetings.current = meeting;
    setShowModalMeeting(true);
  };
  // -------------------------------------------------------------------------------------------------------------------
  const confirmModalTSX = !!confirmModal &&
    <Modal >
      <Confirm textAccept={'Delete'} onClose={() => setConfirmModal(0)} onAction={onConfirmActionHandler}/>
    </Modal>;
  // -------------------------------------------------------------------------------------------------------------------
  const editMeetingsModalTSX = showModalMeeting &&
      <Modal fullScreen custom onClose={() => setShowModalMeeting(false)}>
        <div className='modal__wrapper'>
          <div className='modal__header'>Create a meeting</div>
          <NewMeeting editMeeting={editMeetings} close={setShowModalMeeting} user={user as IUser} />
        </div>
      </Modal>;
  // -------------------------------------------------------------------------------------------------------------------
  const titleTSX = <div className='page__header'>
    <div>Hi {user?.firstName}! You can plan your meetings.</div>
    <div className='page__header-avatar'>
      <Menu list={[
        {
          label: 'Log off',
          handler: logOffHandler
        }
      ]} position='bottom-end'>
        <Avatar photo={user?.photo}/>
      </Menu>
    </div>
  </div>;
  // -------------------------------------------------------------------------------------------------------------------
  return (
    meetings.isLoaded ?
      <div className='page__wrapper'>
        <PageWithSections
          title={titleTSX}
          showNavigation={false}
          sections={sections}/>
        {editMeetingsModalTSX}
        {confirmModalTSX}
      </div> : <Preloader size='xl'/>
  );
};

export default Home;
