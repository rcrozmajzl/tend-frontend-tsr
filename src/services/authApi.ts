import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import authHeader from '../helpers/authHeader';


export const authApi = createApi ({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/v1"
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body: { username: string; password: string }) => ({
                    url: "/auth/login",
                    method: "POST",
                    body
            }),
        }),
        
        registerUser: builder.mutation({
            query: (body: { username: string; email: string; password: string; birthdate: string; location: string; avatar: string }) => ({
                    url: "/register",
                    method: "POST",
                    body
            }),
        }),
        
        updateUser: builder.mutation({
            query: ({username, email, password, birthdate, location, avatar }) => ({
                    url: `/user/${username}`,
                    method: "PATCH",
                    headers: authHeader(),
            }),
        }),

        deleteUser: builder.mutation({
            query: () => ({
                url: "/register",
                method: "DELETE",
                headers: authHeader()
            }),
        }),
        
        fetchOtherUsers: builder.query({
            query: () => ({
                url: "/users/other_users",
                method: "GET",
                headers: authHeader()
            }),
        }),
        
    }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useUpdateUserMutation, useFetchOtherUsersQuery } = authApi;