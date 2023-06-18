import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import "./Brands.css"
import {getAll, setSelectedBrand, setElementBrand} from "../../store/slices/brand.slice";
import {setPage} from "../../store/slices/page.slice";

const Brands = () => {
    const {brands, elementBrand, status} = useSelector(state => state.brandReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll());
    }, [])

    const handleClick = (brand, e) => {
        if (elementBrand === e) {
            dispatch(setSelectedBrand({}));
            dispatch(setElementBrand(null));
        } else {
            dispatch(setSelectedBrand(brand));
            dispatch(setPage(1));
            dispatch(setElementBrand(e));
        }
    }

    return (
        <div className={'brand_menu'}>
            {status === 'pending'&& <h1>Loading...</h1>}
            {brands.map((brand, e) =>
                <div
                    className={elementBrand === e ? 'active_brand' : 'brand_item'}
                    key={brand.id}
                    onClick={() => handleClick(brand, e)}
                >
                    <span>{brand.name}</span>
                </div>
            )}
        </div>
    );
};

export default Brands;