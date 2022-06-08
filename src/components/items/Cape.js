import React, { useState, useContext } from "react";

import axios from "../../common/axios";
import { UserContext } from "../../common/UserContext";
import capeImage from "../../common/assets/cape.png";

const Cape = ({ cape, setCharacterData }) => {
    const { user } = useContext(UserContext);

    const [message, setMessage] = useState("");

    const config = {
        headers: { Authorization: `Bearer ${user.token}` },
    };

    const handleUpgradingItem = () => {
        axios
            .get("/characters/level-up?itemToUpgrade=CAPE", config)
            .then((res) => {
                axios.get("/characters/current-user", config).then((res) => {
                    setCharacterData(res.data);
                    setMessage("Item has been upgraded");
                    setTimeout(() => {
                        setMessage("");
                    }, 1000);
                });
            })
            .catch((err) => {
                setMessage("You dont have required items for that action");
                setTimeout(() => {
                    setMessage("");
                }, 1000);
            });
    };

    return (
        <div class="outer-item-container">
            <div className="inner-item-container">
            <img className="item-image" src={capeImage} alt=""/>
            <div>
                <h2>{cape.name}</h2>
            <h2>level: {cape.level}</h2>
            </div>
            <button className="upgrade-button" onClick={handleUpgradingItem}>Upgrade item</button>
            </div>
            <div>{message}</div>
        </div>
    );
};

export default Cape;
