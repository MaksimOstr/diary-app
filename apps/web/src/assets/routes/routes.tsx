import { createBrowserRouter } from "react-router-dom";



import { mainPageLoader } from "./loaders/ProfileLoader";
import { SignUp } from "@diary-app/SignUp";
import { MainPage } from "@diary-app/main";
import { SignIn } from "@diary-app/SignIn";





export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    loader: mainPageLoader
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