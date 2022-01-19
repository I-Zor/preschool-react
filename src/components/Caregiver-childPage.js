import React, { useState } from "react";
import CaringTimeForm from "./CaringTimeForm";
import '../App.css';

const CaregiverChildPage = () => {

    const [show, setShow] = useState(false);

    return (
        <div>
            <div className="header">
                <label id="date">Datum</label>
                <button id="startSiteButton">Startsidan</button>
                <button id="logOutButton">Logga ut</button>
            </div>
            <div id="caregiver-child-info">
                <div className="sidebar">
                    <label htmlFor="" className="groupName">Barnens namn</label>
                    <label htmlFor="" id="name">Grupp</label>
                </div>
                <div>
                    <div id="educators-info">
                        <div id="educator-1">
                            <h3 id="educator-1-name">Pedagog 1</h3>
                            <h3 id="educator-1-email">Email</h3>
                            <h3 id="educator-1-telefon">Telefon</h3>
                        </div>
                        <div id="educator-2">
                            <h3 id="educator-2-name">Pedagog 2</h3>
                            <h3 id="educator-2-email">Email</h3>
                            <h3 id="educator-2-telefon">Telefon</h3>
                        </div>
                        <div id="educator-3">
                            <h3 id="educator-3-name">Pedagog 3</h3>
                            <h3 id="educator-3-email">Email</h3>
                            <h3 id="educator-3-telefon">Telefon</h3>
                        </div>
                    </div>

                    <h3 id="caring-time-title-caregiver">Omsörgstider</h3>

                    <div id="caring-times-info-caregiver">
                        <div id="caring-times-caregiver">
                            <h4>Måndag</h4>
                            <h4>Tisdag</h4>
                            <h4>Onsdag</h4>
                            <h4>Torsdag</h4>
                            <h4>Fredag</h4>
                        </div>
                        <div id="week-times-caregiver">
                            <h4 id="monday-time-caregiver">08:00 - 16:00</h4>
                            <h4 id="tuesday-time-caregiver">08:00 - 16:00</h4>
                            <h4 id="wednesday-time-caregiver">08:00 - 16:00</h4>
                            <h4 id="thursday-time-caregiver">08:00 - 16:00</h4>
                            <h4 id="friday-time-caregiver">08:00 - 16:00</h4>
                        </div>
                        <div id="change-buttons">
                            <button onClick={() => setShow(true)} id="change-button-monday" className="change-button">Ändra</button>
                            <button onClick={() => setShow(true)} id="change-button-tuesday" className="change-button">Ändra</button>
                            <button onClick={() => setShow(true)} id="change-button-wednesday" className="change-button">Ändra</button>
                            <button onClick={() => setShow(true)} id="change-button-thursday" className="change-button">Ändra</button>
                            <button onClick={() => setShow(true)} id="change-button-friday" className="change-button">Ändra</button>
                            <CaringTimeForm show={show} close={() => setShow(false)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
            </div>
        </div>
    );
}

export default CaregiverChildPage;