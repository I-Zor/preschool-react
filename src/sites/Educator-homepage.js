import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styling/App.css';
import '../styling/Educator-homepage.css';

const EducatorHomepage = ({userId, dateToday, groupName, setGroupName, setAllChildren, setAbsences, setAbsentChildren, setUserName, setPassword }) => {

    const [educatorId, setEducatorId] = useState(userId);
    const [groupId, setGroupId] = useState('');
    const [numberOfPresences, setNumberOfPresences] = useState('');
    const [educatorsName, setEducatorsName] = useState('');

    const logOut = useNavigate();
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
                    setEducatorsName(user.personalInformation.firstName);
                })
                .catch((error) => {
                    console.log(error);
                })
        };
        const getPresence = () => {
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

        const getAbsence = () => {
            let list = [];
            const getAbsenceTodayUrl = 'http://localhost:8080/educator/absence/' + groupId;
            axios.get(getAbsenceTodayUrl)
                .then((response) => {
                    let absenceList = response.data;
                    setAbsences(absenceList);
                    absenceList.forEach(element => {
                        list.push(element.child);
                    });
                    setAbsentChildren(list);
                })
        };

        const getAllChildren = () => {
            const getAllChildren = 'http://localhost:8080/educator/children/' + groupId;
            axios.get(getAllChildren)
                .then((response) => {
                    let allChildren = response.data;
                    setAllChildren(allChildren);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getEducator();
        getPresence();
        getAbsence();
        getAllChildren();
    }, [groupId, educatorId, setAbsentChildren, setAbsences, setGroupName, setAllChildren]);

    const handleLogOut = () => {
        setUserName('');
        setPassword('');
        logOut('/');
    }

    const goToAbsentChildren = () => {
        navigateToAbsentChildren('/educator/absence')
    };

    const goToAllChildren = () => {
        navigateToAllChildren('/educator/children');
    };

    return (
        <div >
            <div className="header">
                <label className="date">{dateToday}</label>
                <button onClick={handleLogOut} className="log-out-button">Logga ut</button>
            </div>
            <div id="educator-homepage">
                <div className="sidebar">
                    <label className="child-name">{groupName}</label>
                    <button onClick={goToAllChildren} className="all-children-button">Alla barn</button>
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