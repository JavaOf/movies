import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
    'auth/register',
    async (form, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://6881e60b66a7eb81224c8c6b.mockapi.io/auth/register/users', form);
            console.log(response);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка при отправке данных');
        }
    }
);