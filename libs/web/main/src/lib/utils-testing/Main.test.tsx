import { act, authApiSlice, fireEvent, getByText, render, screen, store, useAppDispatch } from "@diary-app/shared"
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom"
import { MainPage } from "../ui-MainPage/MainPage"
import '@testing-library/jest-dom'
import { Box } from "@mui/material"

describe('MainPage tests', () => {
    test("UI render test without auth", async () => {
        const { getByText, getByRole, rerender, getByTestId, getByPlaceholderText } = render(
            <MemoryRouter>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='SignIn' element={<Box>Sign in page</Box>}/>
                </Routes>
            </MemoryRouter>
        )

        expect(getByText(/diary/i)).toBeInTheDocument()
        expect(getByRole('button')).toBeInTheDocument()

        fireEvent.click(getByRole('button'))
        expect(getByText(/sign in page/i))
    })

    test('UI render after auth', async () => {
        const { getByText, getByRole, rerender, getByTestId, getByPlaceholderText } = render(
            <MemoryRouter>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                </Routes>
            </MemoryRouter>
        )


        await act(async () => {
            await store.dispatch(authApiSlice.endpoints.login.initiate({ username: 'test', password: '1212' }))
            await store.dispatch(authApiSlice.endpoints.fetchUser.initiate())
        })
        rerender(
            <BrowserRouter>
                <MainPage />
            </BrowserRouter>
        )

        expect(getByPlaceholderText(/search some tasks/i)).toBeInTheDocument()
        expect(getByText(/folder is empty!/i)).toBeInTheDocument()
        expect(getByPlaceholderText('MM/DD/YYYY')).toBeInTheDocument()


        await act(() => {
            fireEvent.input(getByPlaceholderText(/search some tasks/i), {
                target: {
                    value: 'test'
                }
            })
        })

        expect(getByText(/folder is empty!/i)).toBeInTheDocument()
    })



})