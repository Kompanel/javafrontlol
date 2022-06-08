import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../common/axios";

import { UserContext } from "../common/UserContext";

const Register = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });

    useEffect(() => {
        if (user.id !== "") {
            navigate("/");
        }
    }, []);

    const handleFormDataChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    };

    const handleFormSubmition = (event) => {
        event.preventDefault();
        if (formData.username === "" || formData.email === "" || formData.password === "") {
            document.getElementById("REGISTER-MESSAGE").innerHTML = "There is at least one empty field";
        }
        const body = {
            ...formData,
            role: ["USER"],
        };
        axios.post("/auth/sign-up", body).then((res) => {
            document.getElementById("REGISTER-MESSAGE").innerHTML = res.data.message;
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        });
    };

    return (
        <div className="register-container">
            <form className="register-content" onSubmit={handleFormSubmition}>
                <input type="email" name="email" placeholder="email" onChange={handleFormDataChange} />
                <input type="text" name="username" placeholder="username" onChange={handleFormDataChange} />
                <input type="password" name="password" placeholder="password" onChange={handleFormDataChange} />
                <div id="REGISTER-MESSAGE"></div>
                <button type="submit" className="register-button">
                    Register
                </button>
                <Link to="/login" className="register-span">
                    <span>Already have account? Login here!</span>
                </Link>
            </form>
        </div>
    );
};

export default Register;
