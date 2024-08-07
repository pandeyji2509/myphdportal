import React from "react";
import { DarkModeProvider } from '../../../context/DarkModeContext';
import StudentDash from "./StudentDash";

function StudentDashboard() {
  return (
    <DarkModeProvider>
        <StudentDash />
    </DarkModeProvider>        
  );
}

export default StudentDashboard;
