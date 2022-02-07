import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderToStartPage from "../components/Header-startPage";
import Sidebar from "../components/Sidebar";
import '../styling/App.css';
import '../styling/Educator-absence.css';

const EducatorAbsence = ({ dateToday, setUserName, setPassword, user, setUser }) => {

    const navigateToChildPage = useNavigate();

    useEffect(() => {
        setUser('educator');
    }, [setUser]);

    let absentChildren = JSON.parse(localStorage.getItem("absentChildren"));
    let absences = JSON.parse(localStorage.getItem("absences"));
    let groupName = localStorage.getItem("groupName");

    const renderChildren = absentChildren.map((child) =>
        <button
            onClick={showChildInfo}
            className="absent-children"
            id={child.id}
            key={child.id}>
            {child.personalInformation.firstName} {child.personalInformation.lastName}
        </button>);


    const renderReason = absences.map((absence) =>
        <label
            className="reason"
            key={absence.id}>
            {absence.reasonToAbsence}
        </label>);

    function showChildInfo(e) {
        localStorage.setItem("childId", e.target.id);
        navigateToChildPage('/educator/child');
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
                <Sidebar
                groupName={groupName}>
                </Sidebar>
                <div className="info-container">
                    <div id="absent-list">
                        <div className="render-container">
                            {renderChildren}
                        </div>
                        <div id="render-reason">
                            {renderReason}
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
export default EducatorAbsence;