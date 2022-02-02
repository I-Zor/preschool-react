import React from "react";
import LogOut from "./LogOut";
import '../styling/App.css';

const Header = ({dateToday, setUserName, setPassword}) => {
    return (
        <div className="header">
            <label className="date">{dateToday}</label>
            <div>
                <LogOut
                    setUserName={setUserName}
                    setPassword={setPassword}>
                </LogOut>
            </div>
        </div>
    );
}

export default Header;