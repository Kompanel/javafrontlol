import React, { useState } from "react";

const Context = React.createContext();

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: '',
        username: '',
        email: '',
        token: '',
        roles: []
    });

    return (
        <Context.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export { ContextProvider as UserContextProvider, Context as UserContext };
