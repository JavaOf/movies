import { configureStore } from '@reduxjs/toolkit';
import bannerReducer from './slices/bannerSlices/bannerSlice.js';
import categoriesReducer from './slices/categoriesSlice/categoriesSlice.js';
import saveReducer from './slices/saveSlices/saveSlice.js';
import authReducer from './auth/authSlice.js';
import searchReducer from './slices/searchSlice/searchSlice.js';
import detailReducer from './slices/detailSlice/detailSlice.js';

const store = configureStore({
    reducer: {
        bannerSlice: bannerReducer,
        categories: categoriesReducer, 
        saveSlice: saveReducer,
        authSlice: authReducer,
        searchSlice: searchReducer,
        detailSlice: detailReducer,
    },
});

export default store;