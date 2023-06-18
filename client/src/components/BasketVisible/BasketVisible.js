import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FaShoppingBag} from "react-icons/fa";

import './BasketVisible.css';
import Basket from "../Modals/Basket/Basket";
import ItemInBag from "../ItemInBag/ItemInBag";
import {setBasketVisible} from "../../store/slices/visible.slice";

const BasketVisible = () => {
    const {basketVisible} = useSelector(state => state.visibleReducer);
    const dispatch = useDispatch();

    return (
        <div>
            <div className={'shopping_bag'} onClick={() => dispatch(setBasketVisible(true))}>
                <ItemInBag/>
                <FaShoppingBag/>
            </div>
            <Basket show={basketVisible} onHide={() => dispatch(setBasketVisible(false))}/>
        </div>
    );
};

export default BasketVisible;