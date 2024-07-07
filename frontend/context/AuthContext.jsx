import { createContext, useState } from "react";

// Create the AuthContext with default values
const AuthContext = createContext({
    auth: {
        accessToken: null,
        roles: null,
        user: null
    },
    setAuth: () => { }
});

export function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({
        accessToken: null,
        roles: null,
        user: null
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
