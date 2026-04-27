import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
};

const slice = createSlice({
    name: 'mainApp',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        }
    }
});

export const { setUsers } = slice.actions;
export default slice.reducer;

// const slice = {
//     name: "mainApp",

//     reducer: function(state, action) {
//         // generated reducer logic
//     },

//     actions: {
//         setUsers: function(payload) {
//             return {
//                 type: "mainApp/setUsers",
//                 payload
//             };
//         }
//     }
// };