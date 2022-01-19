import React, {useState} from "react";
import '../App.css';
import AbsenceForm from "./AbsenceForm";

const CaregiverHomepage = () => {

    const [show, setShow] = useState(false);

    return (
        <div>
            <div className="header">
                <label id="date">Datum</label>
                <button id="logOutButton">Logga ut</button>
            </div>
            <div id="welcome-caregiver">
                <h1>Välkommen förälder</h1>
                <div id="child-group">
                    <button id="child-group-button">Karlo Zoricic <br />Nässelfjärillen</button>
                    <button onClick={() => setShow(true)} id="register-absence-button">Anmäl frånvaro</button>
                    <AbsenceForm show={show} close={() => setShow(false)}/>
                </div>
            </div>
            <div className="footer">
            </div>

        </div>
    );
}

export default CaregiverHomepage;