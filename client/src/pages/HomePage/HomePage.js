import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";

import "./HomePage.css";
import "../../validators/validator.css";
import SneakersCard from "../../components/SneakersCard/SneakersCard";
import Brands from "../../components/Brands/Brands";
import Pages from "../../components/Pages/Pages";
import Type from "../../components/Types/Types";
import {getAllSneakers, getAllSneakersWithParams, getAllBySearching, setSneakersFound} from "../../store/slices/sneakers.slice";
import {SearchValidator} from "../../validators/search.validator";

const HomePage = () => {
    const {selectedBrand} = useSelector(state => state.brandReducer);
    const {selectedType} = useSelector(state => state.typeReducer);
    const {sneakers, sneakersFound} = useSelector(state => state.sneakersReducer);
    const {page, limit} = useSelector(state => state.pageReducer);
    const dispatch = useDispatch();
    const [notFoundMessageVisible, setNotFoundMessageVisible] = useState(false);
    const [query, setQuery] = useSearchParams();
    const {handleSubmit, register, reset, formState: {errors}} = useForm({resolver: joiResolver(SearchValidator)});

    useEffect(() => {
        dispatch(getAllSneakers());

        if (query.get('title')) {
            dispatch(getAllBySearching({param: query.get('title')}));
        }

        if (query.get('title') && sneakersFound.length === 0) {
            setNotFoundMessageVisible(true);
        } else {
            setNotFoundMessageVisible(false);
        }
    }, [query])

    useEffect(() => {
        dispatch(getAllSneakersWithParams(
            {data:
                    {
                        selectedType: selectedType.id,
                        selectedBrand: selectedBrand.id,
                        page,
                        limit
                    }}));
    }, [page, limit, selectedType, selectedBrand]);

    const submit = (data) => {
        if (data.search !== '') {
            dispatch(setSneakersFound([]));
            setQuery({title: data.search});
            reset();
        }
    }

    return (
        <>
            <div className={'search'}>
                <div>
                    <form>
                        <input
                            className={'search_input'}
                            type="search"
                            placeholder={'Air Max, Revolution...'}
                            {...register('search')}
                        />
                        <button
                            className={'search_button'}
                            onClick={handleSubmit(submit)}
                        >
                            Search
                        </button>
                    </form>
                    {errors.search ? <span className={'validation'}>{errors.search.message}</span> : null}
                    {
                        notFoundMessageVisible === true
                            ?
                            <span>{sneakersFound.length === 0 ? <span>not found</span> : null}</span>
                            :
                            null
                    }
                </div>
            </div>

            <div className={'home_wrapper'}>
                <div>
                    <Brands/>
                </div>
                <div className={'home_type_cards'}>
                    <div>
                        <Type/>
                    </div>
                    <div className={'home_sneakers_list'}>
                        {sneakersFound.length !== 0 ?
                            <div className={'sneakers_list'}>
                                {sneakersFound.map(sneaker => <SneakersCard key={sneaker.id} sneaker={sneaker}/>)}
                            </div>
                            :
                            <div className={'sneakers_list'}>
                                {sneakers.map(sneaker => <SneakersCard key={sneaker.id} sneaker={sneaker}/>)}
                            </div>
                        }
                    </div>
                    <div><Pages/></div>
                </div>
            </div>
        </>
    );
};

export default HomePage;