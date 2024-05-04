import { render, screen, fireEvent, store, authApiSlice } from "@diary-app/shared"
import { BrowserRouter } from "react-router-dom"
import { SignUp } from '../ui-SignUp/SignUp'
import '@testing-library/jest-dom'
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
    })
})