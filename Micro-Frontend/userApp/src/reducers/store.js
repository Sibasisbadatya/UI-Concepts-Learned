import {configureStore} from '@reduxjs/toolkit';
import slice from './slice';

const store = configureStore({  
    reducer:{
        user:slice
    }
});

export { store };