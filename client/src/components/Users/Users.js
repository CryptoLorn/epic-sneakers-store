import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";

import "./Users.css";
import {getAllUsers, updateUserById, userToUpdate} from "../../store/slices/user.slice";
import {ADMIN, USER} from "../../constants/role.enum";
import {EditUserValidator} from "../../validators/editUser.validator";
import {ACTIVATED, UNACTIVATED} from "../../constants/status.enum";
import User from "../User/User";

const Users = () => {
    const {user} = useSelector(state => state.authReducer);
    const {users, userForUpdate, error} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const {handleSubmit, register, setValue, reset, formState: {errors}} = useForm({resolver: joiResolver(EditUserValidator)});

    useEffect(() => {
        dispatch(getAllUsers({id: user.id}));

        if (userForUpdate) {
            setValue('email', userForUpdate.email);
            setValue('role', userForUpdate.role);
            setValue('status', userForUpdate.status);
        }
    }, [userForUpdate])

    const updateUser = async (email, role, status) => {
        await dispatch(updateUserById({id: userForUpdate.id, user: email, role, status}));
        dispatch(userToUpdate(null));
        reset();
    }

    return (
        <div>
            <div className={'user_wrapper'}>
                <form className={userForUpdate ? '' : 'hidden'}>
                    <input type={'email'} {...register('email')}/>
                    {errors.email && <span className={'validation'}>{errors.email.message}</span>}
                    <br/>
                    <select {...register('role')}>
                        <option value={ADMIN}>ADMIN</option>
                        <option value={USER}>USER</option>
                    </select>
                    <br/>
                    <select {...register('status')}>
                        <option value={ACTIVATED}>ACTIVATED</option>
                        <option value={UNACTIVATED}>UNACTIVATED</option>
                    </select>
                    {errors.role && <span className={'validation'}>{errors.role.message}</span>}<br/>
                    <div className={'user_edit_button'} onClick={handleSubmit(updateUser)}>Update</div>
                </form>
                {error&& <span className={'validation'}>{error}</span>}

                {users.map(user => <User key={user.id} user={user}/>)}
            </div>
        </div>
    );
};

export default Users;