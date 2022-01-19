import React from "react";
import Login from "./components/LogIn";
import EducatorHomepage from "./components/Educator-homepage";
import EducatorChildren from "./components/Educator-children";
import EducatorAbsence from "./components/Educator-absence";
import EducatorChildInfo from "./components/Educator-childInfo";
import CaregiverHomepage from "./components/Caregiver-homepage";
import CaregiverChildPage from "./components/Caregiver-childPage";

import { Routes, Route, BrowserRouter } from "react-router-dom";


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
        </Routes>
   </div>
    </BrowserRouter>
    
  );
}

export default App;
