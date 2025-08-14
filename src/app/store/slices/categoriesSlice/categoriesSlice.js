import { createSlice } from '@reduxjs/toolkit';
import {
  getCategoriesFilms,
  getCategoriesSeries,
  getPopularMovies,
  getTopRatedSeries,
  getNowPlayingMovies,
  getTopActors,
} from './categoriesThunk';

const initialState = {
  filmsByYear: {},
  seriesByYear: {},
  popularMovies: [],
  topRatedSeries: [],
  nowPlayingMovies: [],
  topActors: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getCategoriesFilms
    builder
      .addCase(getCategoriesFilms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategoriesFilms.fulfilled, (state, action) => {
        state.loading = false;
        state.filmsByYear = {
          ...state.filmsByYear,
          [action.payload.year]: action.payload.movies,
        };
      })
      .addCase(getCategoriesFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getCategoriesSeries
      .addCase(getCategoriesSeries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategoriesSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.seriesByYear = {
          ...state.seriesByYear,
          [action.payload.year]: action.payload.series,
        };
      })
      .addCase(getCategoriesSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getPopularMovies
      .addCase(getPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload;
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getTopRatedSeries
      .addCase(getTopRatedSeries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTopRatedSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.topRatedSeries = action.payload;
      })
      .addCase(getTopRatedSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getNowPlayingMovies
      .addCase(getNowPlayingMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNowPlayingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.nowPlayingMovies = action.payload;
      })
      .addCase(getNowPlayingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getTopActors
      .addCase(getTopActors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTopActors.fulfilled, (state, action) => {
        state.loading = false;
        state.topActors = action.payload;
      })
      .addCase(getTopActors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;