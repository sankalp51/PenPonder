import { Link } from "react-router-dom";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "../../api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

export default function Register() {
    const navigate = useNavigate();
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);
    const [inputValues, setInputValues] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = async () => {
        const newErrors = { firstName: "", lastName: "", username: "", password: "", confirmPassword: "" };

        if (!inputValues.firstName) {
            newErrors.firstName = "First name is required";
        }
        if (!inputValues.lastName) {
            newErrors.lastName = "Last name is required";
        }
        if (!inputValues.username) {
            newErrors.username = "Username is required";
        }
        if (!inputValues.password) {
            newErrors.password = "Password is required";
        }
        if (inputValues.password !== inputValues.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (newErrors.firstName || newErrors.lastName || newErrors.username || newErrors.password || newErrors.confirmPassword) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("/users/auth/sign-up", { ...inputValues });
            toast.success(response.data.message);
            navigate("/log-in");
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            toast.error(errorMessage);
        }
    };

    const togglePwdVisibility = () => setShowPwd(prevState => !prevState);
    const toggleConfirmPwdVisibility = () => setShowConfirmPwd(prevState => !prevState);

    const handleChange = (field) => (e) => {
        setInputValues(prevState => ({ ...prevState, [field]: e.target.value }));
        setErrors(prevState => ({ ...prevState, [field]: "" }));
    };

    return (
        <main className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="mx-auto max-w-sm shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-gray-800">Sign Up</CardTitle>
                    <CardDescription className="text-center text-gray-500">
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name" className="font-medium text-gray-700">First name</Label>
                                <Input
                                    id="first-name"
                                    placeholder="Max"
                                    value={inputValues.firstName}
                                    onChange={handleChange("firstName")}
                                    className={errors.firstName ? "border-red-500" : ""}
                                />
                                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name" className="font-medium text-gray-700">Last name</Label>
                                <Input
                                    id="last-name"
                                    placeholder="Robinson"
                                    value={inputValues.lastName}
                                    onChange={handleChange("lastName")}
                                    className={errors.lastName ? "border-red-500" : ""}
                                />
                                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username" className="font-medium text-gray-700">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                value={inputValues.username}
                                onChange={handleChange("username")}
                                className={errors.username ? "border-red-500" : ""}
                            />
                            {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="font-medium text-gray-700">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPwd ? "text" : "password"}
                                    placeholder="Password"
                                    autoComplete="off"
                                    value={inputValues.password}
                                    onChange={handleChange("password")}
                                    className={errors.password ? "border-red-500" : ""}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePwdVisibility}>
                                    {!showPwd ? <VisibilityOffIcon className="text-gray-500" /> : <VisibilityIcon className="text-gray-500" />}
                                </div>
                            </div>
                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password-confirm" className="font-medium text-gray-700">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="password-confirm"
                                    type={showConfirmPwd ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    autoComplete="off"
                                    value={inputValues.confirmPassword}
                                    onChange={handleChange("confirmPassword")}
                                    className={errors.confirmPassword ? "border-red-500" : ""}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={toggleConfirmPwdVisibility}>
                                    {!showConfirmPwd ? <VisibilityOffIcon className="text-gray-500" /> : <VisibilityIcon className="text-gray-500" />}
                                </div>
                            </div>
                            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                        </div>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={handleSubmit}>
                            Create an account
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/log-in" className="underline text-indigo-600 hover:text-indigo-700">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
