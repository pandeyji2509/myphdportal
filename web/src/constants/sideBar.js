import { FaHome, FaMoneyBillWave, FaEnvelope, FaFileAlt, FaUserAlt } from "react-icons/fa";

export const rns = [
    {
        text: "Home",
        icon: <FaHome />,
        path: "/admin",
    },
    {
        text: "Registrations",
        icon: <FaUserAlt />,
        path: "/admin/studentsRnS",
    },
    {
        text: "Add Department",
        icon: <FaFileAlt />,
        path: "/admin/AddDepartment",
    },
    {
        text: "Fee Portal",
        icon: <FaMoneyBillWave />,
        path: "/admin/FeePortal",
    },
    {
        text: "Notice Board",
        icon: <FaEnvelope />,
        path: "/admin/NoticeBoard",
    },
    {
        text: "Profile",
        icon: <FaFileAlt />,
        path: "/admin/Profile",
    },
];

export const dui = [
  {
      text: "Home",
      icon: <FaHome />,
      path: "/admin",
  },
  {
      text: "Registrations",
      icon: <FaUserAlt />,
      path: "/admin/studentsDui",
  },
  {
      text: "Profile",
      icon: <FaFileAlt />,
      path: "/admin/Profile",
  },
];

export const department = [
    {
      text: "Home",
      icon: <FaHome className="mr-4" />,
      path: "/admin",
    },
    {
      text: "Registrations",
      icon: <FaUserAlt className="mr-4" />,
      path: "/admin/students",
    },
    {
      text: "Fee Portal",
      icon: <FaMoneyBillWave className="mr-4" />,
      path: "/admin/FeePortal",
    },
    {
      text: "Notice Board",
      icon: <FaEnvelope className="mr-4" />,
      path: "/admin/NoticeBoard",
    },
    {
      text: "Profile",
      icon: <FaFileAlt className="mr-4" />,
      path: "/admin/Profile",
    },
];

export const student = [
  {
    text: "Home",
    icon: <FaHome />,
    path: "/student",
  },
  {
    text: "Fee Portal",
    icon: <FaMoneyBillWave />,
    path: "/student/FeePortal",
  },
  {
    text: "Notice Board",
    icon: <FaEnvelope />,
    path: "/student/NoticeBoard",
  },
  {
    text: "Profile",
    icon: <FaFileAlt />,
    path: "/student/Profile",
  },
];