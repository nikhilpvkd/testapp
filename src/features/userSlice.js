import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userNames: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserNames: (state, actions) => {
            console.log(actions.payload);
            const res = actions.payload?.map((user) => user.firstName + user.lastName);
            console.log(res);
            state.userNames = res;
        },
    },
});

export const { setUserNames } = userSlice.actions;
