import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosApi from "../../../../shared/api/axiosApi"
import axios from "axios";


export const getCategoriesFilms = createAsyncThunk('get/categoriesFilms',
    async (year) => {
        try {
            const response = await axiosApi(`discover/movie`, {
                params: {
                    primary_release_year: year,
                    sort_by: 'popularity.desc',
                    language: 'ru-RU',
                }
            });
            return response.data;
        } catch (err) {
            console.error('Ошибка при получении данных: ', err)
        }
    }
);
