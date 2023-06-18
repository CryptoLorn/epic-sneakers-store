import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Modal} from "react-bootstrap";

import "./Basket.css";
import Orders from "../../Orders/Orders";
import {getAllAnalytics, updateAnalyticsById} from "../../../store/slices/analytics.slice";
import {setBasketVisible, setSuccessfulOrderVisible} from "../../../store/slices/visible.slice";
import {deleteAllByBasketId} from "../../../store/slices/orders.slice";

const Basket = ({show, onHide}) => {
    const {user} = useSelector(state => state.authReducer);
    const {orders} = useSelector(state => state.ordersReducer);
    const {analytics} = useSelector(state => state.analyticsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllAnalytics());
    }, [orders])

    const toOrder = () => {
        orders.forEach(order => {
            analytics.forEach(analytic => {
                if (order.sneakerId === analytic.sneakersId) {
                    let newBought = analytic.bought + 1;
                    let bought = {bought: newBought};
                    dispatch(updateAnalyticsById({id: analytic.sneakersId, analytic: bought}));
                }
            })
        })

        dispatch(deleteAllByBasketId({id: user.id}));
        dispatch(setSuccessfulOrderVisible(true));
        dispatch(setBasketVisible(false));
    }

    let sum = 0;
    orders.forEach(el => sum += Number.parseFloat(el.price));

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    List of goods:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {orders&& (
                    <div className={'orders'}>
                        {orders.map(order => <Orders key={order.id} order={order}/>)}
                    </div>
                )}
                <div className={'to_pay'}>
                    {
                        sum ?
                            <span>To pay: <span>{new Intl.NumberFormat().format(sum)}</span><span>$</span></span>
                            :
                            null
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                {orders.length !== 0 ?
                    <span>
                        {
                            user.is_activated === true ?
                            <Button className={'order_button'} onClick={toOrder}>Order</Button>
                            :
                            <span>To continue, please activate your account</span>
                        }
                    </span>
                :
                null
                }
            </Modal.Footer>
        </Modal>
    );
};

export default Basket;