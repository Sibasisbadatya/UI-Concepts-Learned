import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    color:"black"
}

const slice = createSlice({
    name:'userApp',
    initialState,
    reducers:{
        changeColor:(state,action)=>{
            console.log("Sibasis");
            state.color = action.payload;
        }

    }
});

export const {changeColor} = slice.actions;
export default slice.reducer;