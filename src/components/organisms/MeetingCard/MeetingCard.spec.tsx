import {fireEvent, getByText, render, screen,waitFor} from '@testing-library/react';
import React from 'react';
import MeetingCard from "./MeetingCard";
import {meetingMock} from "../../../_store/mocks/meeting.mock";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import {byRole, byText} from "testing-library-selector";

describe('Test <MeetingCard/> component', () => {
    //======================================================
   const  onChange=jest.fn()
    const setConfirmModal=jest.fn()
    const date = moment(+meetingMock.datetime).add(-1 * new Date().getTimezoneOffset());
    //------------------------------------------------------------------------------------------------------------------
    it('Should render with correct texts', () => {
        const {container} =render(<MeetingCard data={meetingMock} setConfirmModal={setConfirmModal} isCreater={false} onChange={onChange}/> );
        expect(container.getElementsByClassName('card__wrapper')).toHaveLength(1)
        expect(byText( 'test_descr')).toBeTruthy();
        expect(byText( date.format('Do'))).toBeTruthy();
        expect(byText( date.format('MMMM') )).toBeTruthy();
        expect(date.format('dd , LT')).toBeTruthy();
    });
    //------------------------------------------------------------------------------------------------------------------
    it('Check users', async () =>  {
        const {container} =render(<MeetingCard data={meetingMock} setConfirmModal={setConfirmModal} isCreater={false} onChange={onChange}/> );
        expect(container.getElementsByClassName('avatars__items')).toHaveLength(2)
        expect(container.getElementsByClassName('rf-avatar-status__sticker')).toHaveLength(1)
        expect(container.getElementsByClassName('avatars__count')).toHaveLength(0)

        })
    //------------------------------------------------------------------------------------------------------------------
    it('Check menu and mouseEnter', async () =>  {
        //we have portal element since it must be rendered with { container: document.body }
        const {container} =render(<MeetingCard data={meetingMock} setConfirmModal={setConfirmModal} isCreater={true} onChange={onChange}/>);

        expect(container.getElementsByClassName('menu__wrapper')).toHaveLength(1)
        expect(screen.getByTestId('rf-menu')).toBeInTheDocument();
        fireEvent.mouseEnter(container.getElementsByClassName('rf-avatar-status')[0])
        await waitFor(() =>{
            expect(screen.getByTestId('email')).toBeTruthy();
        })
        userEvent.click(byRole("button").get())
        await waitFor(() =>{
            expect(screen.queryByText('Delete')).toBeTruthy();
            expect(screen.queryByText('Edit')).toBeTruthy();
        })
      userEvent.click(screen.getAllByText('Delete')[0])
        expect(setConfirmModal).toHaveBeenCalled();
        userEvent.click(byRole("button").get())

        await waitFor(() =>{
            expect(screen.queryByText('Delete')).toBeTruthy();
            expect(screen.queryByText('Edit')).toBeTruthy();
        })
        userEvent.click(screen.getAllByText('Edit')[0])
        expect(onChange).toHaveBeenCalled();
    })
    //------------------------------------------------------------------------------------------------------------------
    it('Check disabled menu', async () =>  {
        render(<MeetingCard data={meetingMock} setConfirmModal={setConfirmModal} isCreater={false} onChange={onChange}/>);
        userEvent.click(byRole("button").get())
        await waitFor(() =>{
            expect(screen.queryByText('Delete')).toBeInTheDocument();
            expect(screen.queryByText('Edit')).toBeInTheDocument();
        })
        expect(() =>userEvent.click(screen.getAllByText('Delete')[0])).toThrow()
        expect(() =>userEvent.click(screen.getAllByText('Edit')[0])).toThrow()
    })

})

