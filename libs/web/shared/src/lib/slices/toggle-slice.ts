import { createSlice } from "@reduxjs/toolkit";
import { IAuthInitial, ITask } from "../types/types";
import { authApiSlice } from "../api/auth-api/auth-api-slice";




const ToggleSlice = createSlice({
    name: 'toggleSlice',
    initialState: {
        changeUsernameForm: false
    },
    reducers: {
        toggleChangeUsernameForm: (state) => {
            state.changeUsernameForm = !state.changeUsernameForm
        }
    }
})

export const { toggleChangeUsernameForm } = ToggleSlice.actions
export default ToggleSlice.reducer