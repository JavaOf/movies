import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosApi from "../../../../shared/api/axiosApi"


export const getCategoriesSeries = createAsyncThunk('get/categoriesSeries',
    async (year) => {
        try {
            const response = await axiosApi(`discover/tv`, {
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