import { router } from '../assets/routes/routes';
import './app.module.scss'
import { RouterProvider } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
