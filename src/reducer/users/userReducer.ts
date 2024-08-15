import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IRootState } from '@/store';

interface UserState {
    auth: {
        isUserAuthenticated: boolean;
        bearerToken: string;
        roles: string[];
        userRolesandPermissions: string[];
    };
}

const userState: UserState = {
    auth: {
        isUserAuthenticated: true,
        bearerToken: '',
        roles: [],
        userRolesandPermissions: [],
    },
};

export const userReducer = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        authUser: (state, action: PayloadAction<object>) => {
            state.auth = { ...state.auth, ...action.payload };
        },
    },
});

export const { authUser } = userReducer.actions;
export default userReducer.reducer;
