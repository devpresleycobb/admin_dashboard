import { createApi } from '@reduxjs/toolkit/query/react';
import { IAMAuthorizedQuery } from './asyncMiddleware';

export const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: IAMAuthorizedQuery({
        baseUrl: import.meta.env.VITE_BASE_URL + '/' + import.meta.env.VITE_ENV
    }),
    endpoints: (builder) => ({
        getTest: builder.mutation<string, void>({
            query: () => ({
                url: '/',
                method: 'POST'
            })
        })
    })
});

export const { useGetTestMutation } = usersApi;
