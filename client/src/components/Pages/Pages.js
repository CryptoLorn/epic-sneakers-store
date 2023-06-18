import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Pages.css";
import {setPage} from "../../store/slices/page.slice";

const Pages = () => {
    const {page, limit} = useSelector(state => state.pageReducer);
    const {totalCount} = useSelector(state => state.sneakersReducer);
    const dispatch = useDispatch();

    const pageCount = Math.ceil(totalCount / limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <Pagination>
            {pages.map(currentPage =>
                <div
                    key={currentPage}
                    className={page === currentPage ? "active" : "item"}
                    onClick={() => dispatch(setPage(currentPage))}
                >
                    {currentPage}
                </div>
            )}
        </Pagination>
    );
};

export default Pages;