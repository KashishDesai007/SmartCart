import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import productReducer from "./productSlice";

const presistConfig = {
    key:'root',
    version:1,
    storage
}

const reducer = combineReducers({
    auth: authReducer,
    products: productReducer
})

const presistedReducer = persistReducer(presistConfig, reducer)

export const store = configureStore({
    reducer: presistedReducer
})