import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "@diary-app/SignUp";

import { SignIn } from "@diary-app/SignIn";
import mainPageLoader from "./loaders/ProfileLoader";
import { MainPage, TaskComponent, TaskEditPage } from "@diary-app/main";
import { Box } from "@mui/material";








export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    loader: mainPageLoader,
    children: [
      {
        path: '/task/:id',
        element: <TaskEditPage/>
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