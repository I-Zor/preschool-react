import React, { useState } from "react";
import AbsenceForm from "./AbsenceForm";
import '../App.css';

const EducatorChildren = () => {

    const [show, setShow] = useState(false);

    const Child = () => (
        <div>
            <button id="child-button">Barnens namn</button>
        </div>
    )

    const RegisterAbsence = () => (
        <div>
            <button onClick={() => setShow(true)} id="register-absence-button">Anmäl frånvaro</button>
        </div>
    )

    return (
        <div>
            <div className="header">
                <label id="date">Datum</label>
                <button id="startSiteButton">Startsidan</button>
                <button id="logOutButton">Logga ut</button>
            </div>
            <div id="educator-children">
                <div className="sidebar">
                    <label className="groupName">Gruppnamn</label>
                    <button id="allChildrenButton">Alla barn</button>
                </div>
                <div id="child-list">
                    <Child />
                    <RegisterAbsence />
                </div>
                <AbsenceForm show={show} close={() => setShow(false)}/>
            </div>
            <div className="footer">
            </div>
        </div>
    )
}

export default EducatorChildren;