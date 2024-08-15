import themeConfigSlice from '@/store/themeConfigSlice';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './users/userReducer';

export default combineReducers({
    themeConfig: themeConfigSlice,
    user: userReducer,
});
