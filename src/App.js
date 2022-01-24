import React, { useState } from "react";
import Login from "./components/LogIn";
import EducatorHomepage from "./components/Educator-homepage";
import EducatorChildren from "./components/Educator-children";
import EducatorAbsence from "./components/Educator-absence";
import EducatorChildInfo from "./components/Educator-childInfo";
import CaregiverHomepage from "./components/Caregiver-homepage";
import CaregiverChildPage from "./components/Caregiver-childPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";


function App() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [educators, setEducators] = useState([]);
  const [educator, setEducator] = useState('');
  const [caregiver, setCaregiver] = useState('');
  const [absences, setAbsences] = useState([]);
  const [presentChildren, setPresentChildren] = useState([]);
  const [absentChildren, setAbsentChildren] = useState([]);

  return (
    <BrowserRouter>
      <div >
        <Routes>
          <Route path='/' element={<Login
            userName={userName}
            setUserName={setUserName}
            password={password}
            setPassword={setPassword}
            educators={educators}
            setEducators={setEducators}
            educator={educator}
            setEducator={setEducator}
            caregiver={caregiver}
            setCaregiver={setCaregiver} />} />
          <Route path='/educator' element={<EducatorHomepage
            educator={educator}
            setEducator={setEducator}
            presentChildren={presentChildren}
            setPresentChildren={setPresentChildren}
            absentChildren={absentChildren}
            setAbsentChildren={setAbsentChildren}
            setAbsences={setAbsences}
            setUserName={setUserName}
            setPassword={setPassword} />} />
          <Route path='/educator/children/' element={<EducatorChildren />} />
          <Route path='/educator/absence' element={<EducatorAbsence
            absentChildren={absentChildren}
            setAbsentChildren={setAbsentChildren}
            absences={absences}
            educator={educator}
            setUserName={setUserName}
            setPassword={setPassword}
          />} />
          <Route path='/educator/child' element={<EducatorChildInfo />} />
          <Route path='/caregiver' element={<CaregiverHomepage />} />
          <Route path='/caregiver/child' element={<CaregiverChildPage />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
