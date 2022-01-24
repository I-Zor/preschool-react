import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import '../App.css';

const EducatorHomepage = ({ educator, setEducator, presentChildren, setPresentChildren, setAbsences, absentChildren, setAbsentChildren, setUserName, setPassword }) => {

    /*     const [educatorsName, setEducatorsName] = useState("");
        const [groupName, setGroupName] = useState(educator.preschoolGroup.name);
        const [groupId, setGroupId] = useState("");
        const [numberOfPresences, setNumberOfPresences] = useState("");
        const [presentChildren, setPresentChildren] = useState([]);
     */
    const [groupId, setGroupId] = useState(educator.preschoolGroup.id);
    const [groupName, setGroupName] = useState(educator.preschoolGroup.name);
    const [educatorsName, setEducatorsName] = useState(educator.personalInformation.firstName);
    const [dateToday, setDateToday] = useState("");
    const [numberOfPresences, setNumberOfPresences] = useState("");

    const logOut = useNavigate();
    const navigateToAbsentChildren = useNavigate();


    useEffect(() => {
        const getDate = () => {
            let today = new Date().toLocaleDateString();
            setDateToday(today);
        };

        const getPresence = () => {
            let getPresenceTodayUrl = 'http://localhost:8080/educator/present/' + groupId;
            let list = [];
            axios.get(getPresenceTodayUrl)
                .then((response) => {
                    let presenceList = response.data;
                    setNumberOfPresences(presenceList.length);
                    presenceList.forEach(element => {
                        list.push(element.child)
                    });
                    setPresentChildren(list);

                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const getAbsence = () => {
            let getAbsenceTodayUrl = 'http://localhost:8080/educator/absence/' + groupId;
            let list = [];
            axios.get(getAbsenceTodayUrl)
                .then((response) => {
                    let absenceList = response.data;
                    setAbsences(absenceList);
                    console.log(absenceList);
                    absenceList.forEach(element => {
                        list.push(element.child);
                    });
                    setAbsentChildren(list);
            })

        }
        getPresence();
        getDate();
        getAbsence();
    }, [groupId, setPresentChildren, setAbsentChildren, setAbsences]);

    console.log(absentChildren);
    console.log(presentChildren);

    const handleLogOut = () => {
        setUserName('');
        setPassword('');
        logOut('/');
    }

    const goToAbsentChildren = () => {
        navigateToAbsentChildren('/educator/absence')
    }

    return (
        <div >
            <div className="header">
                <label id="date">{dateToday}</label>
                <button onClick={handleLogOut} className="logOutButton">Logga ut</button>
            </div>
            <div id="educator-homepage">
                <div className="sidebar">
                    <label className="groupName">{groupName}</label>
                    <button id="allChildrenButton">Alla barn</button>
                </div>
                <div id="welcome-screen">
                    <h1 id="greeting-educator">Välkommen {educatorsName}!</h1>
                    <h2 id="children-counter">Idag är {numberOfPresences} närvarande barn i din grupp.</h2>
                    <button onClick={goToAbsentChildren} id="absent-children-button">Se frånvarande barn</button>
                </div>
            </div>
            <div className="footer">
            </div>
        </div>
    )
}

export default EducatorHomepage;