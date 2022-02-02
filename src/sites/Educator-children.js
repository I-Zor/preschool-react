import React, { useState, useEffect } from "react";
import AbsenceForm from '../components/AbsenceForm';
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderToStartPage from "../components/Header-startPage";
import Sidebar from "../components/Sidebar";
import '../styling/App.css';
import '../styling/Educator-children.css';

const EducatorChildren = ({ dateToday, setUserName, setPassword, user, setUser }) => {

    const [show, setShow] = useState(false);

    const navigateToChildPage = useNavigate();

    let allChildren = JSON.parse(localStorage.getItem("allChildren"));
    let groupName = localStorage.getItem("groupName");

    const renderPresentChildren = allChildren.map((child) =>
        <button
            onClick={showChildInfo}
            className="child-button"
            id={child.id}
            key={child.id}>
            {child.personalInformation.firstName} {child.personalInformation.lastName}
        </button>);

    const renderRegisterAbsenceButtons = allChildren.map((child) =>
        <button
            onClick={registerAbsence}
            className="register-absence-button"
            id={child.id}
            key={child.id}>
            Anmäl frånvaro
        </button>);

    useEffect(() => {
        setUser('educator');
    }, [setUser]);

    function registerAbsence(e) {
        setShow(true);
        localStorage.setItem("childId", e.target.id);
    };

    function showChildInfo(e) {
        localStorage.setItem("childId", e.target.id);
        navigateToChildPage('/educator/child');
    }

    return (
        <div>
            <HeaderToStartPage
                dateToday={dateToday}
                setPassword={setPassword}
                setUserName={setUserName}
                user={user}>
            </HeaderToStartPage>
            <div className="container">
                <Sidebar
                    groupName={groupName}>
                </Sidebar>
                <div id="child-list">
                    <div className="render-container">
                        {renderPresentChildren}
                    </div>
                    <div className="render-container">
                        {renderRegisterAbsenceButtons}
                    </div>
                </div>
                <AbsenceForm show={show} close={() => setShow(false)} />
            </div>
            <Footer></Footer>
        </div>
    )
}

export default EducatorChildren;