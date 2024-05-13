
import './app.module.scss'
import { RouterProvider } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { router } from '../assets/routes/loaders/routes';


export function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
