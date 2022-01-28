import React, { useState } from "react";
import AbsenceForm from '../components/AbsenceForm';
import { useNavigate } from "react-router-dom";
import '../styling/App.css';
import '../styling/Educator-children.css';


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
                <label className="date">{dateToday}</label>
                <div>
                    <button onClick={goToStartPage} className="start-site-button">Startsidan</button>
                    <button onClick={handleLogOut} className="log-out-button">Logga ut</button>
                </div>
            </div>
            <div id="educator-children">
                <div className="sidebar">
                    <label className="child-name">{groupName}</label>
                    <button onClick={goToAllChildren} className="all-children-button">Alla barn</button>
                </div>
                <div id="child-list">
                    <div id="render-present">
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