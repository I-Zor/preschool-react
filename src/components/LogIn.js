import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import axios from 'axios';
import swal from 'sweetalert2';

const Login = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [educators, setEducators] = useState([]);

  const navigateToEducator = useNavigate();
  const navigateToCaregiver = useNavigate();
  let ids = [];

  const logInUrl = 'http://localhost:8080/login/' + userName + '/' + password;
  const educatorsUrl = 'http://localhost:8080/educator'

  const updateUserName = e => {
    setUserName(e.target.value);
  }

  const updatePassword = e => {
    setPassword(e.target.value);
  }

  useEffect(() => {
    getAllEducators();
  }, []);

  const findEducatorsId = () => {
    educators.forEach(element => {
      ids.push(element.id)
    });
  }


  const handleLogin = () => {
    axios.get(logInUrl)
      .then((response) => {
        let userId = response.data;
        findEducatorsId();
        let foundEducator = ids.find(id => id === userId);
        if (foundEducator) {
          navigateToEducator('/educator', { replace: true })
        }
        else {
          navigateToCaregiver('/caregiver', { replace: true })
        }
        ids = [];
      })
      .catch((error) => {
        swal.fire({
          icon: 'error',
          title: 'Något gick fel',
          text: 'Vänligen försök att logga in igen.'
        });
        setUserName('');
        setPassword('');
      });
  };

  const getAllEducators = () => {
    axios.get(educatorsUrl)
      .then((response) => {
        let educators = response.data;
        setEducators(educators);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div>
      <h1 id="welcome">Välkommen till Förskolan!</h1>
      <form action="" id="logInForm">
        <label id="username">Användarnamn
          <input value={userName} onChange={updateUserName} type="text" />
        </label>
        <label id="password">Lösenord
          <input value={password} onChange={updatePassword} type="text" />
        </label>
      </form>
      <button onClick={handleLogin} id="logInButton">Logga in</button>
    </div>
  );
}

export default Login;
