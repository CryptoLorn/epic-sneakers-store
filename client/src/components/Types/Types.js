import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import "./Types.css";
import {setPage} from "../../store/slices/page.slice";
import {getAll, setSelectedType, setElementType} from "../../store/slices/type.slice";

const Type = () => {
    const {types, elementType, status, error} = useSelector(state => state.typeReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll());
    }, [])

    const handleClick = (type, e) => {
        if (elementType === e) {
            dispatch(setSelectedType({}));
            dispatch(setElementType(null));
        } else {
            dispatch(setSelectedType(type));
            dispatch(setPage(1));
            dispatch(setElementType(e));
        }
    }

    return (
        <div className={'type_menu'}>
            {status === 'pending'&& <h1>Loading...</h1>}
            {error&& <h2>{error}</h2>}
            {types.map((type, e) =>
                <div
                    className={elementType === e? 'active_type' : 'type_item'}
                    key={type.id}
                    onClick={() => handleClick(type, e)}
                >
                    {type.name}
                </div>
            )}
        </div>
    );
};

export default Type;