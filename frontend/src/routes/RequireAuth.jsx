import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function RequireAuth() {
    const { auth } = useAuth();
    const location = useLocation();
    return (
        auth.user ? <Outlet /> : <Navigate to="/log-in" state={{ from: location }} replace />
    )
}