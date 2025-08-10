import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const registerUser = createAsyncThunk(
    'auth/register',
    async (form, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'https://6881e60b66a7eb81224c8c6b.mockapi.io/auth/register/users',
                form
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка при отправке данных');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (form, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'https://6881e60b66a7eb81224c8c6b.mockapi.io/auth/register/users'
            );
            const user = response.data.find(
                (u) => u.email === form.email && u.password === form.password
            );
            if (!user) {
                return rejectWithValue('Неверный email или пароль');
            }
            return user;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка при входе');
        }
    }
);
