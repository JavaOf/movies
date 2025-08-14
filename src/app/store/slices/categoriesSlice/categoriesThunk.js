import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../shared/api/axiosApi';

export const getCategoriesFilms = createAsyncThunk(
  'categories/getCategoriesFilms',
  async (year, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('discover/movie', {
        params: {
          primary_release_year: year,
          language: 'en-US',
        },
      });
      return { year, movies: data.results };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCategoriesSeries = createAsyncThunk(
  'categories/getCategoriesSeries',
  async (year, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('discover/tv', {
        params: {
          first_air_date_year: year,
          language: 'en-US',
        },
      });
      return { year, series: data.results };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPopularMovies = createAsyncThunk(
  'categories/getPopularMovies',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('movie/popular', {
        params: { language: 'en-US' },
      });
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTopRatedSeries = createAsyncThunk(
  'categories/getTopRatedSeries',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('tv/top_rated', {
        params: { language: 'en-US' },
      });
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getNowPlayingMovies = createAsyncThunk(
  'categories/getNowPlayingMovies',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('movie/now_playing', {
        params: { language: 'en-US' },
      });
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTopActors = createAsyncThunk(
  'categories/getTopActors',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('person/popular', {
        params: { language: 'en-US' },
      });
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);