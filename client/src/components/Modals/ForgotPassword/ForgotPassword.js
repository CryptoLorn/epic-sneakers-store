import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-bootstrap/Modal";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";

import './ForgotPassword.css';
import {sendPasswordResetEmail} from "../../../store/slices/user.slice";
import {EmailValidator} from "../../../validators/email.validator";

const ForgotPassword = ({show, onHide}) => {
    const {error} = useSelector(state => state.userReducer);
    const [message, setMessage] = useState(null);
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver: joiResolver(EmailValidator)});
    const dispatch = useDispatch();

    const submit = (email) => {
        dispatch(sendPasswordResetEmail({email}));
        setMessage('Please, go to your mail for further actions');
    }

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className={'forgot_password_wrapper'}>
                        <div className={'forgot_password_form'}>
                            <form>
                                <div className={'forgot_password_input'}>
                                    Enter your email: <input type='email'{...register('email')}/>
                                    {errors.email &&
                                        <span className={'validation'}>
                                            {errors.email.message}
                                        </span>
                                    }
                                    {error?
                                        <span className={'validation'}>{error}</span>
                                        :
                                        <span className={'forgot_password_message'}>{message}</span>
                                    }
                                    {!error&& message?
                                        <div
                                            className={'forgot_password_button'}
                                            onClick={() => onHide()}
                                        >
                                            Ok
                                        </div>
                                        :
                                        <div
                                            className={'forgot_password_button'}
                                            onClick={handleSubmit(submit)}
                                        >
                                            Send password reset email
                                        </div>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ForgotPassword;