import React from "react";
import Login from "./LogIn";
import Header from "./Header-footer";
import SidebarEducator from "./Sidebar-educator";
import WelcomeEducator from "./Welcome-educator";
import ChildList from "./ChildList";
import ChildInfo from "./ChildInfo";
import WelcomeCaregiver from "./Welcome-caregiver";
import ChildInfoCaregiver from "./ChildInfoCaregiver";
import AbsenceForm from "./AbsenceForm";
import CaringTimeForm from "./CaringTimeForm";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";


function App() {

  return (


    <BrowserRouter>
      <div >
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/header' element={<Header />} />
          <Route path='/sidebar-educator' element={<SidebarEducator />} />
          <Route path='/welcome-educator' element={<WelcomeEducator />} />
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
