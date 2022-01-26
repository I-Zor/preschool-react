import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import axios from 'axios';
import swal from 'sweetalert2';

const Login = ({ userName, setUserName, password, setPassword, userId, setUserId }) => {

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
    //  e.preventDefault();
    axios.get(logInUrl)
      .then((response) => {
        let id = response.data;
        let foundEducator = educatorsIds.find(element => element === id);
        setUserId(id);
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
          title: 'Något gick fel',
          text: 'Vänligen försök att logga in igen.'
        });
        setUserName('');
        setPassword('');
      });
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
