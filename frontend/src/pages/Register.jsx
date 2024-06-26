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

export default function Register() {
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);
    const [inputValues, setInputValues] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [passwordError, setPasswordError] = useState({
        isError: false,
        message: ""
    });

    const [firstNameError, setFirstNameError] = useState({
        isError: false,
        message: ""
    });

    const [lastNameError, setLastNameError] = useState({
        isError: false,
        message: ""
    });

    const [usernameError, setUsernameError] = useState({
        isError: false,
        message: ""
    })

    const handleSubmit = () => {
        if (!inputValues.firstName.length) {
            setFirstNameError(prevState => {
                return {
                    ...prevState,
                    isError: true,
                    message: "Required"
                }
            });
        }
        else if (!inputValues.lastName.length) {
            setLastNameError(prevState => {
                return {
                    ...prevState,
                    isError: true,
                    message: "Required"
                }
            });
        }
        else if (!inputValues.username.length) {
            setUsernameError(prevState => {
                return {
                    ...prevState,
                    isError: true,
                    message: "username is required"
                }
            });
        }
        else if (inputValues.password.trim() !== inputValues.confirmPassword.trim()) {
            setPasswordError(prevState => {
                return {
                    ...prevState,
                    isError: true,
                    message: "Password does not match"
                }
            });
        }
        else if (!inputValues.password.length || !inputValues.confirmPassword.length) {
            setPasswordError(prevState => {
                return {
                    ...prevState,
                    isError: true,
                    message: "password and confirm password is required"
                }
            });
        }

    }

    const togglePwdVisibility = () => setShowPwd(prevState => !prevState);
    const toggleConfirmPwdVisibility = () => setShowConfirmPwd(prevState => !prevState);

    const errorStyles = {
        backgroundColor: "#ff7f7f",
        border: "2px solid red"
    }

    return (
        <main className="flex justify-center items-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input
                                    id="first-name"
                                    placeholder="Max"
                                    style={firstNameError.isError ? errorStyles : undefined}
                                    onFocus={() => setFirstNameError(prevState => ({ ...prevState, isError: false, message: "" }))}
                                    onChange={e => setInputValues(prevState => { return { ...prevState, firstName: e.target.value } })}
                                    required
                                />

                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input
                                    id="last-name"
                                    placeholder="Robinson"
                                    required
                                    style={lastNameError.isError ? errorStyles : undefined}
                                    onFocus={() => setLastNameError(prevState => ({ ...prevState, isError: false, message: "" }))}
                                    onChange={e => setInputValues(prevState => { return { ...prevState, lastName: e.target.value } })}
                                />

                            </div>
                        </div>
                        {lastNameError.isError && <p style={{ textAlign: "left", color: "red", fontWeight: "bolder" }}>{lastNameError.message}</p>}
                        {firstNameError.isError && <p style={{ textAlign: "left", color: "red", fontWeight: "bolder" }}>{firstNameError.message}</p>}
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                style={usernameError.isError ? errorStyles : undefined}
                                onFocus={() => setUsernameError(prevState => ({ ...prevState, isError: false, message: "" }))}
                                onChange={e => setInputValues(prevState => { return { ...prevState, username: e.target.value } })}
                            />
                            {usernameError.isError && <p style={{ textAlign: "left", color: "red", fontWeight: "bolder" }}>{usernameError.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPwd ? "text" : "password"}
                                    placeholder="Password"
                                    autoComplete="off"
                                    style={passwordError.isError ? errorStyles : undefined}
                                    onFocus={() => setPasswordError(prevState => { return { ...prevState, isError: false, message: "" } })}
                                    onChange={e => setInputValues(prevState => { return { ...prevState, password: e.target.value } })}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePwdVisibility}>
                                    {!showPwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password-confirm">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="password-confirm"
                                    type={showConfirmPwd ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    autoComplete="off"
                                    style={passwordError.isError ? errorStyles : undefined}
                                    onFocus={() => setPasswordError(prevState => { return { ...prevState, isError: false, message: "" } })}
                                    onChange={e => setInputValues(prevState => { return { ...prevState, confirmPassword: e.target.value } })}
                                />
                                {passwordError.isError && <p style={{ textAlign: "left", color: "red", fontWeight: "bolder" }}>{passwordError.message}</p>}
                                <div className={`absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer ${passwordError.isError && "bottom-6"}`} onClick={toggleConfirmPwdVisibility}>
                                    {!showConfirmPwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </div>
                            </div>
                        </div>
                        <Button type="submit" className="w-full" onClick={handleSubmit}>
                            Create an account
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/log-in" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}
