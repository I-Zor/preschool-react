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

    let childId = localStorage.getItem("childId");

    const handleLogOut = () => {
        setUserName('');
        setPassword('');
        logOut('/');
    };

    const goToStartPage = () => {
        navigateToStartPage('/caregiver');
    };

    const renderCaringTimeWeekday = caringTimes.map((weekday) =>
        <label className="rendered-info" key={weekday.id} id={weekday.id}>{weekday.weekday}</label>);

    const renderCaringTimeHours = caringTimes.map((time) =>
        <label className="rendered-info" key={time.id} id={time.id}>{time.startHour}:{time.startMinut} - {time.endHour}:{time.endMinut}</label>);

    const renderEducatorsName = educators.map((educator) =>
        <label className="rendered-name" key={educator.id}>{educator.personalInformation.firstName} {educator.personalInformation.lastName} </label>);

    const renderEducatorsInfo = educators.map((educator) =>
        <label className="rendered-info" key={educator.id}>{educator.contactInformation.phoneNumber} <br /> {educator.contactInformation.email}</label>);


    useEffect(() => {
        function getChild() {
            let getChildUrl = 'http://localhost:8080/caregiver/child/' + childId;
            Axios.get(getChildUrl)
                .then((response) => {
                    let foundChild = response.data;
                    setChildName(foundChild.personalInformation.firstName);
                    setGroupName(foundChild.preschoolGroup.name);
                    setGroupId(foundChild.preschoolGroup.id)
                    setCaringTimes(foundChild.caringTimes);
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
                    setEducators(educators);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getChild();
        getEducatorsInGroup();
    }, [groupId, childId]);

    function getCaringTimes() {
        caringTimes.forEach(caringTime => {
            if (caringTime.weekday === 'Måndag') {
                localStorage.setItem("monday", JSON.stringify(caringTime));
            };
            if (caringTime.weekday === 'Tisdag') {
                localStorage.setItem("tuesday", JSON.stringify(caringTime));
            };
            if (caringTime.weekday === 'Onsdag') {
                localStorage.setItem("wednesday", JSON.stringify(caringTime));
            };
            if (caringTime.weekday === 'Torsdag') {
                localStorage.setItem("thursday", JSON.stringify(caringTime));
            };
            if (caringTime.weekday === 'Fredag') {
                localStorage.setItem("friday", JSON.stringify(caringTime));
            };
        });
    };

    function getTimesAndShow() {
        getCaringTimes();
        setShow(true);
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
                    <label id="caring-time-title-caregiver">Omsörgstider</label>
                    <div id="caring-times-info-caregiver">
                        <div className="justify-content">
                            {renderCaringTimeWeekday}
                        </div>
                        <div className="justify-content">
                            {renderCaringTimeHours}
                        </div>
                        <div className="justify-content">
                        <button onClick={() => getTimesAndShow()} className="register-change-button" >Ändra</button>
                            <CaringTimeForm show={show} close={() => setShow(false)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <label className="footer-font-size">Förskolan Hogwarts --- Hogwartsvägen 1 --- 070 555 55 55</label>
            </div>
        </div>
    );
}

export default CaregiverChildPage;