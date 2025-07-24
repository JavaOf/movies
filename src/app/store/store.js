import { configureStore } from '@reduxjs/toolkit';
import bannerReducer from './slices/bannerSlices/bannerSlice.js';
import categoriesFilmsReducer  from './slices/categoriesFilmsSlice/categoriesFilmsSlice.js';
import categoriesSeriesReducer from './slices/categoriesSeriesSlice/categoriesSeriesSlice.js';
import saveReducer from './slices/saveSlices/saveSlice.js';
import authReducer from './auth/authSlice.js';

const store = configureStore({
    reducer: {
        bannerSlice: bannerReducer,
        categoriesFilmsSlice: categoriesFilmsReducer,
        categoriesSeriesSlice: categoriesSeriesReducer,
        saveSlice: saveReducer,
        authSlice: authReducer,
    },
});

export default store;