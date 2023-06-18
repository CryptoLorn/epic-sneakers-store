import {Link, Outlet, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FaUserCircle} from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";

import "./Layout.css";
import BasketVisible from "../BasketVisible/BasketVisible";
import Login from "../Modals/Login/Login";
import Registration from "../Modals/Registration/Registration";
import {setUser} from "../../store/slices/auth.slice";
import {authService} from "../../services/auth.service";
import {
    setLoginVisible,
    setRegistrationVisible,
    setForgotPasswordVisible,
    setSuccessfulOrderVisible
} from "../../store/slices/visible.slice";
import {setSelectedType, setElementType} from "../../store/slices/type.slice";
import {setSelectedBrand, setElementBrand} from "../../store/slices/brand.slice";
import {setPage} from "../../store/slices/page.slice";
import {getBasketById} from "../../store/slices/basket.slice";
import {getAllOrdersByBasketId, setSelectedSize, setError} from "../../store/slices/orders.slice";
import {setSneakersFound} from "../../store/slices/sneakers.slice";
import Footer from "../Footer/Footer";
import {ADMIN} from "../../constants/role.enum";
import ForgotPassword from "../Modals/ForgotPassword/ForgotPassword";
import SuccessfulOrder from "../Modals/SuccessfulOrder/SuccessfulOrder";

const Layout = () => {
    const {user} = useSelector(state => state.authReducer);
    const {sneakers} = useSelector(state => state.sneakersReducer);
    const {
        loginVisible,
        registrationVisible,
        forgotPasswordVisible,
        successfulOrderVisible
    } = useSelector(state => state.visibleReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            dispatch(getBasketById({id: user?.basket.id}));
            dispatch(getAllOrdersByBasketId({id: user?.basket.id}));
        }
    }, [user?.basket.id, sneakers])

    const defaultValue = () => {
        dispatch(setSelectedType(false));
        dispatch(setSelectedBrand(false));
        dispatch(setElementType(null));
        dispatch(setElementBrand(null));
        dispatch(setSelectedSize(null));
        dispatch(setSneakersFound([]));
        dispatch(setError());
        dispatch(setPage(1));
    }

    const logOut = async () => {
        await authService.logout();
        dispatch(setLoginVisible(false));
        dispatch(setRegistrationVisible(false));
        dispatch(setUser(null));
        defaultValue();
        navigate('/');
    }

    const navigateAdminPage = () => {
        navigate('/admin');
    }

    return (
        <>
            <div className={'layout'}>
                <div onClick={() => defaultValue()}><Link to={"/"}><h1>Epic Sneakers</h1></Link></div>

                <>
                    {user?
                        <div>
                            {
                                user.role === ADMIN?
                                <div className={'navigation'}>
                                    <BasketVisible/>
                                    <div>
                                        <Dropdown>
                                            <Dropdown.Toggle className={'dropdown_toggle'} variant="success" id="dropdown-basic2">
                                                <FaUserCircle className={'user'}/>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className={'dropdown_menu'}>
                                                <Dropdown.Item onClick={navigateAdminPage}>Admin</Dropdown.Item>
                                                <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                :
                                <div className={'auth_user'}>
                                    <BasketVisible/>
                                    <div>
                                        <Dropdown>
                                            <Dropdown.Toggle className={'dropdown_toggle'} variant="success" id="dropdown-basic2">
                                                <FaUserCircle className={'user'}/>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className={'dropdown_menu'}>
                                                <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            }
                        </div>
                        :
                        <div className={'auth'}>
                            <div onClick={() => dispatch(setLoginVisible(true))}><span>Log In</span></div>
                            <div onClick={() => dispatch(setRegistrationVisible(true))}><span>Register</span></div>
                            <Login show={loginVisible} onHide={() => dispatch(setLoginVisible(false))}/>
                            <Registration show={registrationVisible} onHide={() => dispatch(setRegistrationVisible(false))}/>
                            <ForgotPassword show={forgotPasswordVisible} onHide={() => dispatch(setForgotPasswordVisible(false))}/>
                        </div>
                    }
                </>
            </div>
            <SuccessfulOrder show={successfulOrderVisible} onHide={() => dispatch(setSuccessfulOrderVisible(false))}/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default Layout;