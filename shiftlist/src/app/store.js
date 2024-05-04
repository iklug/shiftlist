import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../redux/taskLists";
import savedTasksReducer from "../redux/savedTasks";
import miscStateReducer from "../redux/miscState";
export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        savedTasks: savedTasksReducer,
        miscState: miscStateReducer,
    },
});
