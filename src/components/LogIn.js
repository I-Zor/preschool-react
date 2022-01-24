import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import axios from 'axios';
import swal from 'sweetalert2';

const Login = ({ userName, setUserName, password, setPassword, educators, setEducators, educator, setEducator, caregiver, setCaregiver}) => {

  const navigateToEducator = useNavigate();
  const navigateToCaregiver = useNavigate();
  let ids = [];

  const logInUrl = 'http://localhost:8080/login/' + userName + '/' + password;
  const educatorsUrl = 'http://localhost:8080/educator';
  const getCaregiverUrl = 'http://localhost:8080/caregiver/';
  const getEducatorUrl = 'http://localhost:8080/educator/';


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
    }
    getAllEducators();
  }, [setEducators]);

  const findEducatorsId = () => {
    educators.forEach(element => {
      ids.push(element.id)
    });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    axios.get(logInUrl)
      .then((response) => {
        let id = response.data;
        findEducatorsId();
        let foundEducator = ids.find(element => element === id);
        if (foundEducator) {
          axios.get(getEducatorUrl + id)
            .then((response) => {
              let user = response.data;
              console.log(user);
              setEducator({
                id: user.id,
                personalInformation: user.personalInformation,
                contactInformation: user.contactInformation,
                security: user.security,
                preschoolGroup: user.preschoolGroup,
                isAdmin: user.isAdmin
              });
              
            })
            .catch((error) => {
              console.log(error);
            })
          navigateToEducator('/educator')
        }
        else {
          axios.get(getCaregiverUrl + id)
            .then((response) => {
              setCaregiver(response.data);
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            })
          //navigateToCaregiver('/caregiver')
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

  console.log(educator);


/*   const getEducator = () => {
    axios.get(getEducatorUrl + userId)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getCaregiver = () => {
    axios.get(getCaregiverUrl + userId)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
 */
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
