import { getByText, render } from "@diary-app/shared"
import { BrowserRouter } from "react-router-dom"
import { MainPage } from "../ui-MainPage/MainPage"
import '@testing-library/jest-dom'
describe('MainPage tests', () => {
    it("UI render", () => {
        test("Initial rendering test", () => {
            const { getByText } = render(
                <BrowserRouter>
                    <MainPage/>
                </BrowserRouter>
            )
            expect(getByText(/diary/i)).toBeInTheDocument()
        })
    })
})