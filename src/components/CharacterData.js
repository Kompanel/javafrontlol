import React from "react";
import Boots from "./items/Boots";
import Cape from "./items/Cape";
import Suit from "./items/Suit";
import Weapon from "./items/Weapon";
import Statistics from "./Statistics";

const CharacterData = ({ characterData, setCharacterData }) => {
    console.log(characterData)
    return (
        <div>
            {JSON.stringify(characterData)}
            <div>
                <h5>Statistics</h5>
                <Statistics setCharacterData={setCharacterData} characterData={characterData} stat="armor" />
                <Statistics setCharacterData={setCharacterData} characterData={characterData} stat="dexterity" />
                <Statistics setCharacterData={setCharacterData} characterData={characterData} stat="intelligence" />
                <Statistics setCharacterData={setCharacterData} characterData={characterData} stat="luck" />
                <Statistics setCharacterData={setCharacterData} characterData={characterData} stat="movementSpeed" />
                <Statistics setCharacterData={setCharacterData} characterData={characterData} stat="strength" />
            </div>
            <Boots boots={characterData.boots} setCharacterData={setCharacterData} />
            <Cape cape={characterData.cape} setCharacterData={setCharacterData} />
            <Suit suit={characterData.suit} setCharacterData={setCharacterData} />
            <Weapon weapon={characterData.weapon} setCharacterData={setCharacterData} />
        </div>
    );
};

export default CharacterData;
