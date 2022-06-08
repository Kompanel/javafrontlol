import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../common/UserContext";
import emptyUserObject from "../common/emptyUserObject";

const Navbar = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(emptyUserObject);
        navigate("/login");
    };
    
    return (
        <nav>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
