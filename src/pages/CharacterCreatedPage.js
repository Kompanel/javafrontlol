import React from "react";

import CharacterNavbar from "../components/CharacterNavbar";
import CharacterData from "../components/CharacterData";

const CharacterCreatedPage = ({ characterData, setCharacterData }) => {
    return (
        <div>
            <CharacterNavbar />
            <CharacterData characterData={characterData} setCharacterData={setCharacterData} />
        </div>
    );
};

export default CharacterCreatedPage;
