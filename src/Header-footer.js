import React from "react";
import './App.css';

const Footer = () => (
    <div id="footer">
    </div>
);


function Header() {
    return (
        <div id="header">
            <label htmlFor="" id="date">Datum</label>
            <button id="startSiteButton">Startsidan</button>
            <button id="logOutButton">Logga ut</button>
            <Footer />
       </div>
      );
}

export default Header;