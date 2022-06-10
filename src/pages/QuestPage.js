import React, { useEffect, useState, useContext } from "react";

import axios from "../common/axios";
import { UserContext } from "../common/UserContext";
import CharacterNavbar from "../components/CharacterNavbar";
import "../styles.css";

const QuestPage = ({ characterData, setCharacterData }) => {
    const { user } = useContext(UserContext);
    const [proposedQuestsData, setProposedQuestsData] = useState([]);
    const [countDown, setCountDown] = useState(0);
    const [renderState, setRenderState] = useState(0);

    const config = {
        headers: { Authorization: `Bearer ${user.token}` },
    };

    useEffect(() => {
        if (!characterData.takenQuest) {
            if (characterData.possibleQuests === []) {
                axios.get("/quests", config).then((res) => {
                    setProposedQuestsData(res.data);
                    setRenderState(1);
                });
            } else {
                setProposedQuestsData(characterData.possibleQuests);
                setRenderState(1);
            }
        } else {
            setRenderState(2);
            axios.get("/quests/complete", config).then((res) => {
                if (res.status === 200) {
                    if (res.data.completed) {
                        axios.get("/quests", config).then((res) => {
                            setProposedQuestsData(res.data);
                            setRenderState(1);
                        });
                    } else {
                        setCountDown(res.data.secondsLeft);
                        setInterval(() => {
                            setCountDown((prevCount) => prevCount - 1);
                        }, 1000);
                    }
                }
            });
        }
    }, []);

    const handlePickingQuest = (duration) => {
        const char = duration.charAt(4);
        let enumerateValue;

        switch (char) {
            case "2":
                enumerateValue = "SHORT";
                break;
            case "5":
                enumerateValue = "MEDIUM";
                break;
            case "8":
                enumerateValue = "LONG";
                break;
            default:
                break;
        }

        axios.get(`/quests/pick?questType=${enumerateValue}`, config).then((res) => {
            if (res.status === 200) {
                setRenderState(2);
                const minutes = parseInt(duration.substring(3, 5));
                const seconds = parseInt(duration.substring(6, 8));
                setCountDown(minutes * 60 + seconds);
                setInterval(() => {
                    setCountDown((prevCount) => prevCount - 1);
                }, 1000);
                axios.get("/characters/current-user", config).then((res) => {
                    setCharacterData(res.data);
                });
            }
        });
    };

    if (countDown === 0) {
        axios.get("/quests/complete", config).then((res) => {
            if (res.status === 200) {
                axios.get("/quests", config).then((res) => {
                    setProposedQuestsData(res.data);
                    setRenderState(1);
                });
            }
        });
    }

    const questsToPickSection = proposedQuestsData.map((q) => (
        <div className="quest-continer" key={q.id} onClick={() => handlePickingQuest(q.duration)}>
                <div>
                    <h1 className="quest-title">Quest</h1><br></br>
                    <h2>duration: {q.duration}</h2>
                    <h3>gold: {q.gold}</h3>
                    {q.collectibleItem && <h4>{q.collectibleItem.name}, amount: {q.amountOfItems}</h4>}
                </div>
        </div>
    ));


    return (
        <div>
            <CharacterNavbar />
            {renderState === 1 && <div className="quest-pick-container">{questsToPickSection}</div>}
            {renderState === 2 && <div className="quest-coundown-container">
            <h1 >Pozostało: </h1>
            <h4>{countDown} sekund</h4>
        </div>}
        </div>
    );
};

export default QuestPage;
