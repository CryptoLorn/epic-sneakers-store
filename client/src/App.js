import {Route, Routes} from 'react-router-dom';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";

import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Layout from "./components/Layout/Layout";
import SneakerDetailsPage from "./pages/SneakerDetailsPage/SneakerDetailsPage";
import {isAuth} from "./store/slices/auth.slice";
import AboutPage from "./pages/AboutPage/AboutPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import Users from "./components/Users/Users";
import Analytics from "./components/Analytics/Analytics";
import RequireAuth from "./hooc/RequireAuth";
import RestorePasswordPage from "./pages/RestorePasswordPage/RestorePasswordPage";
import Message from "./components/Modals/Message/Message";

function App() {
    const {messageVisible} = useSelector(state => state.visibleReducer);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            dispatch(isAuth()).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [])

    if (loading) {
        return <Spinner animation={'grow'}/>
    }

    return (
        <>
            {messageVisible && <Message/>}
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'admin'} element={
                        <RequireAuth>
                            <AdminPage/>
                        </RequireAuth>
                    }>
                        <Route path={'users'} element={<Users/>}/>
                        <Route path={'analytics'} element={<Analytics/>}/>
                    </Route>
                    <Route path={':name/:id'} element={<SneakerDetailsPage/>}/>
                    <Route path={'password/forgot/:token'} element={<RestorePasswordPage/>}/>
                    <Route path={'about'} element={<AboutPage/>}/>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
