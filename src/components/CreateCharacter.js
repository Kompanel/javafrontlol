import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../common/axios";
import { UserContext } from "../common/UserContext";

const CreateCharacter = ({ setCharacterData }) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        characterType: 0,
        weaponType: 0,
    });
    const [message, setMessage] = useState("");

    useEffect(() => setMessage(""), [formState]);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "characterType") {
            setFormState({
                characterType: value,
                weaponType: 0,
            });
        } else {
            setFormState((prevState) => {
                return {
                    ...prevState,
                    [name]: value,
                };
            });
        }
    };

    const handleSubmit = () => {
        if (formState.characterType === 0 || formState.weaponType === 0) {
            setMessage("Fill the form");
        } else {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            axios.post("/characters", formState, config).then((res) => {
                if (res.status === 200) {
                    setMessage("Character created");
                    axios.get("/characters/current-user", config).then((res) => {
                        setCharacterData(res.data);
                    });
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                }
            });
        }
    };

    return (
        <div className="register-content">
            <select name="characterType" onChange={handleChange} value={formState.characterType}>
                <option disabled value={0}>
                    Pick class
                </option>
                <option value="JEDI_KNIGHT">Jedi Knight</option>
                <option value="MAGE">Mage</option>
                <option value="SITH_LORD">Sith Lord</option>
                <option value="PRICE_HUNTER">Price Hunter</option>
            </select>

            <select name="weaponType" onChange={handleChange} value={formState.weaponType}>
                <option disabled value={0}>
                    Pick weapon
                </option>
                {formState.characterType === "JEDI_KNIGHT" && (
                    <>
                        <option value="GREEN_LIGHTSABER">Green Lightsaber</option>
                        <option value="BLUE_LIGHTSABER">Blue Lightsaber</option>
                        <option value="PURPLE_LIGHTSABER">Purple Lightsaber</option>
                    </>
                )}

                {formState.characterType === "PRICE_HUNTER" && (
                    <>
                        <option value="DUAL_PISTOL">Dual Pistol</option>
                        <option value="HEAVY_PISTOL">Heavy Pistol</option>
                        <option value="LIGHT_PISTOL">Light Pistol</option>
                    </>
                )}

                {formState.characterType === "SITH_LORD" && (
                    <>
                        <option value="CROSS_LIGHTSABER">Cross Lightsaber</option>
                        <option value="CURVED_LIGHTSABER">Curved Lightsaber</option>
                        <option value="DOUBLE_LIGHTSABER">Double Lightsaber</option>
                    </>
                )}

                {formState.characterType === "MAGE" && (
                    <>
                        <option value="ARCHANGEL_STAFF">Archangel Staff</option>
                        <option value="LUDEN_STAFF">Luden Staff</option>
                        <option value="VOID_STAFF">Void Staff</option>
                    </>
                )}
            </select>
            <div>{message}</div>
            <button onClick={handleSubmit} className="register-button">
                Create
            </button>
        </div>
    );
};

export default CreateCharacter;
