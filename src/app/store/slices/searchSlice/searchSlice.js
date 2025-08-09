import { createSlice } from '@reduxjs/toolkit';
import { searchMovies } from './searchThunk';

const initialState = {
  searchResults: {
    movie: [],
    tv: [],
    query: '',
  },
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, { payload }) => {
        state.loading = false;
        const { mediaType, query, results } = payload;
        state.searchResults[mediaType] = results;
        state.searchResults.query = query;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default searchSlice.reducer;
