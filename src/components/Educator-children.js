import React, { useState } from "react";
import AbsenceForm from "./AbsenceForm";
import { useNavigate } from "react-router-dom"; import '../App.css';

const EducatorChildren = ({ dateToday, allChildren, groupName, setUserName, setPassword }) => {

    const [show, setShow] = useState(false);
    const logOut = useNavigate();
    const navigateToAllChildren = useNavigate();
    const navigateToStartPage = useNavigate();
    const navigateToChildPage = useNavigate();

    const handleLogOut = () => {
        setUserName('');
        setPassword('');
        logOut('/');
    };

    const goToAllChildren = () => {
        navigateToAllChildren('/educator/children');
    };

    const goToStartPage = () => {
        navigateToStartPage('/educator');
    };

    function registerAbsence(e) {
        setShow(true);
        window.sessionStorage.setItem("childId", e.target.id);
    };

    function showChildInfo(e) {
        window.sessionStorage.setItem("childId", e.target.id);
        navigateToChildPage('/educator/child');
    }

    const renderPresentChildren = allChildren.map((child) =>
        <button onClick={showChildInfo} className="child-button" id={child.id} key={child.id}>{child.personalInformation.firstName} {child.personalInformation.lastName}</button>);

    const renderRegisterAbsenceButtons = allChildren.map((child) =>
        <button onClick={registerAbsence} className="register-absence-button" id={child.id} key={child.id}>Anmäl frånvaro</button>);
    
    return (
        <div>
            <div className="header">
                <label id="date">{dateToday}</label>
                <div>
                    <button onClick={goToStartPage} id="startSiteButton">Startsidan</button>
                    <button onClick={handleLogOut} className="logOutButton">Logga ut</button>
                </div>
            </div>
            <div id="educator-children">
                <div className="sidebar">
                    <label className="groupName">{groupName}</label>
                    <button onClick={goToAllChildren} id="allChildrenButton">Alla barn</button>
                </div>
                <div id="child-list">
                    <div className="render-present">
                        {renderPresentChildren}
                    </div>
                    <div>
                        {renderRegisterAbsenceButtons}
                    </div>
                </div>
                <AbsenceForm show={show} close={() => setShow(false)} />
            </div>
            <div className="footer">
            </div>
        </div>
    )
}

export default EducatorChildren;