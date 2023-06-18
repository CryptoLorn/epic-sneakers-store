import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Modal from 'react-bootstrap/Modal';
import {useForm} from 'react-hook-form';
import {joiResolver} from "@hookform/resolvers/joi";

import "./Login.css";
import "../../../validators/validator.css";
import Registration from "../Registration/Registration";
import {AuthValidator} from "../../../validators/auth.validator";
import {login} from "../../../store/slices/auth.slice";
import {setLoginVisible, setRegistrationVisible, setForgotPasswordVisible} from "../../../store/slices/visible.slice";

const Login = ({show, onHide}) => {
    const {registrationVisible} = useSelector(state => state.visibleReducer);
    const {error} = useSelector(state => state.authReducer);
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: joiResolver(AuthValidator)});
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async () => {
        await dispatch(login({data: {email, password}}));
    }

    const registrationRedirect = () => {
        dispatch(setLoginVisible(false));
        dispatch(setRegistrationVisible(true));
    }

    const forgotPasswordRedirect = () => {
        dispatch(setLoginVisible(false));
        dispatch(setForgotPasswordVisible(true));
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
                    <div className={'login_wrapper'}>
                        <div className={'login_form'}>
                            <div><h2>Log In</h2></div>
                            <form>
                                <div className={'login'}>
                                    <div>
                                        <input
                                            type='email'
                                            placeholder={'email...'}
                                            {...register('email')}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                    {errors.email && <span className={'validation'}>{errors.email.message}</span>}
                                    <div>
                                        <input
                                            type='password'
                                            placeholder={'password...'}
                                            {...register('password')}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                    {errors.password && <span className={'validation'}>{errors.password.message}</span>}
                                    {error&& <span className={'validation'}>{error}</span>}

                                    <div className={'login_info'}>
                                        <div>
                                            <div onClick={() => forgotPasswordRedirect()}><span>Forgot password?</span></div>
                                            <div>No account? <span onClick={() => registrationRedirect()}>Registration</span></div>
                                        </div>
                                        <Registration show={registrationVisible} onHide={() => dispatch(setRegistrationVisible(false))}/>

                                        <div className={'login_button'} onClick={handleSubmit(submit)}>Log In</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Login;