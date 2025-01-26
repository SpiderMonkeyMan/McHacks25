import { createContext, useState } from "react";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [username, setUsername] = useState('');

    return (
        <LoginContext.Provider value={{ username, setUsername }}>
            {children}
        </LoginContext.Provider>
    );
};

export { LoginContext, LoginProvider };