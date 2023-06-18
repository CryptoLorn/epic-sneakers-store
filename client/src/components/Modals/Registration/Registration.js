import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Modal from 'react-bootstrap/Modal';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";

import "./Registration.css";
import "../../../validators/validator.css";
import Login from "../Login/Login";
import {AuthValidator} from "../../../validators/auth.validator";
import {registration} from "../../../store/slices/auth.slice";
import {setLoginVisible, setRegistrationVisible} from "../../../store/slices/visible.slice";


const Registration = ({show, onHide}) => {
    const {loginVisible} = useSelector(state => state.visibleReducer);
    const {error} = useSelector(state => state.authReducer);
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: joiResolver(AuthValidator)});
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async () => {
        await dispatch(registration({data: {email, password}}));
    }

    const loginRedirect = () => {
        dispatch(setLoginVisible(true));
        dispatch(setRegistrationVisible(false));
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
                    <div className={'registration_wrapper'}>
                        <div className={'registration_form'}>
                            <div><h2>Register</h2></div>
                            <form>
                                <div className={'registration'}>
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

                                    <div className={'registration_info'}>
                                        <div>Already registered? <span onClick={() => loginRedirect()}>Login</span></div>
                                        <Login show={loginVisible} onHide={() => dispatch(setLoginVisible(false))}/>

                                        <div className={'registration_button'} onClick={handleSubmit(submit)}>Register</div>
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

export default Registration;