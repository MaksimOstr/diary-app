import { authApiSlice, store } from "@diary-app/shared"
import { redirect } from "react-router-dom"

export const mainPageLoader = async () => {
    if(localStorage.getItem('token')) {
        await store.dispatch(authApiSlice.endpoints.fetchUser.initiate())
        return null
    }
    return null
}
