import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        authUser: {},
        allUsers:[]
    },
    reducers:{
        fetchUsers:(state, action) => {
            console.log("state--->", action.payload);
            state.allUsers.push(...action.payload)
        },
        addUser:(state, action) =>{
            state.allUsers.push(action.payload)
        },
        handleAuthUser: (state, action) => {
            state.authUser = action.payload
            console.log('AuthUsers--->', action.payload)
        }
    }
})

export const {fetchUsers, addUser, handleAuthUser} = authSlice.actions
export default authSlice.reducer;