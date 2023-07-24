import React from 'react';
import {useDispatch} from 'react-redux';
import { FaTimes, FaTelegramPlane } from 'react-icons/fa';

import './Message.css';
import {setMessageVisible} from '../../../store/slices/visible.slice';

const Message = () => {
    const dispatch = useDispatch();

    return (
        <div className={'message_wrapper'}>
            <div className={'message_body'}>
                <div className={'message_body_top'}>
                    <span>Try Telegram bot </span>
                    <span>
                        <a href={'https://t.me/epicsneakersbot'} target="_blank">
                            <FaTelegramPlane/> Open
                        </a>
                    </span>
                </div>

                <div className={'message_body_bottom'}>
                    Order easily and quickly!
                </div>
            </div>
            <div className={'message_header'} onClick={() => dispatch(setMessageVisible(false))}>
                <FaTimes/>
            </div>
        </div>
    );
};

export default Message;