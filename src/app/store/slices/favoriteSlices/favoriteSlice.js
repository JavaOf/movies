import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoritesList: [],
};

const favoriteSlice = createSlice({
    name: 'favoriteSlice',
    initialState,
    reducers: {
        addToFavorites: (state, {payload}) => {
            const idx = state.favoritesList.findIndex((item) => {
                return item.id === payload;
            });

            if(idx === -1){
                return {
                    ...state,
                    favoritesList: [...state, payload]
                }
            }
        }
    }
});

export const {} = favoriteSlice.actions;
export default favoriteSlice.reducer;