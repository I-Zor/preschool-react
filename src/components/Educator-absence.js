import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

const EducatorAbsence = ({ educator, absentChildren, setAbsentChildren, absences, setUserName, setPassword }) => {
    
    const [groupName, setGroupName] = useState(educator.preschoolGroup.name);
    const [dateToday, setDateToday] = useState("");

    const logOut = useNavigate();
    const navigateToStartPage = useNavigate();


    useEffect(() => {
        const getDate = () => {
            let today = new Date().toLocaleDateString();
            setDateToday(today);
        };
        getDate();
    }, []);

    const handleLogOut = () => {
        setUserName('');
        setPassword('');
        logOut('/');
    }

    const goToStartPage = () => {
        navigateToStartPage('/educator');
    }



    const renderChildren = absentChildren.map((child) =>
        <button className="absent-children" id={child.id} key={child.id}>{child.personalInformation.firstName} {child.personalInformation.lastName}</button>);
    
     const renderReason = absences.map((absence) =>
         <label className="reason" key={absence.id}> {absence.reasonToAbsence}</label>);
    
    
 
    return (
        <div>
            <div className="header">
                <label id="date">{ dateToday}</label>
                <div>
                    <button onClick={goToStartPage} id="startSiteButton">Startsidan</button>
                    <button onClick={handleLogOut} className="logOutButton">Logga ut</button>
                </div>
            </div>
            <div id="educator-absence">
                <div className="sidebar">
                    <label className="groupName">{groupName}</label>
                    <button id="allChildrenButton">Alla barn</button>
                </div>
                <div id="absent-children">
                    {renderChildren}
                    {renderReason}
                </div>
            </div>
            <div className="footer">
            </div>
        </div>
    )
}
export default EducatorAbsence;