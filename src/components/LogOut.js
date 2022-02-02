import React from "react";
import { useNavigate } from "react-router-dom";
import '../styling/App.css';

const LogOut = ({setUserName, setPassword}) => {

    const logOut = useNavigate();

    function handleLogOut() {
        setUserName('');
        setPassword('');
        logOut('/');
    };

    return (
        <div>
            <button
                onClick={handleLogOut}
                className="log-out-button">
                Logga ut
            </button>
        </div>
    );
}

export default LogOut;