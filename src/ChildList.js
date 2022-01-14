import React from "react";
import './App.css';
import RegisterAbsenceButton from "./RegisterAbsenceButton";

function ChildList() {
    return (
        <div id="child-list">
            <button id="child-button">Barnens namn</button>
            <RegisterAbsenceButton />
        </div>
    );
}

export default ChildList;