import { createSlice } from "@reduxjs/toolkit";
import { IAuthInitial, ITask } from "../types/types";
import { authApiSlice } from "../api/auth-api/auth-api-slice";


interface ITasks {
    tasks: ITask[]
}

const TaskSlice = createSlice({
    name: 'taskSlice',
    initialState: {
        tasks: []
    } as ITasks,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApiSlice.endpoints.getTasks.matchFulfilled,
            (state, { payload }) => {
                state.tasks = payload
            }
        )
    }

})

export const { setTasks } = TaskSlice.actions
export default TaskSlice.reducer