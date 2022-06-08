import React, { useState, useEffect, useContext } from "react";

import axios from "../common/axios";
import { UserContext } from "../common/UserContext";

const Dev = () => {
    const { user } = useContext(UserContext);

    const [logs, setLogs] = useState([]);

    const config = {
        headers: { Authorization: `Bearer ${user.token}` },
    };

    useEffect(() => {
        axios.get("/log/recent", config).then((res) => {
            setLogs(res.data);
        });
    }, []);

    return <div>{logs}</div>;
};

export default Dev;
