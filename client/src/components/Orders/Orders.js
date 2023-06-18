import React from 'react';
import {useDispatch} from "react-redux";
import {FaTrashAlt} from "react-icons/fa";

import "./Orders.css";
import {deleteById} from "../../store/slices/orders.slice";

const Orders = ({order: {id, brand_name, model, price, img, size}}) => {
    const dispatch = useDispatch();

    const deleteOrders = () => {
        dispatch(deleteById({id}));
    }

    return (
        <div className={'order_wrapper'}>
            <div><img src={img} alt={brand_name} width={105}/></div>
            <div className={'order_title_price'}>
                <div className={'order_title'}>
                    <div>Sneakers</div>
                    <div>{brand_name}</div>
                    <div>{model}</div>
                    <div>{size}</div>
                </div>
                <div className={'order_price_delete'}>
                    <span>{price}$</span>
                    <div onClick={() => deleteOrders()}><FaTrashAlt/></div>
                </div>
            </div>
        </div>
    );
};

export default Orders;