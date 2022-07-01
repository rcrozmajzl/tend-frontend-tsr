import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Needs } from '../features/needsSlice';
import { Users } from '../features/userSlice';
import { UserNeeds, IUserNeeds } from '../features/userNeedsSlice';
import authHeader from '../helpers/authHeader';


export const authApi = createApi ({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/v1"
    }),
    // tagTypes: ['Auth', 'Need', 'User'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body: { username: string; password: string }) => ({
                    url: "/auth/login",
                    method: "POST",
                    body
            }),
            // invalidatesTags: ['Auth']
        }),
        
        registerUser: builder.mutation({
            query: (body: { username: string; email: string; password: string; birthdate: string; location: string; avatar: string }) => ({
                    url: "/register",
                    method: "POST",
                    body
            }),
            // invalidatesTags: ['Auth']
        }),
        
        updateUser: builder.mutation({
            query: ({username, email, password, birthdate, location, avatar }) => ({
                    url: `/user/${username}`,
                    method: "PATCH",
                    headers: authHeader(),
            }),
            // invalidatesTags: ['Auth']
        }),

        deleteUser: builder.mutation({
            query: () => ({
                url: "/register",
                method: "DELETE",
                headers: authHeader()
            }),
            // invalidatesTags: ['Auth']
        }),
        
        fetchUsers: builder.query<Users[], void>({
            query: () => ({
                url: "/users",
                method: "GET",
                headers: authHeader()
            }),
            // providesTags: ['Auth']
        }),

        fetchNeeds: builder.query<Needs[], void>({
            query: () => ({
                url: "/needs",
                method: "GET",
                headers: authHeader()
            }),
            // providesTags: ['Auth']
        }),
        
        fetchUserNeeds: builder.query<UserNeeds[], void>({
            query: () => ({
                url: "/user_needs",
                method: "GET",
                headers: authHeader()
            }),

        }),

    }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useUpdateUserMutation, useFetchUsersQuery, useFetchNeedsQuery, useFetchUserNeedsQuery } = authApi;