import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styling/App.css';
import '../styling/Caregiver-homepage.css';
import AbsenceForm from '../components/AbsenceForm';

const CaregiverHomepage = ({ userId, dateToday, setUserName, setPassword }) => {

    const [show, setShow] = useState(false);
    const [caregiverId, setCaregiverId] = useState(userId);
    const [caregiversName, setCaregiversName] = useState('');
    const [children, setChildren] = useState([]);

    const navigateToChildPage = useNavigate();
    const logOut = useNavigate();

    const handleLogOut = () => {
        setUserName('');
        setPassword('');
        logOut('/');
    };

    useEffect(() => {
        function getCaregiver() {
            let getCaregiverUrl = 'http://localhost:8080/caregiver/' + caregiverId;
            Axios.get(getCaregiverUrl)
                .then((response) => {
                    let caregiver = response.data;
                    setCaregiversName(caregiver.personalInformation.firstName);
                })
                .catch((error) => {
                    console.log(error);
                })
        };

        function getChildren() {
            let getChildrenByCaregiverUrl = 'http://localhost:8080/child/' + caregiverId;
            Axios.get(getChildrenByCaregiverUrl)
                .then((response) => {
                    let children = response.data;
                    setChildren(children);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        getCaregiver();
        getChildren();
    }, [caregiverId]);

    function showChildInfo(e) {
        window.sessionStorage.setItem("childId", e.target.id);
        navigateToChildPage('/caregiver/child');
    };

    function registerAbsence(e) {
        setShow(true);
        window.sessionStorage.setItem("childId", e.target.id);
    };

    const renderChildren = children.map((child) =>
        <button onClick={showChildInfo} className="render-children" id={child.id} key={child.id}>{child.personalInformation.firstName} {child.personalInformation.lastName}
            <br /> { child.preschoolGroup.name}</button>);

    const renderRegisterAbsenceButtons = children.map((child) =>
        <button onClick={registerAbsence} className="register-absence-button" id={child.id} key={child.id}>Anmäl frånvaro</button>);

    return (
        <div>
            <div className="header">
                <label className="date">{dateToday}</label>
                <button onClick={handleLogOut} className="log-out-button">Logga ut</button>
            </div>
            <div id="welcome-caregiver">
                <h1>Välkommen {caregiversName}</h1>
                <div id="child-group">
                    {renderChildren}
                    {renderRegisterAbsenceButtons}
                    <AbsenceForm show={show} close={() => setShow(false)} />
                </div>
            </div>
            <div className="footer">
            </div>

        </div>
    );
}

export default CaregiverHomepage;