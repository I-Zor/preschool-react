import React from "react";
import './App.css';
import RegisterAbsenceButton from "./RegisterAbsenceButton";

function WelcomeCaregiver() {
    return (
        <div id="welcome-caregiver">
            <h1>Välkommen förälder</h1>
            <div id="child-group">
                <button id="child-group-button">Karlo Zoricic <br />Nässelfjärillen</button>
                <RegisterAbsenceButton />
            </div>
        </div>
    );
}

export default WelcomeCaregiver;