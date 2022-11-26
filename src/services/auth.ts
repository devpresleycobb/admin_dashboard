import { RootState } from '@/app/store';
import { IAMCredentials } from '@/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL + '/' + import.meta.env.VITE_ENV,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.idToken;
            if (token) {
              headers.set('Authorization', token)
            }
            return headers
          },
    }),
    endpoints: (builder) => ({
        getCredentials: builder.mutation<IAMCredentials, string>({
            query: id_token => ({
                url: '/user/credentials',
                method: 'POST',
                body: {
                    id_token
                }
            })
        }),
        createUser: builder.mutation<void, void>({
            query: () => ({
                url: '/user/create',
                method: 'POST'
            })
        })
    })
});

export const { useGetCredentialsMutation } = authApi;
export const { useCreateUserMutation } = authApi;

