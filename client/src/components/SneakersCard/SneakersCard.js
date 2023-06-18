import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import "./SneakersCard.css";
import {updateAnalyticsById} from "../../store/slices/analytics.slice";

const SneakersCard = ({sneaker: {id, model, price, img, brand_name}}) => {
    const {analytics} = useSelector(state => state.analyticsReducer);
    const dispatch = useDispatch();

    const reviewed = () => {
        analytics.forEach(analytic => {
            if (analytic.sneakersId === id) {
                let newViews = analytic.views + 1;
                let views = {views: newViews};
                dispatch(updateAnalyticsById({id: analytic.sneakersId, analytic: views}));
            }
        })
    }

    return (
        <div onClick={reviewed} className={'sneakers_card_wrapper'}>
            <Link to={`/${model}/` + id.toString()}>
                <div className={'sneakers_card'}>
                    <div className={'sneakers_card_poster'}><img src={img} alt={brand_name}/></div>
                    <div className={'sneakers_card_short_info'}>
                        <div className={'sneakers_card_name'}>
                            <span>Sneakers </span>
                            <span><b>{brand_name}</b></span>
                            <span> {model}</span>
                        </div>
                        <div className={'sneakers_cars_price_basket'}>
                            <div><span>{price} $</span></div>
                            <div className={'sneakers_buy'}>Buy now</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SneakersCard;