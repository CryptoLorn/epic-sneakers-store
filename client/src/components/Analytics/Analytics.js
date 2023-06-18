import React, {useState} from 'react';
import {useSelector} from "react-redux";

import "./Analytics.css";
import Analytic from "../Analytic/Analytic";

const Analytics = () => {
    const {analytics} = useSelector(state => state.analyticsReducer);
    const [sortByPopularity, setSortByPopularity] = useState(false);
    const [sortBySales, setSortBySales] = useState(false);
    let sortAnalytics = [...analytics];

    const sortByMorePopular = () => {
        setSortByPopularity(true);
        setSortBySales(false);
    }

    const sortByMoreSales = () => {
        setSortBySales(true);
        setSortByPopularity(false);
    }

    return (
        <>
            <div className={'buttons_wrapper'}>
                <div
                    className={'sort_button'}
                    onClick={sortByPopularity ? () => setSortByPopularity(false) : sortByMorePopular}
                >
                    More popular
                </div>
                <div
                    className={'sort_button'}
                    onClick={sortBySales ? () => setSortBySales(false) : sortByMoreSales}
                >
                    More sales
                </div>
            </div>

            <div className={'analytics_name_tables'}>
                <div className={'analytics_name'}><b>Sneakers Name</b></div>
                <div className={'analytics_views'}><b>Views</b></div>
                <div className={'analytics_bought'}><b>Bought</b></div></div>
            {sortByPopularity ?
                sortAnalytics
                    .sort((a, b) => a.views < b.views ? 1 : -1)
                    .map(analytic =>
                        <Analytic key={analytic.id} analytic={analytic}/>
                    )
                :
                sortBySales ?
                    sortAnalytics
                        .sort((a, b) => a.bought < b.bought ? 1 : -1)
                        .map(analytic =>
                            <Analytic key={analytic.id} analytic={analytic}/>
                        )
                    :
                    analytics
                        .map(analytic =>
                            <Analytic key={analytic.id} analytic={analytic}/>
                        )
            }
        </>
    );
};

export default Analytics;