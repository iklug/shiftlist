import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../redux/taskLists";

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
    },
});
