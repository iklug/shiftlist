import { createSlice } from "@reduxjs/toolkit";

const miscStateSlice = createSlice({
    name: "miscState",
    initialState: {
        value: {
            noShift: true,
            viewAll: false,
        },
    },
    reducers: {
        changeNoShift: (state, action) => {
            state.value.noShift = action.payload;
        },
        changeViewAll: (state, action) => {
            state.value.viewAll = action.payload;
        },
    },
});

export const { changeNoShift, changeViewAll } = miscStateSlice.actions;
export const selectNoShift = (state) => state.miscState.value.noShift;
export const selectViewAll = (state) => state.miscState.value.viewAll;
export default miscStateSlice.reducer;
