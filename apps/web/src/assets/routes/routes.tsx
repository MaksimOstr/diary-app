import { createBrowserRouter } from "react-router-dom";
import { Navigator } from "./Navigator";

import { SignIn } from "@diary-app/SignIn";
import { mainPageLoader } from "./loaders/ProfileLoader";
import { SignUp } from "@diary-app/SignUp";
import { MainPage } from "@diary-app/main";





export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage/>,
    loader: mainPageLoader
  },
  {
    path: '/SignUp',
    element: <SignUp/>
  },
  {
    path: '/SignIn',
    element: <SignIn />
  }
])