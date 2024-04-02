import { authApiSlice, store } from "@diary-app/shared"
import { redirect } from "react-router-dom"

export const mainPageLoader = async () => {
    const isAuth = store.getState().auth.isAuth
    console.log('Лоадер')
    if(isAuth) {
        console.log('fethcing')
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
        await store.dispatch(authApiSlice.endpoints.refreshToken.initiate())
        const fetchUser = store.dispatch(authApiSlice.endpoints.fetchUser.initiate())
        try {
            const response = await fetchUser.unwrap()
            return response
        } catch (error) {
            return redirect('/SignIn')
        } finally {
            fetchUser.unsubscribe()
        }
    }
}
