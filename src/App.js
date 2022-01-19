import React, {useState, useEffect} from "react";
import Login from "./components/LogIn";
import EducatorHomepage from "./components/Educator-homepage";
import EducatorChildren from "./components/Educator-children";
import EducatorAbsence from "./components/Educator-absence";
import EducatorChildInfo from "./components/Educator-childInfo";
import CaregiverHomepage from "./components/Caregiver-homepage";
import CaregiverChildPage from "./components/Caregiver-childPage";


import ChildList from "./ChildList";
import ChildInfo from "./ChildInfo";
import WelcomeCaregiver from "./Welcome-caregiver";
import ChildInfoCaregiver from "./ChildInfoCaregiver";
import AbsenceForm from "./components/AbsenceForm";
import CaringTimeForm from "./components/CaringTimeForm";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <div >
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/educator' element={<EducatorHomepage />} />
          <Route path='/educator/children/' element={<EducatorChildren />} />
          <Route path='/educator/absence' element={<EducatorAbsence />} />
          <Route path='/educator/child' element={<EducatorChildInfo />} />
          <Route path='/caregiver' element={<CaregiverHomepage />} />
          <Route path='/caregiver/child' element={<CaregiverChildPage />} />





          <Route path='/child-list' element={<ChildList />} />
          <Route path='/child-info' element={<ChildInfo />} />
          <Route path='/welcome-caregiver' element={<WelcomeCaregiver />} />
          <Route path='/caregiver-info' element={<ChildInfoCaregiver />} />
          <Route path='/absence' element={<AbsenceForm />} />
          <Route path='/caring-time' element={<CaringTimeForm />} />
        </Routes>
   </div>
    </BrowserRouter>
    
  );
}

export default App;
