import { createBrowserRouter } from "react-router-dom";
import Navigator from "./Navigator";
import { SignUp } from "@diary-app/SignUp";
import { SignIn } from "@diary-app/SignIn";
import { ProfileLoader } from "./loaders/ProfileLoader";









export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigator/>,
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