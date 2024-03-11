import { router } from '../assets/routes/routes';
import './app.module.scss'
import { RouterProvider } from "react-router-dom";

export function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
