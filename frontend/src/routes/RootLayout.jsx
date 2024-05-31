import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

export default function RootLayout() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}