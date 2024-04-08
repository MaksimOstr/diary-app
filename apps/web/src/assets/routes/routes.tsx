import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "@diary-app/SignUp";

import { SignIn } from "@diary-app/SignIn";
import mainPageLoader from "./loaders/ProfileLoader";
import { MainPage } from "@diary-app/main";
import { Box } from "@mui/material";






export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    loader: mainPageLoader,
    children: [
      {
        path: '/:id',
        element: <Box></Box>
      }
    ]
  },
  {
    path: '/SignUp',
    element: <SignUp />
  },
  {
    path: '/SignIn',
    element: <SignIn />
  }
])