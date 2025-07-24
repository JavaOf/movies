import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authThunk";


const initialState = {
    user: JSON.parse(localStorage.getItem('user')),
    loading: false,
    error: null,
    isRegistered: false
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.isRegistered = false;
        })
        .addCase(registerUser.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.user = payload;
            state.isRegistered = true;
            localStorage.setItem('user', JSON.stringify(payload))
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.error = action.error.message || 'Ошибка регистрации';
            state.loading = false;
            state.isRegistered = false;
        })
    }
});

export default authSlice.reducer;