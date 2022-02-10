import React, { useEffect, useState } from "react";
import Axios from "axios";
import Footer from "../components/Footer";
import HeaderToStartPage from "../components/Header-startPage";
import Sidebar from "../components/Sidebar";
import '../styling/App.css';
import '../styling/Educator-childInfo.css';

const EducatorChildInfo = ({ dateToday, setUserName, setPassword, setUser, user }) => {

    let childId = localStorage.getItem("childId");
    let groupName = localStorage.getItem("groupName");

    const [childFirstName, setChildFirstName] = useState('');
    const [childLastName, setChildLastName] = useState('');
    const [childAddress, setChildAddress] = useState('');
    const [childCity, setChildCity] = useState('');
    const [childZipCode, setChildZipCode] = useState('');
    const [caregivers, setCaregivers] = useState([]);
    const [relatives, setRelatives] = useState([]);
    const [caringTimes, setCaringTimes] = useState([]);

    useEffect(() => {

        setUser('educator');

        let getChildUrl = 'http://localhost:8080/educator/child/' + childId;
        Axios.get(getChildUrl)
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
    }, [childId, setUser]);

    const renderCaregiversNames = caregivers.map((caregiver) =>
        <h4
            className="rendered-name"
            key={caregiver.id}>
            {caregiver.personalInformation.firstName} {caregiver.personalInformation.lastName}
        </h4>);

    const renderCaregiversAddresses = caregivers.map((caregiver) =>
        <h4
            className="rendered-address"
            key={caregiver.id}>
            {caregiver.personalInformation.address}<br />
            {caregiver.personalInformation.zipCode.number} {caregiver.personalInformation.city.name}
        </h4>);

    const renderCaregiversInfo = caregivers.map((caregiver) =>
        <h3
            className="rendered-address"
            key={caregiver.id}>
            {caregiver.contactInformation.phoneNumber} <br />
            {caregiver.contactInformation.email}
        </h3>);

    const renderRelativesName = relatives.map((relative) =>
        <h4
            className="rendered-name"
            key={relative.id}>
            {relative.firstName} {relative.lastName}
        </h4>);

    const renderRelativesRelation = relatives.map((relative) =>
        <h4
            className="rendered-address"
            key={relative.id}>
            {relative.relationToChild}
        </h4>);

    const renderRelativesInfo = relatives.map((relative) =>
        <h3
            className="rendered-address"
            key={relative.id}>
            {relative.contactInformation.phoneNumber} <br />
            {relative.contactInformation.email}
        </h3>);

    let monday = {};
    let tuesday = {};
    let wednesday = {};
    let thursday = {};
    let friday = {};

    caringTimes.forEach((element) => {
        if (element.weekday === "Måndag") {
            monday = element;
        };
        if (element.weekday === "Tisdag") {
            tuesday = element;
        };
        if (element.weekday === "Onsdag") {
            wednesday = element;
        };
        if (element.weekday === "Torsdag") {
            thursday = element;
        };
        if (element.weekday === "Fredag") {
            friday = element;
        };
    });

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
                <div className="info-container">
                    <div>
                        <h2 className="font">{childFirstName} {childLastName}</h2>
                        <h3 className="font-dark">{childAddress}</h3>
                        <h3
                            className="font-dark"
                            id="space-bottom">
                            {childZipCode} {childCity}
                        </h3>
                    </div>
                    <div className="caregivers-info" id="space-bottom">
                        <div className="caregivers-container" id="space-right">
                            <h3 className="font">Vårdnadshavare:</h3>
                            <div className="caregivers">
                                <div className="caregivers-info" >
                                    {renderCaregiversNames}
                                </div>
                                <div className="caregivers-info">
                                    {renderCaregiversAddresses}
                                </div>
                                <div className="caregivers-info">
                                    {renderCaregiversInfo}
                                </div>
                            </div>
                        </div>
                        <div className="caregivers-container">
                            <h3 className="font">Närstående:</h3>
                            <div className="caregivers">
                                <div className="caregivers-info">
                                    {renderRelativesName}
                                    {renderRelativesRelation}
                                </div>
                                <div >
                                    {renderRelativesInfo}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="caregivers-container">
                        <h3 className="font">Omsörgstider</h3>
                        <div id="caring-times-info">
                            <div className="rendered-info-space">
                                <h4 className="space">Måndag</h4>
                                <h4 className="space">Tisdag</h4>
                                <h4 className="space">Onsdag</h4>
                                <h4 className="space">Torsdag</h4>
                                <h4 className="space">Fredag</h4>
                            </div>
                            <div>
                                <div className="rendered-info-minor">
                                    {monday.startHour}:{monday.startMinut} - {monday.endHour}:{monday.endMinut}
                                </div>
                                <div className="rendered-info-minor">
                                    {tuesday.startHour}:{tuesday.startMinut} - {tuesday.endHour}:{tuesday.endMinut}
                                </div>
                                <div className="rendered-info-minor">
                                    {wednesday.startHour}:{wednesday.startMinut} - {wednesday.endHour}:{wednesday.endMinut}
                                </div>
                                <div className="rendered-info-minor">
                                    {thursday.startHour}:{thursday.startMinut} - {thursday.endHour}:{thursday.endMinut}
                                </div>
                                <div className="rendered-info-minor">
                                    {friday.startHour}:{friday.startMinut} - {friday.endHour}:{friday.endMinut}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
export default EducatorChildInfo;