import { render, screen, fireEvent, store, authApiSlice, findByText, act, getByText } from "@diary-app/shared"
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom"
import { SignUp } from '../ui-SignUp/SignUp'
import '@testing-library/jest-dom'
import { Box } from "@mui/material"
import Form from "../features-SignUp/components/Form"
import { server } from "globalShared"

// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())

describe('SignUp UI tests', () => {
    test('UI render', () => {
        const { getAllByText, getByTestId, getByRole, getByLabelText, getByText } = render(
            <BrowserRouter>
                <SignUp />
            </BrowserRouter>
        )

        expect(getAllByText(/sign up/i)).toHaveLength(2)
        expect(getByTestId('title')).toBeInTheDocument()
        expect(getByTestId('background')).toBeInTheDocument()
        expect(getByTestId('paper')).toBeInTheDocument()
        expect(getByLabelText(/username/i)).toBeInTheDocument()
        expect(getByLabelText('Password')).toBeInTheDocument()
        expect(getByLabelText(/confirm password/i)).toBeInTheDocument()
        expect(getByRole('button')).toBeInTheDocument()
        expect(getByText(/You already have an account?/i)).toBeInTheDocument()
        expect(getByTestId('link')).toBeInTheDocument()
    })

    test("redirect by link", () => {
        const { getByTestId, getByText } = render(
            <MemoryRouter initialEntries={["/SignUp"]}>
                <Routes>
                    <Route path="SignUp" element={<SignUp />} />
                    <Route path="SignIn" element={<Box>Sign in page</Box>} />
                </Routes>
            </MemoryRouter>
        )

        fireEvent.click(getByTestId('link'))
        expect(getByText(/sign in page/i)).toBeInTheDocument()
    })

    test("Submitting with empty fields", async () => {
        const { getByTestId, getByRole } = render(
            <BrowserRouter>
                <Form />
            </BrowserRouter>
        )

        expect(getByTestId("usernameField")).not.toBeInvalid()
        expect(getByTestId("passwordField")).not.toBeInvalid()
        expect(getByTestId("confirmPasswordField")).not.toBeInvalid()

        await act(() => {
            fireEvent.submit(getByRole('button'))
        })

        expect(getByTestId("usernameField")).toBeInvalid()
        expect(getByTestId("passwordField")).toBeInvalid()
        expect(getByTestId("confirmPasswordField")).toBeInvalid()
    })

    test("Submitting with an existing username", async () => {
        const { getByTestId, getByRole, findByText } = render(
            <BrowserRouter>
                <Form />
            </BrowserRouter>
        )

        await act(() => {
            fireEvent.input(getByTestId("usernameField"), {
                target: {
                    value: 'test'
                }
            })
            fireEvent.input(getByTestId("passwordField"), {
                target: {
                    value: '1212'
                }
            })
            fireEvent.input(getByTestId("confirmPasswordField"), {
                target: {
                    value: '1212'
                }
            })

            fireEvent.submit(getByRole('button'))
        })

        expect(await findByText(/user already exists/i)).toBeInTheDocument()
        expect(getByTestId('usernameField')).toHaveValue('')
        expect(getByTestId('passwordField')).toHaveValue('')
        expect(getByTestId('confirmPasswordField')).toHaveValue('')
    })

    test("Successful creating an account", async () => {
        const { getByTestId, getByRole, findByText, getByText } = render(
            <MemoryRouter initialEntries={["/SignUp"]}>
                <Routes>
                    <Route path="SignUp" element={<SignUp />} />
                    <Route path="SignIn" element={<Box>Sign in page</Box>} />
                </Routes>
            </MemoryRouter>
        )

        await act(() => {
            fireEvent.input(getByTestId("usernameField"), {
                target: {
                    value: 'test1'
                }
            })
            fireEvent.input(getByTestId("passwordField"), {
                target: {
                    value: '1212'
                }
            })
            fireEvent.input(getByTestId("confirmPasswordField"), {
                target: {
                    value: '1212'
                }
            })

            fireEvent.submit(getByRole('button'))
        })

        expect(await findByText(/Account is successfully created!/i)).toBeInTheDocument()
        expect(getByText(/sign in page/i)).toBeInTheDocument()
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
            fireEvent.input(getByTestId("confirmPasswordField"), {
                target: {
                    value: '13313'
                }
            })

            fireEvent.submit(getByRole('button'))
        })
        
        expect(getByText(/username length should be at least 3 characters/i)).toBeInTheDocument()
        expect(getByText(/password length should be at least 4 characters/i)).toBeInTheDocument()
        expect(getByText(/passwords do not match/i)).toBeInTheDocument()
    })
})