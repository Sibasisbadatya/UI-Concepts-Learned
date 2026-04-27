import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    color: "black",
};

const roleSlice = createSlice({
    name: 'roleApp',
    initialState,
    reducers: {
        changeColor: (state, action) => {
            state.color = action.payload;
        },
    },
});

export const { changeColor } = roleSlice.actions;
export default roleSlice.reducer;