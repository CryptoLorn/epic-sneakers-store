import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';

import './SuccessfulOrder.css';
import {setSuccessfulOrderVisible} from '../../../store/slices/visible.slice';

const SuccessfulOrder = ({onHide}) => {
    const {successfulOrderVisible} = useSelector(state => state.visibleReducer);
    const dispatch = useDispatch();

    return (
        <>
            <Modal show={successfulOrderVisible} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <div className={'successful_order'}>Thank, for your order!</div>
                </Modal.Header>
                <Modal.Body>
                    <div className={'successful_order_info'}>Our manager will contact you soon.</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className={'successful_order_button'}
                        onClick={() => dispatch(setSuccessfulOrderVisible(false))}
                    >
                        Done
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SuccessfulOrder;