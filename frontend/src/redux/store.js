import { configureStore } from "@reduxjs/toolkit";
import { addTask } from "./taskSlice/taskApi";

export const store = configureStore({
  reducer: {
    [addTask.reducerPath]: addTask.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(addTask.middleware),
});
