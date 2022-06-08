import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./componentStyles.css"
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
        <nav className="navbar-logout">
            <button className="navar-logout-element" onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
