import { act, authApiSlice, findByTestId, fireEvent, getByText, render, screen, store, useAppDispatch, waitFor } from "@diary-app/shared"
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom"
import { MainPage } from "../ui-MainPage/MainPage"
import '@testing-library/jest-dom'
import { Backdrop, Box } from "@mui/material"
import { CreateTaskPage } from "../ui-MainPage/pages/CreateTask/CreateTaskPage"
import { format } from "date-fns"
import { TaskComponent } from "../features-MainPage/components/TaskComponents/TaskComponent"
import TaskEditPage from "../ui-MainPage/pages/TaskEdit/TaskEditPage"


describe('MainPage tests', () => {
    test("UI render test without auth", async () => {
        const { getByText, getByRole, rerender, getByTestId, getByPlaceholderText } = render(
            <MemoryRouter>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='SignIn' element={<Box>Sign in page</Box>} />
                </Routes>
            </MemoryRouter>
        )

        expect(getByText(/diary/i)).toBeInTheDocument()
        expect(getByRole('button')).toBeInTheDocument()

        fireEvent.click(getByRole('button'))
        expect(getByText(/sign in page/i))
    })


})

describe('test', () => {

    beforeAll(() => {
        store.dispatch(authApiSlice.endpoints.login.initiate({ username: 'test', password: '1212' }))
        store.dispatch(authApiSlice.endpoints.fetchUser.initiate())
    })

    test('UI render after auth', async () => {


        const { getByText, getByTestId, getByPlaceholderText, getByDisplayValue, findByTestId } = render(
            <BrowserRouter>
                <MainPage />
            </BrowserRouter>
        )

        expect(await findByTestId('AddIcon')).toBeInTheDocument()
        expect(await findByTestId('CalendarIcon')).toBeInTheDocument()
        expect(getByText('t')).toBeInTheDocument()
        expect(getByPlaceholderText(/search some tasks/i)).toBeInTheDocument()
        expect(getByText(/folder is empty!/i)).toBeInTheDocument()
        expect(getByDisplayValue(format(new Date(), 'MM/dd/yyyy'))).toBeInTheDocument()
        expect(getByText(/folder is empty!/i)).toBeInTheDocument()
    })


    test('Create task page test', async () => {


        const { getByText, getByTestId, getByLabelText, getAllByText, findAllByText } = render(
            <MemoryRouter>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path="/task/create" element={<CreateTaskPage />} />
                </Routes>
            </MemoryRouter>
        )

        fireEvent.click(getByTestId('AddIcon'))
        expect(getByText(/create a new task/i)).toBeInTheDocument()
        expect(getByLabelText(/title/i)).toBeInTheDocument()
        expect(getByLabelText(/description/i)).toBeInTheDocument()
        expect(getByText(/neutral/i)).toBeInTheDocument()
        expect(getByText(/cancel/i)).toBeInTheDocument()
        expect(getByText('Create')).toBeInTheDocument()



        await act(() => {
            fireEvent.input(getByTestId('titleInput'), {
                target: {
                    value: 'tup'
                }
            })

            fireEvent.input(getByTestId('descInput'), {
                target: {
                    value: 'test'
                }
            })

            fireEvent.click(getByText('Create'))
        })

        expect(getAllByText(format(new Date(), 'dd.MM.yyyy'))).toHaveLength(1)
        fireEvent.click(getByTestId('AddIcon'))

        await act(() => {
            fireEvent.click(getByText('Create'))
        })
        expect(getAllByText(format(new Date(), 'dd.MM.yyyy'))).toHaveLength(1)


        fireEvent.click(getByTestId('AddIcon'))

        await act(() => {

            fireEvent.input(getByTestId('titleInput'), {
                target: {
                    value: 'test'
                }
            })

            fireEvent.input(getByTestId('descInput'), {
                target: {
                    value: 'test'
                }
            })

            fireEvent.keyDown(getByText(/create a new task/i), {
                key: "Escape",
                code: "Escape",
                keyCode: 27,
                charCode: 27
            });
        })

        expect(await findAllByText(format(new Date(), 'dd.MM.yyyy'))).toHaveLength(2)

        fireEvent.click(getByTestId('AddIcon'))
        expect(getByText(/create a new task/i)).toBeInTheDocument()
        fireEvent.click(getByText('Cancel'))
        expect(getByText('Diary')).toBeInTheDocument()


        fireEvent.click(getByTestId('AddIcon'))

        act(() => {
            fireEvent.change(getByTestId('typeInput'), { target: { value: 'URGENT' } })
        })

        expect(getByText(/urgent/i)).toBeInTheDocument()

        act(() => {
            fireEvent.change(getByTestId('typeInput'), { target: { value: 'IMPORTANT' } })
        })

        expect(getByText(/important/i)).toBeInTheDocument()
    })


    test('search input test', async () => {
        const { getByText, getByPlaceholderText, getByLabelText, findAllByText } = render(
            <BrowserRouter>
                <MainPage />
            </BrowserRouter>
        )


        act(() => {
            fireEvent.input(getByPlaceholderText(/search some tasks/i), {
                target: {
                    value: 'something'
                }
            })
        })
        expect(getByText(/folder is empty!/i)).toBeInTheDocument()

        await act(() => {
            fireEvent.input(getByPlaceholderText(/search some tasks/i), {
                target: {
                    value: 'test'
                }
            })
        })
        expect(await findAllByText(format(new Date(), 'dd.MM.yyyy'))).toHaveLength(2)
    })

    test('datePicker test', async () => {

        const { getByText, getByRole, rerender, getByTestId, getByPlaceholderText, getByLabelText, findAllByText } = render(
            <MemoryRouter>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                </Routes>
            </MemoryRouter>
        )


        act(() => {
            fireEvent.input(getByPlaceholderText("MM/DD/YYYY"), {
                target: {
                    value: '02/10/2024'
                }
            })
        })
        expect(getByText(/folder is empty!/i)).toBeInTheDocument()

        await act(() => {

            fireEvent.input(getByPlaceholderText("MM/DD/YYYY"), {
                target: {
                    value: format(new Date(), 'MM/dd/yyyy')
                }
            })
        })

        expect(await findAllByText(format(new Date(), 'dd.MM.yyyy'))).toHaveLength(2)
    })

    test('task component test', async () => {
        const { getByText, getByRole, rerender, getByTestId, getByPlaceholderText, getByLabelText, getAllByText, findAllByText, getAllByTestId } = render(
            <MemoryRouter>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='task/:id' element={<TaskEditPage />} />
                </Routes>
            </MemoryRouter>
        )
        
        await act(() => {
            fireEvent.click(getByText('tup'))
        })
        
        act(() => {
            rerender(
                <MemoryRouter>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='task/:id' element={<TaskEditPage />} />
                    </Routes>
                </MemoryRouter>
            )
        })

        expect(getByPlaceholderText(/enter a title/i)).toBeInTheDocument()
        expect(getByPlaceholderText(/enter a description/i)).toBeInTheDocument()
        expect(getByText(/neutral/i)).toBeInTheDocument()

        await act(() => {
            fireEvent.change(getByTestId('titleInput'), { target: { value: '' } })
            fireEvent.change(getByTestId('descInput'), { target: { value: '' } })

            fireEvent.change(getByTestId('typeInput'), { target: { value: 'IMPORTANT' } })
            expect(getByText(/important/i)).toBeInTheDocument()

            fireEvent.keyDown(getByPlaceholderText(/enter a title/i), {
                key: "Escape",
                code: "Escape",
                keyCode: 27,
                charCode: 27
            });
        })

        act(() => {
            rerender(
                <MemoryRouter>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='task/:id' element={<TaskEditPage />} />
                    </Routes>
                </MemoryRouter>
            )
        })


        expect(getByText(/task is empty/i)).toBeInTheDocument()
        
        await act(() => {
            fireEvent.click(getByText(/task is empty/i))
        })

        act(() => {
            rerender(
                <MemoryRouter>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='task/:id' element={<TaskEditPage />} />
                    </Routes>
                </MemoryRouter>
            )
        })

        await act(() => {

            fireEvent.change(getByTestId('typeInput'), { target: { value: 'URGENT' } })
            expect(getByText(/urgent/i)).toBeInTheDocument()

            fireEvent.click(getByRole('button'))
        })
        
        act(() => {
            rerender(
                <MemoryRouter>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='task/:id' element={<TaskEditPage />} />
                    </Routes>
                </MemoryRouter>
            )
        })

        fireEvent.click(getByText(/task is empty/i))

        act(() => {
            rerender(
                <MemoryRouter>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='task/:id' element={<TaskEditPage />} />
                    </Routes>
                </MemoryRouter>
            )
        })

        fireEvent.click(getByText('Submit'))

        await act(() => {
            rerender(
                <MemoryRouter>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='task/:id' element={<TaskEditPage />} />
                    </Routes>
                </MemoryRouter>
            )
        })

        expect(await findAllByText(format(new Date(), 'dd.MM.yyyy'))).toHaveLength(2)
        
     
        fireEvent.click(getAllByTestId('DeleteIcon')[0])

        await act(() => {
            rerender(
                <MemoryRouter>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='task/:id' element={<TaskEditPage />} />
                    </Routes>
                </MemoryRouter>
            )
        })

        expect(getAllByText(format(new Date(), 'dd.MM.yyyy'))).toHaveLength(1)
    })

    test('user drop icon test', async () => {
        const { getByText, getByRole, rerender, getByTestId, getByPlaceholderText, getByLabelText, getAllByText, findAllByText, getAllByTestId, findByText, queryByText } = render(
            <BrowserRouter>
                <MainPage/>
            </BrowserRouter>
        )
        
       
        fireEvent.click(getByText('t'))
    
        expect(await findByText(/settings/i)).toBeInTheDocument()
        expect(await findByText(/logout/i)).toBeInTheDocument()
        screen.debug()

            fireEvent.click(getByText(/settings/i))

        await act(() => {
            rerender(
                <MemoryRouter>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='task/:id' element={<TaskEditPage />} />
                    </Routes>
                </MemoryRouter>
            )
        })

        expect(queryByText(/settings/i)).not.toBeInTheDocument()

    })
})