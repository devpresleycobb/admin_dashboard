import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { IAMCredentials } from '@/interfaces';

interface User {
    userPool: CognitoUserPool;
    user?: CognitoUser;
    credentials: IAMCredentials;
    idToken: string;
    loggedIn: boolean;
    loginError: string;
    newPasswordError: string;
    loading: boolean;
    loginFormType: 'login' | 'newPassword' | 'verifyCode' | 'forgotPassword';
    username: string;
}

const getUserPool = (): CognitoUserPool => {
    const poolData = {
        UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
        ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID
    };
    return new CognitoUserPool(poolData);
}

const initialState: User = {
    userPool: getUserPool(),
    loggedIn: false,
    credentials: {
        AccessKeyId: '',
        SecretAccessKey: '',
        SessionToken: '',
        Expiration: ''
    },
    idToken: '',
    loginError: '',
    newPasswordError: '',
    loading: false,
    loginFormType: 'login',
    username: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIdToken: (state: User, action: PayloadAction<string>) => {
            state.idToken = action.payload;
        },
        setCredentials: (state: User, action: PayloadAction<IAMCredentials>) => {
            state.credentials = action.payload;
        },
        setLoggedIn: (state: User, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload;
        },
        setLoginError: (state: User, action: PayloadAction<string>) => {
            state.loginError = action.payload;
        },
        setNewPasswordError: (state: User, action: PayloadAction<string>) => {
            state.newPasswordError = action.payload;
        },
        setLoading: (state: User, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setLoginFormType: (state: User, action: PayloadAction<'login' | 'newPassword' | 'verifyCode' | 'forgotPassword'>) => {
            state.loginFormType = action.payload;
        },
        setUsername: (state: User, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setUser: (state: User, action: PayloadAction<CognitoUser>) => {
            state.user = action.payload;
        }
    }
});

export const selectUserPool = (state: RootState) => state.user.userPool;
export const selectCredentials = (state: RootState) => state.user.credentials;
export const selectIdToken = (state: RootState) => state.user.idToken;
export const selectLoggedIn = (state: RootState) => state.user.loggedIn;
export const selectLoginError = (state: RootState) => state.user.loginError;
export const selectNewPasswordError = (state: RootState) => state.user.newPasswordError;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectLoginFormType = (state: RootState) => state.user.loginFormType;
export const selectUsername = (state: RootState) => state.user.username;
export const selectUser = (state: RootState) => state.user.user;

export const { 
    setCredentials, 
    setIdToken, 
    setLoggedIn, 
    setLoginError, 
    setNewPasswordError, 
    setLoading, 
    setLoginFormType,
    setUsername,
    setUser
} = userSlice.actions;

export default userSlice.reducer;
