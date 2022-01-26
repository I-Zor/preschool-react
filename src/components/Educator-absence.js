import React from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

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
                <label id="date">{dateToday}</label>
                <div>
                    <button onClick={goToStartPage} id="startSiteButton">Startsidan</button>
                    <button onClick={handleLogOut} className="logOutButton">Logga ut</button>
                </div>
            </div>
            <div id="educator-absence">
                <div className="sidebar">
                    <label className="groupName">{groupName}</label>
                    <button onClick={goToAllChildren} id="allChildrenButton">Alla barn</button>
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