import React from "react";
import './App.css'

function WelcomeEducator() {
    return (
        <div id="welcome-screen">
            <h1 id="greeting-educator">Välkommen fröken!</h1>
            <h2 id="children-counter">Idag är närvarande 15 barn i din grupp.</h2>
            <button id="absent-children-button">Se frånvarande barn</button>
        </div>
    );
}

export default WelcomeEducator;