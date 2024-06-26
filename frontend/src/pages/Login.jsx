import { Link } from "react-router-dom"
import { useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
    const [showPwd, setShowPwd] = useState(false);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [usernameError, setUsernameError] = useState({
        isError: false,
        message: ""
    });

    const [passwordError, setPasswordError] = useState({
        isError: false,
        message: ""
    });

    const togglePwdVisibility = () => setShowPwd(prevState => !prevState);

    const handleSubmit = () => {
        if (!credentials.username.length) {
            setUsernameError(prevState => {
                return {
                    ...prevState,
                    isError: true,
                    message: "username is required"
                }
            })
        }
        else if (!credentials.password.length) {
            setPasswordError(prevState => {
                return {
                    ...prevState,
                    isError: true,
                    message: "password is required"
                }
            })
        }
    }

    const errorStyles = {
        backgroundColor: "#ff7f7f",
        border: "2px solid red"
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your credentials below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            required
                            style={usernameError.isError ? errorStyles : undefined}
                            onFocus={() => setUsernameError(prevState => ({ ...prevState, isError: false, message: "" }))}
                            onChange={e => setCredentials(prevState => ({ ...prevState, username: e.target.value }))}
                        />
                    </div>
                    {usernameError.isError && <p style={{ textAlign: "left", color: "red", fontWeight: "bolder" }}>{usernameError.message}</p>}
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type={!showPwd ? "password" : "text"}
                                placeholder="Enter your password"
                                required
                                autoComplete="off"
                                style={passwordError.isError ? errorStyles : undefined}
                                onFocus={() => setPasswordError(prevState => ({ ...prevState, isError: false, message: "" }))}
                                onChange={e => setCredentials(prevState => ({ ...prevState, password: e.target.value }))}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePwdVisibility}>
                                {!showPwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </div>
                        </div>
                    </div>
                    {passwordError.isError && <p style={{ textAlign: "left", color: "red", fontWeight: "bolder" }}>{passwordError.message}</p>}
                    <Button type="submit" className="w-full" onClick={handleSubmit}>
                        Login
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
