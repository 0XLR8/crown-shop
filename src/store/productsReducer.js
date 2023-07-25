import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../firebase";

const initialState = {
    products: [],
    productsPending: true
}

export const fetchProductsAsync = createAsyncThunk('products/fetchProducts', async (payload, thunkApi) => {
    try{
        const res = await getCategories();
        console.log(res)
        return res;
    } catch (er) {
        console.log(er.message);
        return thunkApi.rejectWithValue('Error fetching data.')
    }
})

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, {payload}) => {
            state.products = payload
        },
        setProductsPending: (state, {payload}) => {
            state.productsPending = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.productsPending = true;
        })
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.productsPending = false;
        })
        builder.addCase(fetchProductsAsync.fulfilled, (state, {payload}) => {
            state.products = payload;
            state.productsPending = false;
        })
    }
})

export const productsReducer = productsSlice.reducer;

export const productsActions = productsSlice.actions;