import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { selectUserPool, setLoggedIn, setLoginError, setNewPasswordError, setLoading, setIdToken, setCredentials, setUsername, setLoginFormType, setUser, selectUser, selectIdToken } from '@/features/user/userSlice';
import { AuthenticationDetails, CognitoUser, CognitoUserSession, IAuthenticationCallback, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useGetCredentialsMutation, useCreateUserMutation } from '@/services/auth';
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
import { IIdToken } from "@/interfaces";

export default function useAuth() {
    const userPool = useAppSelector(selectUserPool);
    const user = useAppSelector(selectUser);
    const idToken = useAppSelector(selectIdToken);
    const INVALID_USERNAME_OR_PASSWORD = 'Incorrect username or password.';
    const USERNAME_AND_PASSWORD_REQUIRED = 'Username and password are required.';
    const INVALID_NEW_PASSWORD = 'Invalid new password.';
    const dispatch = useAppDispatch();
    const [getCredentials] = useGetCredentialsMutation();
    const [createUser] = useCreateUserMutation();

    const refreshSessionCallback = (resolve: any, reject: any) =>
        async (err: Error | null, _session: CognitoUserSession) => {
            if (err) {
                reject(err);
                return;
            }
            const idToken = _session.getIdToken();
            const credentials = JSON.parse(Cookies.get('credentials') || '{}');
            if (!credentials.data) {
                const credentials = await getCredentials(idToken.getJwtToken());
                const expiresAt = new Date();
                expiresAt.setHours(expiresAt.getHours() + 1)
                Cookies.set('credentials', JSON.stringify(credentials), { expires: expiresAt, secure: true });
            }
            dispatch(setCredentials(credentials.data));
            resolve();
        }

    const newPasswordCallback = {
        onSuccess: (session: CognitoUserSession) => {
            dispatch(setLoggedIn(true));
            dispatch(setLoading(false));
            const token = session.getIdToken().getJwtToken();
            console.log('got the token')
            dispatch(setIdToken(token));
            maybeCreateUserRecord();
        },
        onFailure: (err: Error | null) => {
            dispatch(setNewPasswordError(INVALID_NEW_PASSWORD));
            dispatch(setLoading(false));
        }
    }

    const getUser = (Username: string): CognitoUser => {
        return new CognitoUser({
            Username,
            Pool: userPool
        });
    }

    const logout = () => {
        if (user) {
            dispatch(setLoginFormType('login'));
            user.signOut();
        }
        dispatch(setLoggedIn(false));
        dispatch(setIdToken(''));
        Cookies.remove('credentials');
    }

    const forgotPassword = (username: string) => {
        const user = getUser(username);
        dispatch(setUser(user))
        user?.forgotPassword({
            onSuccess: function (data) {
                // successfully initiated reset password request
                console.log('CodeDeliveryData from forgotPassword: ' + data);
                dispatch(setLoginFormType('verifyCode'));
            },
            onFailure: function (err) {
                alert(err.message || JSON.stringify(err));
            }
        });
    }

    const completeForgottenPasswordFlow = (code: string, newPassword: string) => {
        user?.confirmPassword(code, newPassword, {
            onSuccess: function () {
                console.log('completeForgottenPasswordFlow: success');
                maybeCreateUserRecord();
                dispatch(setLoggedIn(true));
            },
            onFailure: function (err) {
                alert(err.message || JSON.stringify(err));
            }
        });
    }
    
    const maybeCreateUserRecord = async () => {
        const _idToken = await user?.getSignInUserSession()?.getIdToken().getJwtToken() || '';
        dispatch(setIdToken(_idToken));
        const token: IIdToken = jwtDecode(_idToken);
        if (!token['custom:created']) {
            const attribute = new CognitoUserAttribute({ Name: 'custom:created', Value: '1' });
            user?.updateAttributes([attribute], function (err, result) {
                if (err) {
                    throw new Error('Unable to update user attributes.');
                }
                createUser();
            });
        }
    }

    const attemptLogin = (): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
            const user = userPool.getCurrentUser();
            if (!user) {
                reject(false);
                return;
            }
            user.getSession(async (err: Error | null, session: CognitoUserSession) => {
                try {
                    const idToken = session.getIdToken().getJwtToken()
                    dispatch(setIdToken(idToken));
                    const refreshToken = session.getRefreshToken();
                    const callback = refreshSessionCallback(resolve, reject);
                    user.refreshSession(refreshToken, callback)
                    resolve(true);
                } catch (error) {
                    user.signOut();
                    reject(false);
                }
            })
        });
    }
    const AuthenticationCallback: IAuthenticationCallback = {
        onSuccess: (session) => {
            const idToken = session.getIdToken().getJwtToken();
            Cookies.set('idToken', idToken, { expires: 1, secure: true });
            Cookies.set('refreshToken', session.getRefreshToken().getToken(), { expires: 30, secure: true });
            dispatch(setLoggedIn(true));
            dispatch(setLoading(false));
        },
        onFailure: (err) => {
            if (err.message === INVALID_USERNAME_OR_PASSWORD) {
                setLoginError(INVALID_USERNAME_OR_PASSWORD);
            }
            if (err.message === 'Password reset required for the user') {
                dispatch(setLoginFormType('verifyCode'));
            }
            dispatch(setLoading(false));
        },
        newPasswordRequired: function () {
            dispatch(setLoginFormType('newPassword'));
            dispatch(setLoading(false));
        }
    }

    const login = (username: string, password: string) => {
        dispatch(setLoading(true));
        dispatch(setLoginError(''));
        if (!username || !password) {
            dispatch(setLoginError(USERNAME_AND_PASSWORD_REQUIRED));
            dispatch(setLoading(false));
            return;
        }
        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password
        });
        const user = getUser(username)
        dispatch(setUser(user))
        user.authenticateUser(authDetails, AuthenticationCallback)
    }

    const submitNewPassword = async (newPassword: string) => {
        dispatch(setLoading(true));
        user?.completeNewPasswordChallenge(newPassword, [], newPasswordCallback);
    }

    return {
        login,
        submitNewPassword,
        attemptLogin,
        forgotPassword,
        completeForgottenPasswordFlow,
        logout
    }
}
