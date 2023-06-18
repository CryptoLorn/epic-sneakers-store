import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";

import "../../../validators/validator.css";
import {createSneakers} from "../../../store/slices/sneakers.slice";
import {SneakersValidator} from "../../../validators/sneakers.validator";
import AddType from "../AddType/AddType";
import AddBrand from "../AddBrand/AddBrand";
import {setTypeVisible, setBrandVisible} from "../../../store/slices/visible.slice";

const AddSneakers = ({show, onHide}) => {
    const [selectedTypeAdd, setSelectedTypeAdd] = useState(null);
    const [selectedBrandAdd, setSelectedBrandAdd] = useState(null);
    const [file, setFile] = useState(null);
    const {brands} = useSelector(state => state.brandReducer);
    const {types} = useSelector(state => state.typeReducer);
    const {typeVisible, brandVisible} = useSelector(state => state.visibleReducer);
    const dispatch = useDispatch();
    const {handleSubmit, register, reset, formState: {errors}} = useForm({resolver: joiResolver(SneakersValidator)});

    const selectFile = e => {
        setFile(e.target.files[0]);
    }

    const addSneakers = (data) => {
        const formData = new FormData();
        formData.append('model', data.model);
        formData.append('brand_name', selectedBrandAdd.name);
        formData.append('price', `${data.price}`);
        formData.append('color', data.color);
        formData.append('material', data.material);
        formData.append('img', file);
        formData.append('description', data.description);
        formData.append('brandId', selectedBrandAdd.id);
        formData.append('typeId', selectedTypeAdd.id);
        dispatch(createSneakers({data: formData}));
        onHide();
        reset();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Sneakers
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{selectedTypeAdd?.name || 'Select type'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <DropdownItem onClick={() => dispatch(setTypeVisible(true))}>+ Type</DropdownItem>
                            <hr/>
                            {types.map(type =>
                                <DropdownItem
                                    key={type.id}
                                    onClick={() => setSelectedTypeAdd(type)}
                                >
                                    {type.name}
                                </DropdownItem>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    {errors.type && <span className={'validation'}>{errors.type.message}</span>}

                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{selectedBrandAdd?.name || 'Select brand'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <DropdownItem onClick={() => dispatch(setBrandVisible(true))}>+ Brand</DropdownItem>
                            <hr/>
                            {brands.map(brand =>
                                <DropdownItem
                                    key={brand.id}
                                    onClick={() => setSelectedBrandAdd(brand)}
                                >
                                    {brand.name}
                                </DropdownItem>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    {errors.brand && <span className={'validation'}>{errors.brand.message}</span>}
                    <Form.Control
                        className={'my-3'}
                        type={'text'}
                        placeholder={'model'}
                        {...register('model')}
                    />
                    {errors.model && <span className={'validation'}>{errors.model.message}</span>}
                    <Form.Control
                        className={'my-3'}
                        type={'text'}
                        placeholder={'color'}
                        {...register('color')}
                    />
                    {errors.color && <span className={'validation'}>{errors.color.message}</span>}
                    <Form.Control
                        className={'my-3'}
                        type={'text'}
                        placeholder={'material'}
                        {...register('material')}
                    />
                    {errors.material && <span className={'validation'}>{errors.material.message}</span>}
                    <Form.Control
                        className={'my-3'}
                        type={'number'}
                        defaultValue={'0'}
                        {...register('price')}
                    />
                    {errors.price && <span className={'validation'}>{errors.price.message}</span>}
                    <Form.Control
                        className={'description'}
                        type={'text'}
                        placeholder={'description'}
                        {...register('description')}
                    />
                    {errors.description && <span className={'validation'}>{errors.description.message}</span>}
                    <Form.Control
                        className={'my-3'}
                        type={'file'}
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {selectedTypeAdd && selectedBrandAdd?
                    <Button disabled={false} onClick={handleSubmit(addSneakers)}>Add</Button>
                :
                    <Button disabled={true} onClick={handleSubmit(addSneakers)}>Add</Button>
                }
            </Modal.Footer>
            <AddType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <AddBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
        </Modal>
    );
};

export default AddSneakers;