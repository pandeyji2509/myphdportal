import React from "react";
import { DarkModeProvider } from '../../../context/DarkModeContext';
import AdminDash from "./AdminDash";

function AdminDashboard() {
  return (
    <DarkModeProvider>
        <AdminDash />
    </DarkModeProvider>        
  );
}

export default AdminDashboard;
