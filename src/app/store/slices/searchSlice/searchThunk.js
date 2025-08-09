import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../shared/api/axiosApi';

export const searchMovies = createAsyncThunk(
  'search/searchMovies',
  async ({ type, query }) => {
    try {
      const response = await axiosApi.get(`search/${type}`, {
        params: { query },
      });
      return {
        type: 'search',
        mediaType: type,
        query,
        results: response.data.results,
      };
    } catch (err) {
      console.error(err);
    }
  }
);
