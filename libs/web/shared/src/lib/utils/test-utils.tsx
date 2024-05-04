import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'

import { ToastContainer } from 'react-toastify'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { store } from '../store/store'
import { theme } from '../theme/theme'
import { BrowserRouter, RouterProvider } from 'react-router-dom'


export const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
      </ThemeProvider>
      <ToastContainer />
    </Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }