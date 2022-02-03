import React, { useState, useEffect } from "react";
import CaringTimeForm from "../components/CaringTimeForm";
import Axios from "axios";
import HeaderToStartPage from "../components/Header-startPage";
import Footer from "../components/Footer";
import '../styling/App.css';
import '../styling/Caregiver-childPage.css'

const CaregiverChildPage = ({ dateToday, setUserName, setPassword, user, setUser }) => {

    const [isModalOpen, setModal] = useState(false);
    const [childName, setChildName] = useState('');
    const [groupName, setGroupName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [caringTimes, setCaringTimes] = useState([]);
    const [educators, setEducators] = useState([]);

    let childId = localStorage.getItem("childId");

    useEffect(() => {
        setUser('caregiver');
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
    }, [groupId, childId, setUser, caringTimes]);

    const renderCaringTimeWeekday = caringTimes.map((weekday) =>
        <label
            className="rendered-info"
            key={weekday.id}
            id={weekday.id}>
            {weekday.weekday}
        </label>);

    const renderCaringTimeHours = caringTimes.map((time) =>
        <label
            className="rendered-info"
            key={time.id}
            id={time.id}>
            {time.startHour}:{time.startMinut} - {time.endHour}:{time.endMinut}
        </label>);

    const renderEducatorsName = educators.map((educator) =>
        <label
            className="rendered-name"
            key={educator.id}>
            {educator.personalInformation.firstName} {educator.personalInformation.lastName}
        </label>);

    const renderEducatorsInfo = educators.map((educator) =>
        <label
            id="space-bottom"
            className="rendered-info"
            key={educator.id}>
            {educator.contactInformation.phoneNumber} <br />
            {educator.contactInformation.email}
        </label>);


    function getTimesAndShow() {
        setModal(true);
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
                <div className="sidebar">
                    <label className="child-name">{childName}</label>
                    <label id="name">{groupName}</label>
                </div>
                <div id="caregiver-info">
                    <div className="caregivers">
                        <div id="educator-1">
                            <label className="font-size"> <strong>Pedagoger:</strong></label>
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
                            <button
                                onClick={() => getTimesAndShow()}
                                className="register-change-button" >
                                Ändra
                            </button>
                            <CaringTimeForm
                                isModalOpen={isModalOpen}
                                setModal={setModal} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default CaregiverChildPage;