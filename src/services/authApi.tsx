import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Auth } from '../models/auth.model';
import { Need } from '../models/need.model';
import { User } from '../models/user.model';
import { UserNeed } from '../models/userNeed.model';
import authHeader from '../helpers/authHeader';


export const authApi = createApi ({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/v1"
    }),
    // tagTypes: ['Auth', 'Need', 'User'],
    endpoints: (builder) => ({
        loginUser: builder.mutation<Auth, string | object>({
            query: (body: { username: string; password: string }) => ({
                    url: "/auth/login",
                    method: "POST",
                    body
            }),
            // invalidatesTags: ['Auth']
        }),
        
        registerUser: builder.mutation<Auth, string | number | object>({
            query: (body: { username: string; email: string; password: string; birthdate: string; location: string; avatar: string }) => ({
                    url: "/register",
                    method: "POST",
                    body
            }),
            // invalidatesTags: ['Auth']
        }),
        
        updateUser: builder.mutation<Auth, string | number | object>({
            query: (body: { id: number; username: string; email: string; password: string; birthdate: string; location: string; avatar: string }) => ({
                    url: `/users/${body.id}`,
                    method: "PATCH",
                    headers: authHeader(),
                    body
            }),
            // invalidatesTags: ['Auth']
        }),

        deleteUser: builder.mutation<Auth, string | number | object>({
            query: () => ({
                url: "/register",
                method: "DELETE",
                headers: authHeader()
            }),
            // invalidatesTags: ['Auth']
        }),
        
        fetchUsers: builder.query<User[], void>({
            query: () => ({
                url: "/users",
                method: "GET",
                headers: authHeader()
            }),
            // providesTags: ['Auth']
        }),

        fetchNeeds: builder.query<Need[], void>({
            query: () => ({
                url: "/needs",
                method: "GET",
                headers: authHeader()
            }),
            // providesTags: ['Auth']
        }),
        
        fetchUserNeeds: builder.query<UserNeed[], void>({
            query: () => ({
                url: "/user_needs",
                method: "GET",
                headers: authHeader()
            }),
        }),

        newUserNeed: builder.mutation<UserNeed, string | number | object>({
            query: (body: { details_personal: string; rating_importance: number; rating_frequency: number; user_id: number; need_id: number }) => ({
                url: "/user_needs",
                method: "POST",
                body
            }),
        }),

        updateUserNeed: builder.mutation<UserNeed, string | number | object>({
            query: (body: { id: number; details_personal: string; rating_importance: number; rating_frequency: number; user_id: number; need_id: number }) => ({
                    url: `/user_needs/${body.id}`,
                    method: "PATCH",
                    headers: authHeader(),
                    body
            }),
            // invalidatesTags: ['Auth']
        }),
    
        deleteUserNeed: builder.mutation<UserNeed, string | number | object>({
            query: (body: {id: number}) => ({
                url: `/user_needs/${body.id}`,
                method: "DELETE",
                headers: authHeader(),
                body
            }),
            // invalidatesTags: ['Auth']
        }),

    }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useUpdateUserMutation, useFetchUsersQuery, useFetchNeedsQuery, useFetchUserNeedsQuery, useNewUserNeedMutation } = authApi;