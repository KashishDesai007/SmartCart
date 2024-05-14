import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name:'products',
    initialState:{
        products : [],
        selectedProduct : {}
    },
    reducers:{
        fetchProducts:(state, action) => {
            state.products.push(...action.payload)
        },
        addProduct:(state, action) => {
            console.log("action---", action.payload)
            state.products.push(action.payload)
        },
        updateProducts: (state, action) => {
            state.products = action.payload
        },
        handleSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        }
    }
})

export const {fetchProducts, addProduct, updateProducts, handleSelectedProduct} = productsSlice.actions

export default productsSlice.reducer