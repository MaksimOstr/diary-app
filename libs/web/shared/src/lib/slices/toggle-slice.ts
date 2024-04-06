import { createSlice } from "@reduxjs/toolkit";
import { IAuthInitial } from "../types/types";
import { authApiSlice } from "../api/auth-api/auth-api-slice";

const ToggleSlice = createSlice({
    name: 'authSlice',
    initialState: {
        createTaskIsOpen: false
    } ,
    reducers: {
        openCreateTask(state) {
            state.createTaskIsOpen = !state.createTaskIsOpen
        }
    }
})

export const { openCreateTask } = ToggleSlice.actions
export default ToggleSlice.reducer