import React from "react";
import { useNavigate } from "react-router-dom";
import LogOut from "./LogOut";
import '../styling/App.css';

const HeaderToStartPage = ({ dateToday, setPassword, setUserName, user }) => {

    const navigateToCaregiverStartPage = useNavigate();
    const navigateToEducatorStartPage = useNavigate();

    function goToStartPage() {
        if (user === 'caregiver') {
            navigateToCaregiverStartPage('/caregiver');
        }
        if (user === 'educator') {
            navigateToEducatorStartPage('/educator');
        }
    };

    return (
        <div className="header">
                <label className="date">{dateToday}</label>
                <div className="buttons-container">
                    <button
                        onClick={goToStartPage}
                        className="start-site-button">
                        Startsidan
                    </button>
                    <div>
                        <LogOut
                            setUserName={setUserName}
                            setPassword={setPassword}>
                        </LogOut>
                    </div>
                </div>
            </div>
    );
}

export default HeaderToStartPage;