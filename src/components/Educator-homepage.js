import React from "react";
import '../App.css';

const EducatorHomepage = () => {

    return (
        <div >
            <div className="header">
                <label id="date">Datum</label>
                <button id="logOutButton">Logga ut</button>
            </div>
            <div id="educator-homepage">
                <div className="sidebar">
                    <label className="groupName">Gruppnamn</label>
                    <button id="allChildrenButton">Alla barn</button>
                </div>
                <div id="welcome-screen">
                    <h1 id="greeting-educator">Välkommen pedagog!</h1>
                    <h2 id="children-counter">Idag är närvarande 15 barn i din grupp.</h2>
                    <button id="absent-children-button">Se frånvarande barn</button>
                </div>
            </div>
            <div className="footer">
            </div>
        </div>
    )
}

export default EducatorHomepage;