import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./authThunk";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')),
    loading: false,
    error: null,
    isRegistered: false,
    isAuthenticated: !!localStorage.getItem('user') 
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isRegistered = false;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
                state.isRegistered = true;
                localStorage.setItem('user', JSON.stringify(payload));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload || action.error.message || 'Ошибка регистрации';
                state.loading = false;
                state.isRegistered = false;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
                state.isAuthenticated = true;
                localStorage.setItem('user', JSON.stringify(payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload || action.error.message || 'Ошибка входа';
                state.loading = false;
                state.isAuthenticated = false;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
