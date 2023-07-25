import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import { productsReducer } from "./productsReducer";
import { cartReducer } from "./cartReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer
})