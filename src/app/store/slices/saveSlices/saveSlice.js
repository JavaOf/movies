import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    saveList: JSON.parse(localStorage.getItem('saveList')) || [],
};

const saveSlice = createSlice({
    name: 'saveSlice',
    initialState,
    reducers: {
        addToSave: (state, { payload }) => {
            const exists = state.saveList.some(item => item.id === payload.id);
            if (!exists) {
                state.saveList.push(payload);
                localStorage.setItem('saveList', JSON.stringify(state.saveList));
            }
        },
        removeToSave: (state, { payload }) => {
            state.saveList = state.saveList.filter(item => item.id !== payload.id);
            localStorage.setItem('saveList', JSON.stringify(state.saveList));
        },
    },
});

export const { addToSave, removeToSave } = saveSlice.actions;

export default saveSlice.reducer;
