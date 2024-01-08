import React, { useContext, useState } from 'react';
import { DarkModeContext } from '../../../context/DarkModeContext';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import Greeting from "../../../components/dashboard/student/greeting";
import SideBar from "../../../components/dashboard/sideBar";
import TopBar from "../../../components/dashboard/student/topBar";
import MainBody from "../../../components/dashboard/student/mainBody";
import Profile from "../../../components/dashboard/student/Profile";
import NoticeBoard from "../../../components/dashboard/student/NoticeBoard";
import FeePortal from "../../../components/dashboard/student/FeePortal";
import { student } from '../../../constants/sideBar';

import { useAppContext } from '../../../context/context';

const Home = ({ onAddNew }) => {
  return (
    <>
      <Greeting />
      <MainBody onAddNew={onAddNew} />
    </>
  );
};

function StudentDash() {
  const { darkMode } = useContext(DarkModeContext);
  const [showNewNotice, setShowNewNotice] = useState(false);

  const toggleNewNotice = () => {
    setShowNewNotice(!showNewNotice);
  };

  return (
    <div className={`flex font-["IBM_Plex_Sans"] h-screen ${darkMode ? "bg-gray-900" : "bg-[#F8F9FF]"}`}>
      <SideBar data={student} />

    {/* <SideBarSuperAdmin currentPath={currentPath} /> */}
      <div className="flex-1 flex flex-col">
        <TopBar />

        <div className="flex-1 overflow-y-scroll p-4">
          <Routes>
            <Route path="/" element={<Home onAddNew={toggleNewNotice} />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/NoticeBoard" element={<NoticeBoard />} />
            <Route path="/FeePortal" element={<FeePortal />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default StudentDash;
