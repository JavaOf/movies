import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../shared/api/axiosApi';

export const getCategoriesFilms = createAsyncThunk('categories/getFilms', async (year) => {
  const response = await axiosApi('discover/movie', {
    params: {
      primary_release_year: year,
      sort_by: 'popularity.desc',
    },
  });
  return { type: 'films', year, results: response.data.results };
});

export const getCategoriesSeries = createAsyncThunk('categories/getSeries', async (year) => {
  const response = await axiosApi('discover/tv', {
    params: {
      first_air_date_year: year,
      sort_by: 'popularity.desc',
    },
  });
  return { type: 'series', year, results: response.data.results };
});

export const getPopularMovies = createAsyncThunk('categories/getPopularMovies', async () => {
  const response = await axiosApi('movie/popular');
  return { type: 'popularMovies', results: response.data.results };
});

export const getTopRatedSeries = createAsyncThunk('categories/getTopRatedSeries', async () => {
  const response = await axiosApi('tv/top_rated');
  return { type: 'topRatedSeries', results: response.data.results };
});

export const getNowPlayingMovies = createAsyncThunk('categories/getNowPlayingMovies', async () => {
  const response = await axiosApi('movie/now_playing');
  return { type: 'nowPlayingMovies', results: response.data.results };
});

export const getTopActors = createAsyncThunk('categories/getTopActors', async () => {
  const response = await axiosApi('person/popular');
  return { type: 'topActors', results: response.data.results };
});


