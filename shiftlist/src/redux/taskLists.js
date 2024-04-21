import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        value: [
            {
                id: "tab1",
                active: true,
                title: "1",
                tasks: [{ id: "task1", value: "", completed: false }],
            },
        ],
    },
    reducers: {
        newTab: (state) => {
            const clone = state.value.map((item) => ({
                ...item,
                active: false,
            }));
            clone.push({
                id: `tab${state.value.length + 1}`,
                active: true,
                title: `${state.value.length + 1}`,
                tasks: [{ id: "task1", value: "", completed: false }],
            });
            state.value = clone;
        },
        viewTab: (state, action) => {
            const update = state.value.map((tab) =>
                tab.id === action.payload
                    ? { ...tab, active: true }
                    : { ...tab, active: false }
            );
            state.value = update;
        },
        updateTask: (state, action) => {
            const { value } = action.payload;
            const { id } = action.payload;
            const update = state.value.map((tab) =>
                tab.active
                    ? {
                          ...tab,
                          tasks: tab.tasks.map((task) =>
                              task.id === id
                                  ? { ...task, value: value }
                                  : { ...task }
                          ),
                      }
                    : { ...tab }
            );

            state.value = update;
        },
        newTask: (state) => {
            const update = state.value.map((tab) =>
                tab.active
                    ? {
                          ...tab,
                          tasks: [
                              ...tab.tasks,
                              {
                                  id: `task${tab.tasks.length + 1}`,
                                  value: "",
                                  completed: false,
                              },
                          ],
                      }
                    : { ...tab }
            );
            state.value = update;
        },
        completeTask: (state, action) => {
            const update = state.value.map((tab) =>
                tab.active
                    ? {
                          ...tab,
                          tasks: tab.tasks.map((task) =>
                              task.id === action.payload
                                  ? { ...task, completed: !task.completed }
                                  : { ...task }
                          ),
                      }
                    : { ...tab }
            );

            state.value = update;
        },
    },
});

export const { newTab, updateTask, viewTab, newTask, completeTask } =
    taskSlice.actions;
// export const selectTask = (index, id) => (state) => state.value[index];
export const activeTab = (state) =>
    state.tasks.value.find((tab) => tab.active === true);
export const totalTabs = (state) => state.tasks.value;
// state.value.find((tab) => tab.active === true);
export default taskSlice.reducer;
