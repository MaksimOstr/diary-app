import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "@diary-app/SignUp";

import { SignIn } from "@diary-app/SignIn";

import { Box } from "@mui/material";
import { ChangePassword, ChangeUsernameForm, CreateTaskPage, MainPage, TaskEditPage, UserProfilePage } from "@diary-app/main";
import mainPageLoader from "./ProfileLoader";








export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    loader: mainPageLoader,
    children: [
      {
        path: '/task/:id',
        element: <TaskEditPage/>,
      },
      {
        path: 'task/create',
        element: <CreateTaskPage/>,
      },
      {
        path: 'profile',
        element: <UserProfilePage/>,
        children: [
          {
            path: '/profile/changeUsername',
            element: <ChangeUsernameForm/>
          },
          {
            path: '/profile/changePassword',
            element: <ChangePassword/>
          }
        ]
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