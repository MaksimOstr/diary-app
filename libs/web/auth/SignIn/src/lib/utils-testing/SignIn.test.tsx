import { render, screen, fireEvent, store, authApiSlice } from "@diary-app/shared"
import { SignIn } from "../ui-SignIn/SignIn"
import React from 'react'
import { act, renderHook } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Route, RouteObject, Routes } from "react-router-dom"
import '@testing-library/jest-dom'
import Form from "../features-SignIn/components/Form"
import { server } from "globalShared"
import { http } from "msw"
import { useLoginMutation } from "@diary-app/shared"
import { AllTheProviders } from "@diary-app/shared"
import { Box } from "@mui/material"




describe('SignIn UI tests', () => {
    test('UI render', () => {
        const { getByTestId, getByLabelText, getByText } = render(
            <BrowserRouter>
                <SignIn />
            </BrowserRouter>
        )

        const title = getByTestId('formTitle')
        const submitButton = getByTestId('submitBtn')
        const firstInput = getByLabelText(/username/i)
        const secondtInput = getByLabelText(/password/i)
        const question = getByText(/still don't have an account?/i)
        const link = getByText(/signup/i)
        const formBody = getByTestId('formBody')

        expect(submitButton).toBeInTheDocument()
        expect(firstInput).toBeInTheDocument()
        expect(secondtInput).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(question).toBeInTheDocument()
        expect(link).toBeInTheDocument()
        expect(formBody).toBeInTheDocument()
    })

    test('Submitting the form with empty fields', async () => {

        const { getByTestId, findByTestId } = render(
            <BrowserRouter>
                <Form />
            </BrowserRouter>
        )

        const firstInput = getByTestId('usernameField')
        const submitButton = await findByTestId('submitBtn')

        expect(firstInput).not.toBeInvalid()

        await act(() => {
            fireEvent.submit(submitButton)
        });

        expect(getByTestId('usernameField')).toBeInvalid()
        expect(getByTestId('passwordField')).toBeInvalid()
    })

    test('Submitting the form with wrong username or password', async () => {
        const { getByTestId, findByRole, findByText } = render(
            <BrowserRouter>
                <Form />
            </BrowserRouter>
        )
        await act(() => {
            fireEvent.input(getByTestId('usernameField'), {
                target: {
                    value: 'example'
                }
            })

            fireEvent.input(getByTestId('passwordField'), {
                target: {
                    value: '1212'
                }
            })

            fireEvent.submit(getByTestId('submitBtn'))
        })

        expect(await findByText(/username or password is incorrect/i)).toBeInTheDocument()
        expect(getByTestId('usernameField')).toHaveValue('')
        expect(getByTestId('passwordField')).toHaveValue('')
    })


    test('Submitting with correct username and password', async () => {
        const { getByTestId, findByRole, findByText } = render(
            <MemoryRouter initialEntries={['/form']}>
                <Routes>
                    <Route path="form" element={<Form />} />
                    <Route path="/" element={<Box>MainPage</Box>} />
                </Routes>
            </MemoryRouter>
        )
        await act(() => {
            fireEvent.input(getByTestId('usernameField'), {
                target: {
                    value: 'test'
                }
            })

            fireEvent.input(getByTestId('passwordField'), {
                target: {
                    value: '1212'
                }
            })

            fireEvent.submit(getByTestId('submitBtn'))
        })

        expect(await findByText(/Authorization is successful! Hello test!/i)).toBeInTheDocument()
        expect(await findByText(/mainpage/i)).toBeInTheDocument()
    })


    test("redirect by link", async () => {
        const { getByTestId, getByText } = render(
            <MemoryRouter initialEntries={["/SignIn"]}>
                <Routes>
                    <Route path="SignIn" element={<SignIn />} />
                    <Route path="/SignUp" element={<Box>Sign up page</Box>} />
                </Routes>
            </MemoryRouter>
        )
        fireEvent.click(getByText(/signup/i))

        expect(getByText(/sign up page/i)).toBeInTheDocument()
    })

    test("Fields with not suitable format", async () => {
        const { getByTestId, getByRole, getByText } = render(
            <BrowserRouter>
                <Form />
            </BrowserRouter>
        )

        await act(() => {
            fireEvent.input(getByTestId("usernameField"), {
                target: {
                    value: 'te'
                }
            })
            fireEvent.input(getByTestId("passwordField"), {
                target: {
                    value: '12'
                }
            })

            fireEvent.submit(getByRole('button'))
        })

        expect(getByText(/username length should be at least 3 characters/i)).toBeInTheDocument()
        expect(getByText(/password length should be at least 4 characters/i)).toBeInTheDocument()
    })
})