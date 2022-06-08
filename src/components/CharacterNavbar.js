import React from "react";
import { Link } from "react-router-dom";

const CharacterNavbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/quests">Quests</Link>
            <Link to="/fight">Fight</Link>
        </nav>
    );
};

export default CharacterNavbar;
