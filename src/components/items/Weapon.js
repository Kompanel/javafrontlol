import React, { useState, useContext } from "react";

import axios from "../../common/axios";
import { UserContext } from "../../common/UserContext";

const Weapon = ({ weapon, setCharacterData }) => {
    const { user } = useContext(UserContext);

    const [message, setMessage] = useState("");

    const config = {
        headers: { Authorization: `Bearer ${user.token}` },
    };

    const handleUpgradingItem = () => {
        axios
            .get("/characters/level-up?itemToUpgrade=WEAPON", config)
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
        <div>
            {JSON.stringify(weapon, null, 2)}
            <button onClick={handleUpgradingItem}>Upgrade item</button>
            <div>{message}</div>
        </div>
    );
};

export default Weapon;
