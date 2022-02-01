import React from "react";
import { useNavigate } from "react-router-dom";
import '../styling/App.css';
import '../styling/Educator-absence.css';

const EducatorAbsence = ({ dateToday, setUserName, setPassword }) => {

    const logOut = useNavigate();
    const navigateToStartPage = useNavigate();
    const navigateToAllChildren = useNavigate();
    const navigateToChildPage = useNavigate();

    let absentChildren = JSON.parse(localStorage.getItem("absentChildren"));
    let absences = JSON.parse(localStorage.getItem("absences"));
    let groupName = localStorage.getItem("groupName");

    const handleLogOut = () => {
        setUserName('');
        setPassword('');
        logOut('/');
    }

    const goToStartPage = () => {
        navigateToStartPage('/educator');
    };

    const goToAllChildren = () => {
        navigateToAllChildren('/educator/children');
    }

    const renderChildren = absentChildren.map((child) =>
        <button onClick={showChildInfo} className="absent-children" id={child.id} key={child.id}>{child.personalInformation.firstName} {child.personalInformation.lastName}</button>);

    const renderReason = absences.map((absence) =>
        <label className="reason" key={absence.id}> {absence.reasonToAbsence}</label>);

    function showChildInfo(e) {
        localStorage.setItem("childId", e.target.id);
        navigateToChildPage('/educator/child');
    }


    return (
        <div>
            <div className="header">
                <label className="date">{dateToday}</label>
                <div>
                    <button onClick={goToStartPage} className="start-site-button">Startsidan</button>
                    <button onClick={handleLogOut} className="log-out-button">Logga ut</button>
                </div>
            </div>
            <div className="container">
                <div className="sidebar">
                    <label className="child-name">{groupName}</label>
                    <button onClick={goToAllChildren} className="all-children-button">Alla barn</button>
                </div>
                <div id="absent-children">
                    <div>
                    <h3 className="font">Frånvarande barn:</h3>
                    </div>
                    <div id="absent-list">
                        <div className="render-container">
                            {renderChildren}
                        </div>
                        <div id="render-reason">
                            {renderReason}
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <label className="footer-font-size">Förskolan Hogwarts --- Hogwartsvägen 1 --- 070 555 55 55</label>
            </div>
        </div>
    )
}
export default EducatorAbsence;