import React, { useState, useEffect } from "react";
import Login from './sites/logIn';
import EducatorHomepage from './sites/educator-homepage';
import EducatorChildren from './sites/educator-children';
import EducatorAbsence from './sites/educator-absence';
import EducatorChildInfo from './sites/educator-childInfo';
import CaregiverHomepage from './sites/caregiver-homepage';
import CaregiverChildPage from './sites/caregiver-childPage';
import { Routes, Route, BrowserRouter } from "react-router-dom";


function App() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [absences, setAbsences] = useState([]);
  const [absentChildren, setAbsentChildren] = useState([]);
  const [allChildren, setAllChildren] = useState([]);
  const [dateToday, setDateToday] = useState('');
  const [groupName, setGroupName] = useState('');
  const [user, setUser] = useState('');

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
          />} />
          <Route path='/educator' element={<EducatorHomepage
            dateToday={dateToday}
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
            dateToday={dateToday}
            user={user}
            setUser={setUser} />} />
          <Route path='/educator/absence' element={<EducatorAbsence
            absentChildren={absentChildren}
            absences={absences}
            setUserName={setUserName}
            setPassword={setPassword}
            dateToday={dateToday}
            groupName={groupName}
            user={user}
            setUser={setUser} />} />
          <Route path='/educator/child' element={<EducatorChildInfo
            dateToday={dateToday}
            groupName={groupName}
            setUserName={setUserName}
            setPassword={setPassword}
            user={user}
            setUser={setUser} />} />
          <Route path='/caregiver' element={<CaregiverHomepage
            dateToday={dateToday}
            setUserName={setUserName}
            setPassword={setPassword}
          />} />
          <Route path='/caregiver/child' element={<CaregiverChildPage
            dateToday={dateToday}
            setUserName={setUserName}
            setPassword={setPassword}
            setUser={setUser}
            user={user} />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
