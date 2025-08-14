import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../shared/api/axiosApi';

export const getDetail = createAsyncThunk(
  'detail/getDetail',
  async ({ genreId, page = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`discover/movie`, {
        params: {
          with_genres: genreId,
          language: 'en-US',
          page, 
        },
      });
      return { genreId, movies: data.results, page, totalPages: data.total_pages };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
