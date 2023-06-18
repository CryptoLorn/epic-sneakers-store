import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FaShoppingBag, FaTrashAlt, FaEdit} from "react-icons/fa";
import {Spinner} from "react-bootstrap";

import "./SneakerDetailsPage.css";
import {createOrders, setError, setSelectedSize} from "../../store/slices/orders.slice";
import {getSneakersById, sneakersToUpdate} from "../../store/slices/sneakers.slice";
import {setLoginVisible, setConfirmationVisible} from "../../store/slices/visible.slice";
import Confirmation from "../../components/Modals/Confirmation/Confirmation";
import EditSneakersPrice from "../../components/Modals/EditSneakersPrice/EditSneakersPrice";
import {ADMIN} from "../../constants/role.enum";

const SneakerDetailsPage = () => {
    const {id} = useParams();
    const {sneaker, sneakers} = useSelector(state => state.sneakersReducer);
    const {editVisible} = useSelector(state => state.visibleReducer);
    const {user} = useSelector(state => state.authReducer);
    const {selectedSize, error} = useSelector(state => state.ordersReducer);
    const dispatch = useDispatch();

    const sizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11];

    useEffect(() => {
        dispatch(getSneakersById({id}));
    }, [sneakers])

    if (sneaker.img === undefined) {
        return <Spinner animation={"grow"}/>
    }

    const addOrders = () => {
        if (selectedSize) {
            dispatch(createOrders({
                data: {
                    basketId: user.id,
                    sneakerId: sneaker.id,
                    brand_name: sneaker.brand_name,
                    model: sneaker.model,
                    price: sneaker.price,
                    size: selectedSize,
                    img: sneaker.img
                }
            }));
        } else {
            dispatch(setError('Please, select size'));
        }
    }

    return (
        <div className={'details_page_wrapper'}>
            {sneaker && (
                <div>
                    <div className={'details_page'}>
                        <div><img src={sneaker.img} alt={sneaker.brand_name} width={500}/></div>
                        <div className={'details_page_characteristics'}>
                            <h2 className={'details_page_title'}>
                                {sneaker.typeId === 1 ?
                                    <span>Men's Sneakers <b>{sneaker.brand_name}</b> {sneaker.model}</span>
                                    :
                                    sneaker.typeId === 2 ?
                                        <span>Women's Sneakers <b>{sneaker.brand_name}</b> {sneaker.model}</span>
                                        :
                                        sneaker.typeId === 3 ?
                                            <span>Kid's Sneakers <b>{sneaker.brand_name}</b> {sneaker.model}</span>
                                            :
                                            sneaker.typeId === 4 ?
                                                <span>Unisex Sneakers <b>{sneaker.brand_name}</b> {sneaker.model}</span>
                                                :
                                                <span>Sneakers <b>{sneaker.brand_name}</b> {sneaker.model}</span>
                                }
                            </h2>
                            <div className={'border_bottom'}><b>Brand:</b> {sneaker.brand_name}</div>
                            <div className={'border_bottom'}><b>Model:</b> {sneaker.model}</div>
                            <div className={'border_bottom'}><b>Color:</b> {sneaker.color}</div>
                            <div className={'border_bottom'}><b>Material:</b> {sneaker.material}</div>
                            <div className={'details_page_sizes'}>
                                <b>Sizes:</b>
                                <div>
                                    <div className={'sizes'}>
                                        {sizes.map(size =>
                                            <div className={selectedSize === size ? 'size_active' : 'size'}
                                                 key={size}
                                                 onClick={() => dispatch(setSelectedSize(size))}
                                            >
                                                {size}
                                            </div>
                                        )}
                                    </div>
                                    <div>{selectedSize ? null :
                                        <span className={'size_validation'}>{error}</span>}</div>
                                </div>
                            </div>
                            <div className={'details_page_price'}>
                                <div className={'price'}>
                                    <b>Price:</b> <span><b>{sneaker.price}</b></span><span
                                    className={'price_currency'}>$</span>
                                </div>
                                {
                                    user ?
                                        <div className={'price_button'} onClick={() => addOrders()}>
                                            <div>Add</div>
                                            <div><FaShoppingBag/></div>
                                        </div>
                                        :
                                        <div className={'price_button'} onClick={() => dispatch(setLoginVisible(true))}>
                                            <div>Add</div>
                                            <div><FaShoppingBag/></div>
                                        </div>
                                }
                            </div>
                            {
                                user ?
                                    <div className={'options'}>
                                        {user.role === ADMIN ?
                                            <div className={'admin_options'}>
                                                <div className={'update_price_button'}
                                                     onClick={() => dispatch(sneakersToUpdate(sneaker))}>
                                                    <FaEdit/>
                                                </div>
                                                <div className={'delete_button'}
                                                     onClick={() => dispatch(setConfirmationVisible(true))}>
                                                    <FaTrashAlt/>
                                                </div>
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                    :
                                    null
                            }
                            <Confirmation/>
                        </div>
                    </div>
                    <hr/>
                    <div className={'details_page_description'}>
                        <b>Description:</b>
                        <span>{sneaker.description}</span>
                    </div>
                </div>
            )}
            <EditSneakersPrice show={editVisible}/>
        </div>
    );
};

export default SneakerDetailsPage;