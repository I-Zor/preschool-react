import React, { useState, useEffect } from "react";
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
  const [educator, setEducator] = useState({});
  const [absences, setAbsences] = useState([]);
  const [presentChildren, setPresentChildren] = useState([]);
  const [absentChildren, setAbsentChildren] = useState([]);
  const [allChildren, setAllChildren] = useState([]);
  const [userId, setUserId] = useState('');
  const [dateToday, setDateToday] = useState('');
  const [groupName, setGroupName] = useState('');
  const [child, setChild] = useState('');

  useEffect(() => {
    function getDate() {
      let today = new Date().toLocaleDateString();
      setDateToday(today);
    };
    getDate();
  }, []);

  return (
    <BrowserRouter>
      <div >
        <Routes>
          <Route path='/' element={<Login
            userName={userName}
            setUserName={setUserName}
            password={password}
            setPassword={setPassword}
            userId={userId}
            setUserId={setUserId}
          />} />
          <Route path='/educator' element={<EducatorHomepage
            userId={userId}
            dateToday={dateToday}
            educator={educator}
            setEducator={setEducator}
            presentChildren={presentChildren}
            absentChildren={absentChildren}
            setAllChildren={setAllChildren}
            setAbsentChildren={setAbsentChildren}
            setAbsences={setAbsences}
            setUserName={setUserName}
            setPassword={setPassword}
            groupName={groupName}
            setGroupName={setGroupName} />} />
          <Route path='/educator/children' element={<EducatorChildren
            allChildren={allChildren}
            setUserName={setUserName}
            setPassword={setPassword}
            groupName={groupName}
            dateToday={dateToday} />} />
          <Route path='/educator/absence' element={<EducatorAbsence
            absentChildren={absentChildren}
            absences={absences}
            setUserName={setUserName}
            setPassword={setPassword}
            dateToday={dateToday}
            groupName={groupName} />} />
          <Route path='/educator/child' element={<EducatorChildInfo
            dateToday={dateToday}
            groupName={groupName}
            setUserName={setUserName}
            setPassword={setPassword} />} />
          <Route path='/caregiver' element={<CaregiverHomepage
            userId={userId}
            dateToday={dateToday}
            setUserName={setUserName}
            setPassword={setPassword}
             />} />
          <Route path='/caregiver/child' element={<CaregiverChildPage
            dateToday={dateToday}
            setUserName={setUserName}
            setPassword={setPassword} />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
