import React, {useEffect, useState} from 'react';

import "./Analytic.css";
import {sneakersService} from "../../services/sneaker.service";

const Analytic = ({analytic: {views, bought, sneakersId}}) => {
    const [sneaker, setSneaker] = useState({});

    useEffect(() => {
        sneakersService.getById(sneakersId).then(data => setSneaker({...data}));
    }, [])

    return (
        <div className={'analytic_wrapper'}>
            <div className={'analytic'}>
                <div className={'analytic_name'}>{sneaker.brand_name} {sneaker.model}</div>
                <div className={'analytic_views'}>{views}</div>
                <div className={'analytic_bought'}>{bought}</div>
            </div>
        </div>
    );
};

export default Analytic;