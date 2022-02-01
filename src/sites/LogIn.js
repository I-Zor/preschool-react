import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert2';
import '../styling/App.css';
import '../styling/LogIn.css';

const Login = ({ userName, setUserName, password, setPassword }) => {

  const navigateToEducator = useNavigate();
  const navigateToCaregiver = useNavigate();

  const [educators, setEducators] = useState([]);
  let educatorsIds = [];

  const logInUrl = 'http://localhost:8080/login/' + userName + '/' + password;
  const educatorsUrl = 'http://localhost:8080/educator';

  const updateUserName = e => {
    e.preventDefault();
    setUserName(e.target.value);
  }

  const updatePassword = e => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  useEffect(() => {
    const getAllEducators = () => {
      axios.get(educatorsUrl)
        .then((response) => {
          let educators = response.data;
          setEducators(educators);
        })
        .catch((error) => {
          console.log(error);
        })
    };
    getAllEducators();
  }, []);

  const findEducatorsId = () => {
    educators.forEach(element => {
      educatorsIds.push(element.id)
    });
  };

  const handleLogin = () => {
    findEducatorsId();
    axios.get(logInUrl)
      .then((response) => {
        let id = response.data;
        let foundEducator = educatorsIds.find(element => element === id);
        localStorage.setItem("userId", id);
        if (foundEducator) {
          navigateToEducator('/educator');
        }
        else {
          navigateToCaregiver('/caregiver');
        }
      })
      .catch((error) => {
        swal.fire({
          icon: 'error',
          title: 'Användarnamn eller lösenord är fel',
          text: 'Vänligen försök att logga in igen'
        });
        setUserName('');
        setPassword('');
      });
  }

  return (
    <div className="page">
      <h1 id="welcome">Välkommen till Förskolan Hogwarts</h1>
      <form action="" id="login-form">
        <label id="username">Användarnamn
          <input className="input" value={userName} onChange={updateUserName} type="text" />
        </label>
        <label id="password">Lösenord
          <input className="input" value={password} onChange={updatePassword} type="text" />
        </label>
      </form>
      <button onClick={handleLogin} id="logIn-button">Logga in</button>
    </div>
  );
}

export default Login;
