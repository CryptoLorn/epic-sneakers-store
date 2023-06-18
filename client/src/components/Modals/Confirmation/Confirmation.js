import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

import "./Confirmation.css";
import {deleteSneakersById} from "../../../store/slices/sneakers.slice";
import {setConfirmationVisible} from "../../../store/slices/visible.slice";

const Confirmation = () => {
    const {id} = useParams();
    const {confirmationVisible} = useSelector(state => state.visibleReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteSneaker = () => {
        dispatch(deleteSneakersById({id}));
        dispatch(setConfirmationVisible(false));
        navigate('/');
    }

    return (
        <>
            <Modal show={confirmationVisible} centered>
                <Modal.Body>Do you want to remove this product?</Modal.Body>
                <Modal.Footer>
                    <div className={'button'}>
                        <div className={'confirmation_button'} onClick={deleteSneaker}>Yes</div>
                        <div className={'confirmation_button'} onClick={() => dispatch(setConfirmationVisible(false))}>No</div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Confirmation;