import './Messages.css';
import React, { forwardRef } from 'react'
import { Avatar } from '@material-ui/core';
import './Messages.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';

const Messages = forwardRef( ({context},ref) => {
    const user = useSelector(selectUser);
    return (
        <div ref={ref} className={`messages ${user?.uid === context?.uid} && mymessage`}>
            <Avatar  src={context?.photourl} className="messages_avatar" ></Avatar>
    <p>{context?.msg}</p>
    <small>{new Date(context?.time?.toDate()).toLocaleString()}</small>
        </div>
    )
})

export default Messages
