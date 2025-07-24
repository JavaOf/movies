import { createSlice } from "@reduxjs/toolkit";
import { getPopularMovies } from "./bannerThunk";

const initialState = {
    popularState: [],
    popularError: null,
    popularLoading: false
};

export const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPopularMovies.pending, (state) => {
                state.popularLoading = true;
                state.popularState = null;
            })
            .addCase(getPopularMovies.fulfilled, (state, { payload }) => {
                state.popularLoading = false;
                state.popularState = payload;
            })
            .addCase(getPopularMovies.rejected, (state, { payload }) => {
                state.popularError = payload;
                state.popularLoading = false;
            })
    }
});

export default bannerSlice.reducer;