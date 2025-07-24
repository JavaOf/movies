import { createSlice } from '@reduxjs/toolkit';
import { getCategoriesFilms } from './categoriesFilmsThunk';

const initialState = {
  categoriesFilmsState: {}, 
  categoriesFilmsLoading: false,
  categoriesFilmsError: null
};

const categoriesFilmsSlice = createSlice({
  name: 'categoriesFilms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesFilms.pending, (state) => {
        state.categoriesFilmsLoading = true;
      })
      .addCase(getCategoriesFilms.fulfilled, (state, { payload }) => {
        state.categoriesFilmsLoading = false;
        const { year, results } = payload;
        state.categoriesFilmsState[year] = results;
      })
      .addCase(getCategoriesFilms.rejected, (state, { payload }) => {
        state.categoriesFilmsError = payload;
        state.categoriesFilmsLoading = false;
      });
  }
});

export default categoriesFilmsSlice.reducer;
