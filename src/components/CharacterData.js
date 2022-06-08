import React from "react";
import Boots from "./items/Boots";
import Cape from "./items/Cape";
import Suit from "./items/Suit";
import Weapon from "./items/Weapon";
import Statistics from "./Statistics";
import mageImage from "../common/assets/mage_avatar.png";
import "./componentStyles.css";

const CharacterData = ({ characterData, setCharacterData }) => {
  console.log(characterData);

  let characterImage;

  switch (characterData.characterType) {
    case "Mage":
      characterImage = mageImage;
      break;

    default:
      characterImage = mageImage;
  }

  return (
    <div className="container">
      <h1>
        {characterData.characterType}: {characterData.username}
      </h1>
      <div className="character-data-container">
        <img className="avatar-image" alt="" src={characterImage} />
        <div className="character-item-container">
          <Boots
            className="first-item"
            boots={characterData.boots}
            setCharacterData={setCharacterData}
          />
          <Cape
            className="second-item"
            cape={characterData.cape}
            setCharacterData={setCharacterData}
          />
          <Suit
            className="third-item"
            suit={characterData.suit}
            setCharacterData={setCharacterData}
          />
          <Weapon
            className="fouth-item"
            weapon={characterData.weapon}
            setCharacterData={setCharacterData}
          />
        </div>
      </div>
      <h2>Statistics</h2>
      <div className="statistic-container">
        <Statistics
          setCharacterData={setCharacterData}
          characterData={characterData}
          stat="armor"
        />
        <Statistics
          setCharacterData={setCharacterData}
          characterData={characterData}
          stat="dexterity"
        />
        <Statistics
          setCharacterData={setCharacterData}
          characterData={characterData}
          stat="intelligence"
        />
        <Statistics
          setCharacterData={setCharacterData}
          characterData={characterData}
          stat="luck"
        />
        <Statistics
          setCharacterData={setCharacterData}
          characterData={characterData}
          stat="movementSpeed"
        />
        <Statistics
          setCharacterData={setCharacterData}
          characterData={characterData}
          stat="strength"
        />
      </div>
    </div>
  );
};

export default CharacterData;
