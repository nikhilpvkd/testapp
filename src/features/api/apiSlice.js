import { nanoid } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/" }),
    tagTypes: ["users"],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => "/users",
            providesTags: ["users"],
        }),

        addUser: builder.mutation({
            query: (body) => ({
                url: "/users",
                method: "POST",
                body: {
                    id: nanoid(),
                    ...body,
                },
            }),
            invalidatesTags: ["users"],
        }),

        updateUser: builder.mutation({
            query: ({ id, body }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: {
                    ...body,
                },
            }),
            invalidatesTags: ["users"],
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["users"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useAddUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
} = api;
