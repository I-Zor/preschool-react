import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styling/App.css';
import '../styling/Educator-homepage.css';

const EducatorHomepage = ({ dateToday, setUserName, setPassword }) => {

    let educatorId = localStorage.getItem("userId");

    const [groupId, setGroupId] = useState('');
    const [numberOfPresences, setNumberOfPresences] = useState('');
    const [educatorsName, setEducatorsName] = useState('');
    const [groupName, setGroupName] = useState('');

    const navigateToAbsentChildren = useNavigate();
    const navigateToAllChildren = useNavigate();

    useEffect(() => {
        function getEducator() {
            const getEducatorUrl = 'http://localhost:8080/educator/' + educatorId;
            axios.get(getEducatorUrl)
                .then((response) => {
                    let user = response.data;
                    setGroupId(user.preschoolGroup.id);
                    setGroupName(user.preschoolGroup.name);
                    localStorage.setItem("groupId", user.preschoolGroup.id);
                    localStorage.setItem("groupName", user.preschoolGroup.name);
                    setEducatorsName(user.personalInformation.firstName);
                })
                .catch((error) => {
                    console.log(error);
                })
        };

        function getPresence() {
            let list = [];
            const getPresenceTodayUrl = 'http://localhost:8080/educator/present/' + groupId;
            axios.get(getPresenceTodayUrl)
                .then((response) => {
                    let presenceList = response.data;
                    setNumberOfPresences(presenceList.length);
                    presenceList.forEach(element => {
                        list.push(element.child)
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        function getAbsence() {
            let list = [];
            const getAbsenceTodayUrl = 'http://localhost:8080/educator/absence/' + groupId;
            axios.get(getAbsenceTodayUrl)
                .then((response) => {
                    let absenceList = response.data;
                    localStorage.setItem("absences", JSON.stringify(absenceList));
                    absenceList.forEach(element => {
                        list.push(element.child);
                    });
                    localStorage.setItem("absentChildren", JSON.stringify(list));
                })
                .catch((error) => {
                    console.log(error);
                })
        };

        function getAllChildren() {
            const getAllChildren = 'http://localhost:8080/educator/children/' + groupId;
            axios.get(getAllChildren)
                .then((response) => {
                    let allChildren = response.data;
                    localStorage.setItem("allChildren", JSON.stringify(allChildren));
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getEducator();
        getPresence();
        getAbsence();
        getAllChildren();
    }, [groupId, educatorId]);

    function goToAbsentChildren() {
        navigateToAbsentChildren('/educator/absence')
    };

    function goToAllChildren() {
        navigateToAllChildren('/educator/children');
    };

    return (
        <div >
            <Header
                dateToday={dateToday}
                setPassword={setPassword}
                setUserName={setUserName}>
            </Header>
            <div className="container">
                <div className="sidebar">
                    <label className="child-name">{groupName}</label>
                    <button
                        onClick={goToAllChildren}
                        className="all-children-button">
                        Alla barn
                    </button>
                </div>
                <div id="welcome-screen">
                    <h1 id="greeting-educator">Välkommen {educatorsName}!</h1>
                    <h2 id="children-counter">Idag är {numberOfPresences} närvarande barn i din grupp.</h2>
                    <button
                        onClick={goToAbsentChildren}
                        id="absent-children-button">
                        Se frånvarande barn
                    </button>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default EducatorHomepage;