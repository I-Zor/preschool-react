import React from "react";
import '../App.css';

const EducatorAbsence = () => {

    const Child = () => (
        <div>
            <button id="child-button">Barnens namn</button>
        </div>
    );

    const Reason = () => (
        <div>
            <label > Anledning att barnet är frånvarande</label>
        </div>
    );

    return (
        <div>
            <div className="header">
                <label id="date">Datum</label>
                <button id="startSiteButton">Startsidan</button>
                <button id="logOutButton">Logga ut</button>
            </div>
            <div id="educator-absence">
                <div className="sidebar">
                <label className="groupName">Gruppnamn</label>
                <button id="allChildrenButton">Alla barn</button>
            </div>
            <div id="absent-children">
                    <Child />
                    <Reason />
                </div>
            </div>
            
            <div className="footer">
            </div>

        </div>
    )
}
export default EducatorAbsence;