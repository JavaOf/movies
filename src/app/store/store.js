import { configureStore } from '@reduxjs/toolkit';
import bannerReducer from './slices/bannerSlices/bannerSlice.js';
import categoriesReducer from './slices/categoriesSlice/categoriesSlice.js';
import saveReducer from './slices/saveSlices/saveSlice.js';
import authReducer from './auth/authSlice.js';
import searchReducer from './slices/searchSlice/searchSlice.js';

const store = configureStore({
    reducer: {
        bannerSlice: bannerReducer,
        categories: categoriesReducer, 
        saveSlice: saveReducer,
        authSlice: authReducer,
        searchSlice: searchReducer,
    },
});

export default store;