import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addTask = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/tasks" }),
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
    }),
    getTask: builder.query({
      query: () => ({
        url: "/",
        method: "get",
      }),
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `/${data.id}`,
        method: "PUT",
        body: { completed: data.completed },
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        body: {},
      }),
    }),
  }),
});

export const {
  useAddTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = addTask;

export const { reducer: taskReducer, middleware: taskMiddleware } = addTask;
