import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import RequireAuth from './RequireAuth';
import PostPage from '@/pages/PostPage';
import Profile from '@/pages/Profile';

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            //public routes
            {
                path: "log-in",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            //protected routes
            {
                element: <RequireAuth />,
                children: [
                    {
                        path: "/",
                        element: <Home />
                    },
                    {
                        path: "post-page",
                        element: <PostPage />
                    },
                    {
                        path: "profile",
                        element: <Profile />
                    }
                ]
            }

        ]
    }
]);

export default router;