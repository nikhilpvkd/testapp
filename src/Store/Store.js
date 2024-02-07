import { configureStore } from "@reduxjs/toolkit";
import { api } from "../features/api/apiSlice";
import { userSlice } from "../features/userSlice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        users: userSlice.reducer,
    },
    middleware: (gdm) => gdm().concat(api.middleware),
});
