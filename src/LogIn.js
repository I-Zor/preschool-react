import React from "react";
import './App.css';

function Login() {

  return (
    <div>
      <h1 id="welcome">Välkommen till Förskolan!</h1>
      <form action="" id="logInForm">
        <label htmlFor="" id="username">Användarnamn
        <input type="text" />
        </label>
        <label htmlFor="" id="password">Lösenord
          <input type="text" />
        </label>
      </form>
      <button id="logInButton">Logga in</button>
   </div>
  );
}

export default Login;
