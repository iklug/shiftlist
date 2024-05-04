import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        value: [
            {
                id: "tab1",
                active: true,
                title: "1",
                tasks: [{ id: uuidv4(), value: "", completed: false }],
                indented: false,
                completed: false,
            },
        ],
        shiftTitle: "",
        shiftId: null,
    },
    reducers: {
        setShift: (state, action) => {
            state.shiftTitle = action.payload.title;
            state.value = action.payload.tabs;
            state.shiftId = action.payload._id;
        },
        setShiftId: (state, action) => {
            state.shiftId = action.payload;
        },
        setTitle: (state, action) => {
            state.shiftTitle = action.payload;
        },
        newTab: (state) => {
            const clone = state.value.map((item) => ({
                ...item,
                active: false,
            }));
            clone.push({
                id: uuidv4(),
                active: true,
                title: `${state.value.length + 1}`,
                tasks: [
                    {
                        id: uuidv4(),
                        value: "",
                        completed: false,
                        indented: false,
                    },
                ],
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
        newTask: (state, action) => {
            const update = state.value.map((tab) =>
                tab.active
                    ? {
                          ...tab,
                          tasks: [
                              ...tab.tasks,
                              {
                                  id: uuidv4(),
                                  value: action.payload || "",
                                  completed: false,
                                  indented: false,
                              },
                          ],
                      }
                    : { ...tab }
            );
            state.value = update;
        },
        addTaskAllTabs: (state, action) => {
            const update = state.value.map((tab) => ({
                ...tab,
                tasks: [
                    ...tab.tasks,
                    {
                        id: uuidv4(),
                        value: action.payload,
                        completed: false,
                        indented: false,
                    },
                ],
            }));
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
        indentTask: (state, action) => {
            console.log("here we goooo");
            const update = state.value.map((tab) =>
                tab.active
                    ? {
                          ...tab,
                          tasks: tab.tasks.map((task) =>
                              task.id === action.payload
                                  ? { ...task, indented: !task.indented }
                                  : { ...task }
                          ),
                      }
                    : { ...tab }
            );

            state.value = update;
        },
        updateTab: (state, action) => {
            const { value } = action.payload;
            const { id } = action.payload;
            const update = state.value.map((tab) =>
                tab.id === id ? { ...tab, title: value } : { ...tab }
            );

            state.value = update;
        },
        deleteTask: (state, action) => {
            const id = action.payload;
            const update = state.value.map((tab) =>
                tab.active
                    ? {
                          ...tab,
                          tasks: tab.tasks.filter((task) => task.id !== id),
                      }
                    : { ...tab }
            );

            state.value = update;
        },
        deleteTab: (state, action) => {
            const id = action.payload;
            state.value = state.value.filter((tab) => tab.id !== id);
            state.value[0].active = true;
        },
        resetShift: (state) => {
            state.shiftTitle = "";
            state.shiftId = null;
            state.value = [
                {
                    id: "tab1",
                    active: true,
                    title: "1",
                    tasks: [{ id: uuidv4(), value: "", completed: false }],
                    indented: false,
                    completed: false,
                },
            ];
        },
    },
});

export const {
    setShift,
    setShiftId,
    setTitle,
    newTab,
    updateTask,
    viewTab,
    newTask,
    completeTask,
    deleteTask,
    deleteTab,
    updateTab,
    indentTask,
    addTaskAllTabs,
    resetShift,
} = taskSlice.actions;
// export const selectTask = (index, id) => (state) => state.value[index];
export const activeTab = (state) =>
    state.tasks.value.find((tab) => tab.active === true);
export const totalTabs = (state) => state.tasks.value;
export const shiftTitle = (state) => state.tasks.shiftTitle;
export const selectShift = ({ tasks: { shiftTitle, value, shiftId } }) => ({
    title: shiftTitle,
    tabs: value,
    _id: shiftId,
});
// state.value.find((tab) => tab.active === true);
export default taskSlice.reducer;
