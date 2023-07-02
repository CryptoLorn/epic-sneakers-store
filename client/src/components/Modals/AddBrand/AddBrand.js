import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Button, Form, FormControl, Modal} from "react-bootstrap";
import {joiResolver} from "@hookform/resolvers/joi";

import "../../../validators/validator.css";
import {createBrand} from "../../../store/slices/brand.slice";
import {TypeBrandValidator} from "../../../validators/typeBrand.validator";
import {setBrandVisible} from "../../../store/slices/visible.slice";

const AddBrand = ({show, onHide}) => {
    const {error} = useSelector(state => state.brandReducer);
    const {handleSubmit, register, reset, formState: {errors}} = useForm(
        {resolver: joiResolver(TypeBrandValidator)}
    );
    const dispatch = useDispatch();

    const addBrand = (data) => {
        dispatch(createBrand({data})).then(value => {
            if (!value.error) {
                onHide();
                dispatch(setBrandVisible(false));
                reset();
            }
        });
    }

    const hide = () => {
        onHide();
        dispatch(setBrandVisible(false));
        reset();
    }

    return (
        <Modal
            show={show}
            onHide={hide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl type={'text'} placeholder={'name'} {...register('name')}/>
                </Form>
                {errors.name && <span className={'validation'}>{errors.name.message}</span>}
                {error && <span className={'validation'}>{error}</span>}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit(addBrand)}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddBrand;