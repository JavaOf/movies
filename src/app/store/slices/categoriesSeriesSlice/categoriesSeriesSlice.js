import { createSlice } from '@reduxjs/toolkit';
import { getCategoriesSeries } from './categoriesSeriesThunk';

const initialState = {
  categoriesSeriesState: {}, 
  categoriesSeriesLoading: false,
  categoriesSeriesError: null
};

const categoriesSeriesSlice = createSlice({
  name: 'categoriesSeries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesSeries.pending, (state) => {
        state.categoriesSeriesLoading = true;
      })
      .addCase(getCategoriesSeries.fulfilled, (state, { payload }) => {
        state.categoriesSeriesLoading = false;
        const { year, results } = payload;
        state.categoriesSeriesState[year] = results;
      })
      .addCase(getCategoriesSeries.rejected, (state, { payload }) => {
        state.categoriesSeriesError = payload;
        state.categoriesSeriesLoading = false;
      });
  }
});

export default categoriesSeriesSlice.reducer;
