import React, { useContext, useState } from 'react';
import { DarkModeContext } from '../../../context/DarkModeContext';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import Greeting from "../../../components/dashboard/admin/greeting";
import SideBar from "../../../components/dashboard/admin/sideBar";
import TopBar from "../../../components/dashboard/admin/topBar";
import NewNotice from "../../../components/dashboard/admin/newNotice";
import MainBody from "../../../components/dashboard/admin/mainBody";
import Student from "../../../components/dashboard/admin/students";
import Profile from "../../../components/dashboard/admin/Profile";
import Approved from "../../../components/dashboard/admin/approved";
import NoticeBoard from "../../../components/dashboard/admin/NoticeBoard";
import FeePortal from "../../../components/dashboard/admin/FeePortal";
import SideBarSuperAdmin from '../../../components/dashboard/admin/sideBarSuperAdmin';
import AddDepartment from '../../../components/dashboard/admin/addDepartment';
import ViewStudent from '../../../components/dashboard/admin/ViewStudent';

import { useAppContext } from '../../../context/context';

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
  const { state, isUserAuthenticated } = useAppContext();
  const {user} = useSelector(state => state.user);
  //console.log("HELLO", state);
  console.log("isauthenticated?", isUserAuthenticated());
  console.log("user", user);

  const toggleNewNotice = () => {
    setShowNewNotice(!showNewNotice);
  };

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={`flex font-["IBM_Plex_Sans"] h-screen ${darkMode ? "bg-gray-900" : "bg-[#F8F9FF]"}`}>
      {(user && user.role === "admin") && <SideBar currentPath={currentPath} />}
      {(user && user.role === "superadmin") && <SideBarSuperAdmin currentPath={currentPath} />}

    {/* <SideBarSuperAdmin currentPath={currentPath} /> */}
      <div className="flex-1 flex flex-col">
        <TopBar />

        <NewNotice show={showNewNotice} onClose={toggleNewNotice} />

        <div className="flex-1 overflow-y-scroll p-4">
          <Routes>
            <Route path="/" element={<Home onAddNew={toggleNewNotice} />} />
            <Route path="/students" element={<Student />} />
            <Route path="/viewStudent" element={<ViewStudent/>} />
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
