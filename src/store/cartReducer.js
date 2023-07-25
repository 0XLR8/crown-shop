import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    showCartMenu: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, {payload}) => {
            state.cart = payload
        },
        setShowCart: (state, {payload}) => {
            state.showCartMenu = payload
        },
        handleAddCart: (state, {payload}) => {
            const findDoubleItem = state.cart.find(cartItem => cartItem.id === payload.id);

            if(findDoubleItem){
                state.cart = state.cart.map(cartItem => {
                    if(cartItem.id === findDoubleItem.id){
                        cartItem.count += 1;
                    }
                    return cartItem
                })
                return;
            }
            state.cart = [...state.cart, {...payload, count: 1}]
        },
        handleCartRemove: (state, {payload}) => {
            state.cart = state.cart.filter(cartItem => cartItem.id !== payload);
        },
        handleCartDecrease: (state, {payload}) => {
            state.cart = state.cart.map(cartItem => {
                if(cartItem.id === payload){
                    cartItem.count -= 1;
                }
                return cartItem;
            }).filter(cartItem => cartItem.count > 0);
        },
        handleCartIncrease: (state, {payload}) => {
            state.cart = state.cart.map(cartItem => {
                if(cartItem.id === payload){
                    cartItem.count += 1;
                }
                return cartItem;
            })
        }
    }
})

export const cartReducer = cartSlice.reducer;

export const cartActions = cartSlice.actions;