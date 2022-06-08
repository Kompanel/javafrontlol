import React from "react";
import { Link } from "react-router-dom";
import "./componentStyles.css"

const CharacterNavbar = () => {
    return (
        <nav className="character-navbar">
            <Link className="character-navbar-element" to="/">Home</Link>
            <Link className="character-navbar-element" to="/quests">Quests</Link>
            <Link className="character-navbar-element" to="/fight">Fight</Link>
        </nav>
    );
};

export default CharacterNavbar;
