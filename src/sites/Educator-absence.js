import React from "react";
import { useNavigate } from "react-router-dom";
import '../styling/App.css';
import '../styling/Educator-absence.css';

const EducatorAbsence = ({ dateToday, absentChildren, absences, setUserName, setPassword, groupName }) => {

    const logOut = useNavigate();
    const navigateToStartPage = useNavigate();
    const navigateToAllChildren = useNavigate();
    const navigateToChildPage = useNavigate();

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
        window.sessionStorage.setItem("childId", e.target.id);
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
            <div id="educator-absence">
                <div className="sidebar">
                    <label className="child-name">{groupName}</label>
                    <button onClick={goToAllChildren} className="all-children-butto">Alla barn</button>
                </div>
                <div id="absent-children">
                    {renderChildren}
                    {renderReason}
                </div>
            </div>
            <div className="footer">
            </div>
        </div>
    )
}
export default EducatorAbsence;