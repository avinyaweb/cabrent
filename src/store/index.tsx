import { configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import rootReducer from '@/reducer/rootReducer';
import { devToolsEnhancer } from '@reduxjs/toolkit/dist/devtoolsExtension';

export const store = configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof store.getState>;
export type IDispatch = typeof store.dispatch;
