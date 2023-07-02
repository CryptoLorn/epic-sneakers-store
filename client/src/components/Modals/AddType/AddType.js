import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Button, Form, FormControl, Modal} from "react-bootstrap";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";

import "../../../validators/validator.css";
import {createType} from "../../../store/slices/type.slice";
import {TypeBrandValidator} from "../../../validators/typeBrand.validator";
import {setTypeVisible} from "../../../store/slices/visible.slice";

const AddType = ({show, onHide}) => {
    const {error} = useSelector(state => state.typeReducer);
    const {handleSubmit, register, reset, formState: {errors}} = useForm(
        {resolver: joiResolver(TypeBrandValidator)}
    );
    const dispatch = useDispatch();

    const addType = (data) => {
        dispatch(createType({data})).then(value => {
            if (!value.error) {
                onHide();
                dispatch(setTypeVisible(false));
                reset();
            }
        });
    }

    const hide = () => {
        onHide();
        dispatch(setTypeVisible(false));
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
                    Add Type
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
                <Button onClick={handleSubmit(addType)}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddType;