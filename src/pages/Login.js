import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";

import axios from "../common/axios";
import { UserContext } from "../common/UserContext";

const Login = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    useEffect(() => {
        if (user.id !== "") {
            navigate("/");
        }
    }, []);

    const handleSubmit = (values) => {
        axios
            .post("/auth/sign-in", values)
            .then((res) => {
                if (res.status === 200) {
                    setUser(res.data);
                    document.getElementById("LOGIN-MESSAGE").innerHTML = "Logged in successfully";
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                }
            })
            .catch(() => (document.getElementById("LOGIN-MESSAGE").innerHTML = "Bad credencials"));
    };
    return (
        <div className="register-container">
            <form className="register-content" onSubmit={formik.handleSubmit}>
                <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <div id="LOGIN-MESSAGE"></div>
                <button type="submit" className="register-button">
                    Login
                </button>
                <Link to="/register" className="register-span">
                    <span>No account? Create one here!</span>
                </Link>
            </form>
        </div>
    );
};

export default Login;
