import { createBrowserRouter } from "react-router-dom";
import Navigator from "./Navigator";
import { SignIn } from "@diary-app/SignIn";
import { SignUp } from "@diary-app/SignUp";





export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigator/>
  },
  {
    path: '/SignUp',
    element: <SignUp/>
  },
  {
    path: '/SignIn',
    element: <SignIn/>
  }
])