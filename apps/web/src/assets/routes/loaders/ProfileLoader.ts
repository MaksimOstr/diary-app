import { authApiSlice, ITask, store } from "@diary-app/shared"
import { redirect } from "react-router-dom"

const mainPageLoader = async () => {
    if(localStorage.getItem('token')) {
        await store.dispatch(authApiSlice.endpoints.fetchUser.initiate())
        return null
    }
    return null
}
export default mainPageLoader
