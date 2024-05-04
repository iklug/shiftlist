import { createSlice } from "@reduxjs/toolkit";

const savedTasksSlice = createSlice({
    name: "savedTasks",
    initialState: {
        value: [],
    },
    reducers: {
        addSavedTask: (state, action) => {
            state.value.unshift(action.payload);
        },
        addAllSavedTasks: (state, action) => {
            state.value = action.payload;
        },
        deleteSavedTask: (state, action) => {
            state.value = state.value.filter(
                (task) => task._id !== action.payload
            );
        },
    },
});

export const { addSavedTask, addAllSavedTasks, deleteSavedTask } =
    savedTasksSlice.actions;
export const selectSavedTasks = (state) => state.savedTasks.value;
export default savedTasksSlice.reducer;
