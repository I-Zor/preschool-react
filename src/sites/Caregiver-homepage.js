import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styling/App.css';
import '../styling/Caregiver-homepage.css';
import AbsenceForm from '../components/AbsenceForm';

const CaregiverHomepage = ({ dateToday, setUserName, setPassword }) => {

    let caregiverId = localStorage.getItem("userId");
    const [show, setShow] = useState(false);
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
        localStorage.setItem("childId", e.target.id);
        navigateToChildPage('/caregiver/child');
    };

    function registerAbsence(e) {
        setShow(true);
        localStorage.setItem("childId", e.target.id);
    };

    const renderChildren = children.map((child) =>
        <button onClick={showChildInfo} className="render-children" id={child.id} key={child.id}>{child.personalInformation.firstName} {child.personalInformation.lastName}
            <br /> {child.preschoolGroup.name}</button>);

    const renderRegisterAbsenceButtons = children.map((child) =>
        <button onClick={registerAbsence} className="register-absence" id={child.id} key={child.id}>Anmäl frånvaro</button>);

    return (
        <div>
            <div className="header">
                <label className="date">{dateToday}</label>
                <button onClick={handleLogOut} className="log-out-button">Logga ut</button>
            </div>
            <div className="container">
                <div id="welcome-caregiver">
                    <h1 className="font">Välkommen {caregiversName}</h1>
                    <div id="child-group">
                        <div className="render-container">
                            {renderChildren}
                        </div>
                        <div id="render-container">
                            {renderRegisterAbsenceButtons}
                        </div>
                        <AbsenceForm show={show} close={() => setShow(false)} />
                    </div>
                </div>
            </div>
            <div className="footer">
                <label className="footer-font-size">Förskolan Hogwarts --- Hogwartsvägen 1 --- 070 555 55 55</label>
            </div>

        </div>
    );
}

export default CaregiverHomepage;