import React, {useState} from "react";
import './App.css';

const Login = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
  }

  return (
    <div>
      <h1 id="welcome">Välkommen till Förskolan!</h1>
      <form action="" id="logInForm">
        <label id="username">Användarnamn
          <input type="text" />
        </label>
        <label id="password">Lösenord
          <input type="text" />
        </label>
      </form>
      <button id="logInButton">Logga in</button>
    </div>
  );
}

export default Login;
