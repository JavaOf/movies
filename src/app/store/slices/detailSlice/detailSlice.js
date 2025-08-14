import { createSlice } from '@reduxjs/toolkit';
import { getDetail, getTrailer } from './detailThunk';

const initialState = {
  detailState: {}, // { [genreId]: { movies: [], totalPages: 1, currentPage: 1 } }
  trailers: {}, // { [movieId]: trailer }
  loading: false,
  error: null,
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Detail
      .addCase(getDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detailState[action.payload.genreId] = {
          movies: action.payload.movies,
          currentPage: action.payload.page,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(getDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Trailer
      .addCase(getTrailer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTrailer.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.trailer) {
          state.trailers[action.payload.movieId] = action.payload.trailer;
        }
      })
      .addCase(getTrailer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default detailSlice.reducer;
