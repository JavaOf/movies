import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from '../../../../shared/api/axiosApi';
const API_POPULAR = `movie/popular?language=ru-Rua&page=1`

export const getPopularMovies = createAsyncThunk('get/popular', async () => {
    try {
        const response = await axiosApi.get(API_POPULAR);
        return response.data;
    } catch (err) {
        console.error('Ошибка при получении данных', err);
    }
});