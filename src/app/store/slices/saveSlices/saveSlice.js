import { createSlice } from '@reduxjs/toolkit';

const saveList = JSON.parse(localStorage.getItem('cartLst')) || [];

const initialState = {
    saveList: saveList,
}


const saveSlice = createSlice({
    name: 'saveSlice',
    initialState,
    reducers: {
        addToSave: (state, { payload }) => {
            const movie = payload;
            const idx = state.saveList.findIndex((item) => {
                return item.id === movie.id;
            });
            if (idx === -1) {
                const updateSaveList = [...state.saveList, movie];
                localStorage.setItem('saveList', JSON.stringify(updateSaveList))
                return {
                    ...state,
                    saveList: updateSaveList,
                }
            }
            return state;
        },
        removeToSave: (state, { payload }) => {
            const movie = payload;
            state.saveList.filter((item) => {
                const updateSave = [...state.saveList, item.id !== movie.id]
                localStorage.setItem('cartList', JSON.stringify(updateSave))
                return {
                    saveList: updateSave,
                };
            })
        },
    },
});

export const { addToSave } = saveSlice.actions;

export default saveSlice.reducer;