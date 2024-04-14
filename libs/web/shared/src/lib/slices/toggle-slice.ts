import { createSlice } from "@reduxjs/toolkit";
import { IAuthInitial } from "../types/types";
import { authApiSlice } from "../api/auth-api/auth-api-slice";

const ToggleSlice = createSlice({
    name: 'toggleSlice',
    initialState: {
        createTask: false,
        userInfoPage: false
    } ,
    reducers: {
        toggleCreateTask(state) {
            state.createTask = !state.createTask
        },
        toggleUserInfoPage(state) {
            state.userInfoPage = !state.userInfoPage
        } 
    }
})

export const { toggleCreateTask, toggleUserInfoPage } = ToggleSlice.actions
export default ToggleSlice.reducer