import React from "react";
import '../App.css';

const EducatorChildInfo = () => {
    return (
        <div>
            <div className="header">
                <label id="date">Datum</label>
                <button id="startSiteButton">Startsidan</button>
                <button id="logOutButton">Logga ut</button>
            </div>
            <div id="educator-child-info">
                <div className="sidebar">
                    <label className="groupName">Gruppnamn</label>
                    <button id="allChildrenButton">Alla barn</button>
                </div>
                <div className="child-info">
                    <h2 id="child-name">Barnens namn</h2>
                    <h3 id="child-address">Adress</h3>
                    <div id="caregivers">
                        <div id="caregiver-1">
                            <h4 id="caregiver-1-name">Vårdnadshavare 1</h4>
                            <h4 id="caregiver-1-address">Adress</h4>
                            <h4 id="caregiver-1-contact">Kontaktuppgifter</h4>
                        </div>
                        <div id="caregiver-2">
                            <h4 id="caregiver-2-name">Vårdnadshavare 2</h4>
                            <h4 id="caregiver-2-address">Adress</h4>
                            <h4 id="caregiver-2-contact">Kontaktuppgifter</h4>
                        </div>
                    </div>
                    <h3 id="caring-time-title">Omsörgstider</h3>
                    <div id="caring-times-info">
                        <div id="week-days">
                            <h4 id="monday">Måndag</h4>
                            <h4 id="tuesday">Tisdag</h4>
                            <h4 id="wednesday">Onsdag</h4>
                            <h4 id="thursday"> Torsdag</h4>
                            <h4 id="friday">Fredag</h4>
                        </div>
                        <div id="week-times">
                            <h4 id="monday-time">08:00 - 16:00</h4>
                            <h4 id="tuesday-time">08:00 - 16:00</h4>
                            <h4 id="wednesday-time">08:00 - 16:00</h4>
                            <h4 id="thursday-time">08:00 - 16:00</h4>
                            <h4 id="friday-time">08:00 - 16:00</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
            </div>
        </div>
    )
}
export default EducatorChildInfo;