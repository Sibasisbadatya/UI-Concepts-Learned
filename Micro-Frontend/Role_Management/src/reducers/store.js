import { configureStore } from '@reduxjs/toolkit';

import slice from './slice';
import userReducer from "UserCard/UserReducer";
import roleReducer from "RoleCard/RoleReducer";

const store = configureStore({
  reducer: {
    main: slice,
    role: roleReducer.default || roleReducer, 
    user: userReducer.default || userReducer
  },
});

export default store;