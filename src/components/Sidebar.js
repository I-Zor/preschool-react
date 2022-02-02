import React from "react";
import { useNavigate } from "react-router-dom";
import '../styling/App.css';

const Sidebar = ({ groupName }) => {

    const navigateToAllChildren = useNavigate();

    function goToAllChildren() {
        navigateToAllChildren('/educator/children');
    }
    return (
        <div className="sidebar">
            <label className="child-name">{groupName}</label>
            <button
                onClick={goToAllChildren}
                className="all-children-button">
                Alla barn
            </button>
        </div>
    );
}

export default Sidebar;