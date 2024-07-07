import { Link } from "react-router-dom";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "../../api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const [showPwd, setShowPwd] = useState(false);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        password: ""
    });

    const togglePwdVisibility = () => setShowPwd(prevState => !prevState);

    const handleUsernameChange = e => {
        setCredentials(prevState => {
            return {
                ...prevState,
                username: e.target.value
            }
        });
        setErrors(prevState => {
            return {
                ...prevState,
                username: ""
            }
        })
    }
    const handlePasswordChange = e => {
        setCredentials(prevState => {
            return {
                ...prevState,
                password: e.target.value
            }
        });
        setErrors(prevState => {
            return {
                ...prevState,
                password: ""
            }
        })
    }

    const handleSubmit = async () => {
        const newErrors = { username: "", password: "" };

        if (!credentials.username) {
            newErrors.username = "Username is required";
        }
        if (!credentials.password) {
            newErrors.password = "Password is required";
        }

        if (newErrors.username || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("/users/auth/log-in", { ...credentials });
            setAuth(prevState => ({
                ...prevState,
                accessToken: response.data.accessToken,
                roles: response.data.roles,
                user: response.data.user
            }));
            toast.success("Successfully logged in");
            navigate("/");
        } catch (error) {
            const errorResponse = error.response ? error.response.data.message : error.message;
            toast.error(errorResponse);
        }
    };

    return (
        <main className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-gray-800">Login</CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Enter your credentials below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                value={credentials.username}
                                onChange={handleUsernameChange}
                                className={errors.username ? "border-red-500" : ""}
                            />
                            {errors.username && (
                                <p className="text-sm text-red-500">{errors.username}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPwd ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={credentials.password}
                                    onChange={handlePasswordChange}
                                    className={errors.password ? "border-red-500" : ""}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePwdVisibility}>
                                    {showPwd ? <VisibilityIcon className="text-gray-500" /> : <VisibilityOffIcon className="text-gray-500" />}
                                </div>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>
                        <Button
                            type="button"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={handleSubmit}
                        >
                            Login
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="text-blue-500 underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
