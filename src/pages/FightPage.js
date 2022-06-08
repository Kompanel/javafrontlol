import React, { useContext, useEffect, useState } from "react";

import CharacterNavbar from "../components/CharacterNavbar";
import axios from "../common/axios";
import { UserContext } from "../common/UserContext";

const FightPage = () => {
    const { user } = useContext(UserContext);

    const [characters, setCharacters] = useState([]);
    const [fightScenario, setFightScenario] = useState([]);

    const config = {
        headers: { Authorization: `Bearer ${user.token}` },
    };

    useEffect(() => {
        axios.get("/characters", config).then((res) => {
            if (res.status === 200) {
                setCharacters(res.data);
            }
        });
    }, []);

    const handleBattleWithBot = () => {
        axios.get("/fights/fight-bot", config)
            .then(res => {
                if (res.status === 200) {
                    setFightScenario(res.data);
                }
            })
    };

    const handleBattleWithPlayer = (id) => {
        axios.get(`/fights/fight-bot?idOpponent=${id}`, config)
            .then(res => {
                if (res.status === 200) {
                    setFightScenario(res.data);
                }
            })
    };

    const charactersSection = characters.map((c) => (
        <div style={{border: '1px solid black'}} key={c.id} onClick={() => handleBattleWithPlayer(c.id)}>
            {JSON.stringify(c, null, 2)}
        </div>
    ));

    return (
        <div>
            <CharacterNavbar />
            <button className="register-button" onClick={handleBattleWithBot}>
                Battle with bot
            </button>
            <h5>Battle with player</h5>
            {charactersSection}
            {JSON.stringify(fightScenario, null, 2)}
        </div>
    );
};

export default FightPage;
