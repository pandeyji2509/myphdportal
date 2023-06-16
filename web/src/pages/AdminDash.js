import React, { useContext, useState } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import { Route, Routes, useLocation } from 'react-router-dom';

import Greeting from "../components/dashboard/greeting";
import SideBar from "../components/dashboard/admin/sideBar";
import TopBar from "../components/dashboard/admin/topBar";
import NewNotice from "../components/dashboard/admin/newNotice";
import MainBody from "../components/dashboard/admin/mainBody";
import Student from "../components/dashboard/admin/students";
import Profile from "../components/dashboard/admin/Profile";
import Approved from "../components/dashboard/admin/approved";
import NoticeBoard from "../components/dashboard/admin/NoticeBoard";
import FeePortal from "../components/dashboard/admin/FeePortal";

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

  const toggleNewNotice = () => {
    setShowNewNotice(!showNewNotice);
  };

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-[#F8F9FF]"}`}>
      <SideBar currentPath={currentPath} />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <NewNotice show={showNewNotice} onClose={toggleNewNotice} />

        <div className="flex-1 overflow-y-scroll p-4">
          <Routes>
            <Route path="/" element={<Home onAddNew={toggleNewNotice} />} />
            <Route path="/students" element={<Student />} />
            <Route path="/approved" element={<Approved />} />
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
