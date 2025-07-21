import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import authSlice  from './authSlice'
const store = configureStore({
    reducer: {
        auth: authSlice, // <-- Register your auth slice here
    }
});

export default store;