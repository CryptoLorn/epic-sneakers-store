import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import {FaCheckCircle} from "react-icons/fa";

import './RestorePasswordPage.css';
import {restorePassword} from "../../store/slices/user.slice";
import {PasswordValidator} from "../../validators/password.validator";

const RestorePasswordPage = () => {
    const {error, message} = useSelector(state => state.userReducer);
    const [compareMessage, setCompareMessage] = useState(null);
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: joiResolver(PasswordValidator)});
    const {token} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = (data) => {
        let password;

        if (data.password !== data.confirm_password) {
            setCompareMessage('Password does not match');
        } else {
            password = data.password;
            dispatch(restorePassword({data: {password, token}}));
            setCompareMessage(null);
        }
    }

    if (message) {
        setTimeout(() => {
            navigate('/');
        }, 4000)

        return (
            <div className={'successfully_password_changed'}>
                <div><FaCheckCircle/></div><span className={'restore_password_message'}>{message}</span>
            </div>
        )
    }

    return (
        <div className={'restore_password_wrapper'}>
            <div className={'restore_password_form'}>
                <form>
                    <div className={'restore_password_input'}>
                        <div>
                            <span>New password:</span>
                            <input type={'password'} {...register('password')}/>
                        </div>
                        <div>
                            <span>Confirm password:</span>
                            <input type={'password'} {...register('confirm_password')}/>
                        </div>
                        {compareMessage&& <span className={'validation'}>{compareMessage}</span>}
                        {errors.password && <span className={'validation'}>{errors.password.message}</span>}
                        {error&& <span className={'validation'}>{error}</span>}
                        <div className={'restore_password_button'} onClick={handleSubmit(submit)}>Submit</div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RestorePasswordPage;