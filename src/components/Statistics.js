import React, { useContext, useState } from "react";

import axios from "../common/axios";
import { UserContext } from "../common/UserContext";
import "./componentStyles.css";

const Statistics = ({ stat, characterData, setCharacterData }) => {
    const { user } = useContext(UserContext);

    const config = {
        headers: { Authorization: `Bearer ${user.token}` },
    };

    const [message, setMessage] = useState("");

    const enumerateValue = stat === "movementSpeed" ? "MOVEMENT_SPEED" : stat.toUpperCase();

    const handleIncrementingStat = () => {
        axios
            .get(`/characters/increment-stat?stat=${enumerateValue}`, config)
            .then((res) => {
                if (res.status === 200) {
                    axios.get("/characters/current-user", config).then((res) => {
                        setCharacterData(res.data);
                        setMessage("Stat has been incremented");
                        setTimeout(() => {
                            setMessage("");
                        }, 1000);
                    });
                }
            })
            .catch((err) => {
                setMessage("You don't have enough gold");
                setTimeout(() => {
                    setMessage("");
                }, 1000);
            });
    };

    return (
        <div className="inner-statistic-container">
            <h3>{stat}</h3>
            <p className="statistics-value">{characterData[stat]}</p>
            <button className="statistic-button" onClick={handleIncrementingStat}>Increment stat</button>
            <p className="message">{message}</p>
        </div>
    );
};

export default Statistics;
