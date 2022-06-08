import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { UserContext } from "../common/UserContext";
import Navbar from "../components/Navbar";
import axios from "../common/axios";
import CreateCharacter from "../components/CreateCharacter";
import CharacterCreatedPage from "./CharacterCreatedPage";
import FightPage from "./FightPage";
import QuestPage from "./QuestPage";
import Dev from "../components/Dev";

const Home = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [characterData, setCharacterData] = useState({
        characterType: "",
        username: "",
        id: "",
        level: 0,
        strength: 0,
        dexterity: 0,
        intelligence: 0,
        luck: 0,
        movementSpeed: 0,
        armor: 0,
        experience: 0,
        gold: 0,
        health: 0,
        boots: {
            id: "a",
            level: 0,
            name: "",
        },
        cape: {
            id: "",
            level: 0,
            name: "",
        },
        suit: {
            id: "",
            level: 0,
            name: "",
        },
        weapon: {
            id: "",
            level: 0,
            name: "",
        },
        equipment: {
            id: "",
            itemsInEquipment: [],
        },
        takenQuest: null,
        possibleQuests: [],
        effectList: [],
    });

    useEffect(() => {
        if (user.id === "") {
            navigate("/login");
        } else {
            if (user.roles.includes("ROLE_DEVELOPER")) {
                navigate("/dev");
            } else if (user.roles.includes("ROLE_ADMIN")) {
                const a = document.createElement("a");
                a.href = "http://localhost:8085/swagger-ui.html"
                a.click();
            } else {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                axios
                    .get("/characters/current-user", config)
                    .then((res) => {
                        setCharacterData(res.data);
                    })
                    .catch((err) => {
                        navigate("/create-character");
                    });
            }
        }
    }, []);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/create-character" element={<CreateCharacter setCharacterData={setCharacterData} />} />
                <Route path="/fight" element={<FightPage />} />
                <Route
                    path="/quests"
                    element={<QuestPage characterData={characterData} setCharacterData={setCharacterData} />}
                />
                <Route path="/dev" element={<Dev />} />
                <Route
                    path="/"
                    element={<CharacterCreatedPage characterData={characterData} setCharacterData={setCharacterData} />}
                />
            </Routes>
        </>
    );
};

export default Home;
