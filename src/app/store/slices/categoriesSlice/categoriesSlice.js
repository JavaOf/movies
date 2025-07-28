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
    builder
      .addCase(getCategoriesFilms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoriesFilms.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.filmsByYear[payload.year] = payload.results;
      })
      .addCase(getCategoriesFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getCategoriesSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoriesSeries.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.seriesByYear[payload.year] = payload.results;
      })
      .addCase(getCategoriesSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopularMovies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.popularMovies = payload.results;
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getTopRatedSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopRatedSeries.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.topRatedSeries = payload.results;
      })
      .addCase(getTopRatedSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getNowPlayingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNowPlayingMovies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.nowPlayingMovies = payload.results;
      })
      .addCase(getNowPlayingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getTopActors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopActors.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.topActors = payload.results;
      })
      .addCase(getTopActors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
