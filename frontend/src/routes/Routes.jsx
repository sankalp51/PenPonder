import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/log-in",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    }
]);

export default router;