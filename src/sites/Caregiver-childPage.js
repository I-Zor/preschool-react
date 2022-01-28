import React, { useState, useEffect } from "react";
import CaringTimeForm from "../components/CaringTimeForm";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styling/App.css';
import '../styling/Caregiver-childPage.css'

const CaregiverChildPage = ({ dateToday, setUserName, setPassword }) => {

    const [show, setShow] = useState(false);
    const [childName, setChildName] = useState('');
    const [groupName, setGroupName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [caringTimes, setCaringTimes] = useState([]);
    const [educators, setEducators] = useState([]);

    const logOut = useNavigate();
    const navigateToStartPage = useNavigate();


    const handleLogOut = () => {
        setUserName('');
        setPassword('');
        logOut('/');
    };

    const goToStartPage = () => {
        navigateToStartPage('/caregiver');
    };

    const renderCaringTimeWeekday = caringTimes.map((weekday) =>
        <h4 className="rendered-info" key={weekday.id} id={weekday.id}>{weekday.weekday}</h4>);

    const renderCaringTimeHours = caringTimes.map((time) =>
        <h4 className="rendered-info" key={time.id} id={time.id}>{time.startHour}:{time.startMinut} - {time.endHour}:{time.endMinut}</h4>);

    const renderChangeButtons = caringTimes.map((time) =>
        <button onClick={() => setShow(true)} className="register-change-button" id={time.id} key={time.id}>Ändra</button>);

    const renderEducatorsName = educators.map((educator) =>
        <h4 className="rendered-name" key={educator.id}>{educator.personalInformation.firstName} {educator.personalInformation.lastName} </h4>);

    const renderEducatorsInfo = educators.map((educator) =>
        <h4 className="rendered-info" key={educator.id}>{educator.contactInformation.phoneNumber} <br /> {educator.contactInformation.email}</h4>);


    useEffect(() => {
        function getChild() {
            let childId = window.sessionStorage.getItem("childId");
            let getChildUrl = 'http://localhost:8080/caregiver/child/' + childId;
            Axios.get(getChildUrl)
                .then((response) => {
                    let child = response.data;
                    console.log(child);
                    setChildName(child.personalInformation.firstName);
                    setGroupName(child.preschoolGroup.name);
                    setGroupId(child.preschoolGroup.id)
                    setCaringTimes(child.caringTimes);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        function getEducatorsInGroup() {
            let getEducatorsinGroupUrl = 'http://localhost:8080/caregiver/educator/' + groupId;
            Axios.get(getEducatorsinGroupUrl)
                .then((response) => {
                    let educators = response.data;
                    console.log(educators);
                    setEducators(educators);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getChild();
        getEducatorsInGroup();
    }, [groupId]);

    return (
        <div>
            <div className="header">
                <label className="date">{dateToday}</label>
                <div>
                    <button onClick={goToStartPage} id="startSiteButton">Startsidan</button>
                    <button onClick={handleLogOut} className="logOutButton">Logga ut</button>
                </div>
            </div>
            <div className="container">
                <div className="sidebar">
                    <label className="child-name">{childName}</label>
                    <label id="name">{groupName}</label>
                </div>
                <div id="caregiver-info">
                    <div className="caregivers">
                        <div id="educator-1">
                            {renderEducatorsName}
                        </div>
                        <div id="educator-2">
                            {renderEducatorsInfo}
                        </div>
                    </div>
                    <h3 id="caring-time-title-caregiver">Omsörgstider</h3>
                    <div id="caring-times-info-caregiver">
                        <div id="caring-times-caregiver">
                            {renderCaringTimeWeekday}
                        </div>
                        <div id="week-times-caregiver">
                            {renderCaringTimeHours}
                        </div>
                        <div id="change-buttons">
                            {renderChangeButtons}
                            <CaringTimeForm show={show} close={() => setShow(false)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
            </div>
        </div>
    );
}

export default CaregiverChildPage;