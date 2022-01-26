import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import { useNavigate } from "react-router-dom"; import '../App.css';


const EducatorChildInfo = ({ dateToday, groupName, setUserName, setPassword }) => {

    const [childFirstName, setChildFirstName] = useState('');
    const [childLastName, setChildLastName] = useState('');
    const [childAddress, setChildAddress] = useState('');
    const [childCity, setChildCity] = useState('');
    const [childZipCode, setChildZipCode] = useState('');
    const [caregivers, setCaregivers] = useState([]);
    const [relatives, setRelatives] = useState([]);
    const [caringTimes, setCaringTimes] = useState([]);

    const logOut = useNavigate();
    const navigateToAllChildren = useNavigate();
    const navigateToStartPage = useNavigate();

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

    useEffect(() => {
        let childId = window.sessionStorage.getItem("childId");
        let getChildUrl = 'http://localhost:8080/educator/child/' + childId;
        axios.get(getChildUrl)
            .then((response) => {
                let child = response.data;
                console.log(child);
                setChildFirstName(child.personalInformation.firstName);
                setChildLastName(child.personalInformation.lastName);
                setChildAddress(child.personalInformation.address);
                setChildCity(child.personalInformation.city.name);
                setChildZipCode(child.personalInformation.zipCode.number);
                setCaregivers(child.caregivers);
                setRelatives(child.relatives);
                setCaringTimes(child.caringTimes);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const renderCaregiversName = caregivers.map((caregiver) =>
        <h4 className="c-name" key={caregiver.id}>{caregiver.personalInformation.firstName} {caregiver.personalInformation.lastName} </h4>);

    const renderCaregiversAddress = caregivers.map((caregiver) =>
        <h4 className="c-address" key={caregiver.id}>{caregiver.personalInformation.address}<br /> {caregiver.personalInformation.zipCode.number} {caregiver.personalInformation.city.name}</h4>);

    const renderCaregiversInfo = caregivers.map((caregiver) =>
        <h4 className="c-info" key={caregiver.id}>{caregiver.contactInformation.phoneNumber} <br /> {caregiver.contactInformation.email}</h4>);

    const renderRelativesName = relatives.map((relative) =>
        <h4 className="c-name" key={relative.id}>{relative.firstName} {relative.lastName} </h4>);

    const renderRelativesRelation = relatives.map((relative) =>
        <h4 className="c-name" key={relative.id}>{relative.relationToChild} </h4>);

    const renderRelativesInfo = relatives.map((relative) =>
        <h4 className="c-info" key={relative.id}>{relative.contactInformation.phoneNumber} <br /> {relative.contactInformation.email}</h4>);

    const renderCaringTimeWeekday = caringTimes.map((weekday) =>
        <h4 className="c-info" key={weekday.id} id={weekday.id}>{weekday.weekday}</h4>);

    const renderCaringTimeHours = caringTimes.map((time) =>
        <h4 className="c-info" key={time.id} id={time.id}>{time.startHour}:{time.startMinut} - {time.endHour}:{time.endMinut}</h4>);

    return (
        <div>
            <div className="header">
                <label id="date">{dateToday}</label>
                <div>
                    <button onClick={goToStartPage} id="startSiteButton">Startsidan</button>
                    <button onClick={handleLogOut} className="logOutButton">Logga ut</button>
                </div>
            </div>
            <div id="educator-child-info">
                <div className="sidebar">
                    <label className="groupName">{groupName}</label>
                    <button onClick={goToAllChildren} id="allChildrenButton">Alla barn</button>
                </div>
                <div className="child-info">
                    <h2 id="child-name">{childFirstName} {childLastName}</h2>
                    <h3 id="child-address">{childAddress}</h3>
                    <h3 id="child-city">{childZipCode} {childCity}</h3>
                    <h4>Vårdnadshavare:</h4>
                    <div className="caregivers">
                        <div className="caregivers-name">
                            {renderCaregiversName}
                        </div>
                        <div className="caregivers-address">
                            {renderCaregiversAddress}
                        </div>
                        <div className="caregivers-info">
                            {renderCaregiversInfo}
                        </div>
                    </div>
                    <h4>Närstående:</h4>
                    <div className="relatives">
                        <div className="caregivers">
                            <div className="caregivers-name">
                                {renderRelativesName}
                            </div>
                            <div className="caregivers-address">
                                {renderRelativesRelation}
                            </div>
                            <div className="caregivers-info">
                                {renderRelativesInfo}
                            </div>
                        </div>
                    </div>
                    <h3 id="caring-time-title">Omsörgstider</h3>
                    <div id="caring-times-info">
                        <div id="week-days">
                            {renderCaringTimeWeekday}
                        </div>
                        <div id="week-times">
                            {renderCaringTimeHours}
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
            </div>
        </div>
    )
}
export default EducatorChildInfo;