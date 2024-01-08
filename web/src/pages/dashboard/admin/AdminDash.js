import React, { useContext, useState } from 'react';
import { DarkModeContext } from '../../../context/DarkModeContext';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from "react-redux";

import Greeting from "../../../components/dashboard/admin/greeting";
import TopBar from "../../../components/dashboard/admin/topBar";
import NewNotice from "../../../components/dashboard/admin/newNotice";
import MainBody from "../../../components/dashboard/admin/mainBody";
import Student from "../../../components/dashboard/admin/department/students";
import Profile from "../../../components/dashboard/admin/Profile";
import NoticeBoard from "../../../components/dashboard/admin/NoticeBoard";
import FeePortal from "../../../components/dashboard/admin/FeePortal";
import AddDepartment from '../../../components/dashboard/admin/rns/addDepartment';
import ViewStudent from '../../../components/dashboard/admin/department/ViewStudent';
import SideBar from '../../../components/dashboard/sideBar';
import { rns, department, dui } from '../../../constants/sideBar';

import StudentRnS from '../../../components/dashboard/admin/rns/studentsRnS';
import ViewStudentRnS from '../../../components/dashboard/admin/rns/ViewStudentRnS';
import StudentDui from '../../../components/dashboard/admin/dui/studentsDui';
import ViewStudentDui from '../../../components/dashboard/admin/dui/ViewStudentDui';

const Home = ({ onAddNew }) => {
  return (
    <>
      <Greeting />
      <MainBody onAddNew={onAddNew} />
    </>
  );
};

function AdminDash() {
  const { darkMode } = useContext(DarkModeContext);
  const [showNewNotice, setShowNewNotice] = useState(false);
  const {user} = useSelector(state => state.user);
  if(user)  {
    console.log("asfgjbfe", user);
  }
  const toggleNewNotice = () => {
    setShowNewNotice(!showNewNotice);
  };

  return (
    <div className={`flex font-["IBM_Plex_Sans"] h-screen ${darkMode ? "bg-gray-900" : "bg-[#F8F9FF]"}`}>
      {(user && user.role === "department") && <SideBar data={department} />}
      {(user && user.role === "admin" && user.user === "rns") && <SideBar data={rns} />}
      {(user && user.role === "admin" && user.user === "dui") && <SideBar data={dui} />}

      <div className="flex-1 flex flex-col">
        <TopBar />

        <NewNotice show={showNewNotice} onClose={toggleNewNotice} />

        <div className="flex-1 overflow-y-scroll p-4">
          <Routes>
            <Route path="/" element={<Home onAddNew={toggleNewNotice} />} />
            <Route path="/students" element={<Student />} />
            <Route path="/studentsRnS" element={<StudentRnS />} />
            <Route path="/viewStudentRnS" element={<ViewStudentRnS />} />
            <Route path="/viewStudent" element={<ViewStudent/>} />
            <Route path="/studentsDui" element={<StudentDui />} />
            <Route path="/viewStudentDui" element={<ViewStudentDui />} />
            <Route path="/AddDepartment" element={<AddDepartment />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/NoticeBoard" element={<NoticeBoard />} />
            <Route path="/FeePortal" element={<FeePortal />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
