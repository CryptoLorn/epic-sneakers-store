import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {Button, Form, Modal} from "react-bootstrap";

import "../../../validators/validator.css";
import {setEditVisible} from "../../../store/slices/visible.slice";
import {updateSneakersById, sneakersToUpdate} from "../../../store/slices/sneakers.slice";
import {EditSneakersPriceValidator} from "../../../validators/editSneakersPrice.validator";

const EditSneakersPrice = () => {
    const {sneakersForUpdate} = useSelector(state => state.sneakersReducer);
    const {editVisible} = useSelector(state => state.visibleReducer);
    const dispatch = useDispatch();
    const {handleSubmit, register, setValue, formState: {errors}} = useForm({resolver: joiResolver(EditSneakersPriceValidator)});

    useEffect(() => {
        if (sneakersForUpdate) {
            dispatch(setEditVisible(true));
            setValue('price', sneakersForUpdate.price);
        }
    }, [sneakersForUpdate])

    const updateSneakersPrice = (price) => {
        dispatch(updateSneakersById({id: sneakersForUpdate.id, sneaker: price}));
        dispatch(setEditVisible(false));
        dispatch(sneakersToUpdate(false));
    }

    const hide = () => {
        dispatch(setEditVisible(false));
        dispatch(sneakersToUpdate(false));
    }

    return (
        <Modal
            show={editVisible}
            onHide={hide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control className={'my-3'} type={'number'} {...register('price')}/>
                    {errors.price && <span className={'validation'}>{errors.price.message}</span>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit(updateSneakersPrice)}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditSneakersPrice;