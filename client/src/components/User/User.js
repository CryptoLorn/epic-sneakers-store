import React from 'react';
import {useDispatch} from "react-redux";
import {FaEdit, FaTrashAlt, FaCheck, FaTimes} from "react-icons/fa";

import "./User.css";
import {deleteUserById, userToUpdate} from "../../store/slices/user.slice";
import {ACTIVATED} from "../../constants/status.enum";

const User = ({user}) => {
    const {id, email, is_activated, role, status} = user;
    const dispatch = useDispatch();

    const deleteUser = (id) => {
        dispatch(deleteUserById({id}));
    }

    return (
        <div>
            <div key={id} className={'user_details'}>
                <div>
                    <b>Email:</b> {email}
                    {is_activated === true ?
                        <FaCheck className={'user_details_activated'} title={'confirmed'}/>
                        :
                        <FaTimes className={'user_details_unactivated'} title={'not confirmed'}/>}
                    <br/>
                    <b>Role:</b> {role}
                    <br/>
                    <b>Status:</b>
                    <span className={status === ACTIVATED
                        ?
                        'user_details_activated'
                        :
                        'user_details_unactivated'}
                    >
                                {status}
                            </span>
                    <br/>
                </div>
                <div>
                    <div
                        className={'user_edit'}
                        onClick={() => dispatch(userToUpdate(user))}
                    >
                        <FaEdit/>
                    </div>
                    <div
                        className={'user_delete'}
                        onClick={() => deleteUser(id)}
                    >
                        <FaTrashAlt/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;