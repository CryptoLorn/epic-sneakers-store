import React from 'react';
import {useSelector} from "react-redux";

import './ItemInBag.css';

const ItemInBag = () => {
    const {orders} = useSelector(state => state.ordersReducer);

    let quantity = orders.length;

    return (
        <>
            {
                quantity > 0?
                    <div className={'item_in_bag'}>
                        {quantity}
                    </div>
                    :
                    null
            }
        </>
    );
};

export default ItemInBag;