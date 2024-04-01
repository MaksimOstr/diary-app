import { authApiSlice, store } from "@diary-app/shared"
import { redirect } from "react-router-dom"

export const mainPageLoader = async () => {
    const refreshToken = await store.dispatch(authApiSlice.endpoints.refreshToken.initiate())
    const isAuth = store.getState().auth.isAuth
    console.log(refreshToken)
    if(isAuth) {
        const fetchUser = store.dispatch(authApiSlice.endpoints.fetchUser.initiate())
        try {
            const response = await fetchUser.unwrap()
            console.log(response)
            return response
        } catch (error) {
            return redirect('/SignIn')
        } finally {
            fetchUser.unsubscribe()
        }
    } else {
        return null
    }
}
