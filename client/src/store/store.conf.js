import {configureStore} from "@reduxjs/toolkit";

import authReducer from "./slices/auth.slice";
import userReducer from "./slices/user.slice";
import brandReducer from "./slices/brand.slice";
import typeReducer from "./slices/type.slice";
import pageReducer from "./slices/page.slice";
import visibleReducer from "./slices/visible.slice";
import ordersReducer from "./slices/orders.slice";
import sneakersReducer from "./slices/sneakers.slice";
import basketReducer from "./slices/basket.slice";
import analyticsReducer from "./slices/analytics.slice";

const store = configureStore({
    reducer: {
        authReducer,
        userReducer,
        brandReducer,
        typeReducer,
        pageReducer,
        visibleReducer,
        ordersReducer,
        sneakersReducer,
        basketReducer,
        analyticsReducer
    }
})

export default store;