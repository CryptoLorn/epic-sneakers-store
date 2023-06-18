import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Outlet} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

import './AdminPage.css';
import AddSneaker from "../../components/Modals/AddSneakers/AddSneakers";
import AddBrand from "../../components/Modals/AddBrand/AddBrand";
import AddType from "../../components/Modals/AddType/AddType";
import {setTypeVisible, setBrandVisible} from "../../store/slices/visible.slice";

const Admin = () => {
    const {typeVisible, brandVisible} = useSelector(state => state.visibleReducer);
    const [productVisible, setProductVisible] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className={'admin_page_wrapper'}>
            <div className={'admin_buttons_wrapper'}>
                <div>
                    <Dropdown>
                        <Dropdown.Toggle className={'dropdown_admin'} variant="success" id="dropdown-basic">
                            Add
                        </Dropdown.Toggle>

                        <Dropdown.Menu className={'dropdown_menu'}>
                            <Dropdown.Item onClick={() => setProductVisible(true)}>Add sneakers</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch(setBrandVisible(true))}>Add brand</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch(setTypeVisible(true))}>Add type</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <AddSneaker show={productVisible} onHide={() => setProductVisible(false)}/>
                    <AddBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
                    <AddType show={typeVisible} onHide={() => setTypeVisible(false)}/>
                </div>
                <Link to={'/admin/users'}><div className={'admin_page_button'}>Show all users</div></Link>
                <Link to={'/admin/analytics'}><div className={'admin_page_button'}>Show statistics</div></Link>
            </div>
            <hr/>
            <div className={'admin_page_outlet'}><Outlet/></div>
        </div>
    );
};

export default Admin;