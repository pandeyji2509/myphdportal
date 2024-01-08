import React, { useState, useEffect } from "react";
import "jspdf-autotable";

import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setStudent } from "../../../../redux/features/selectedStudentSlice";

// import {message} from 'antd';
// import { useAppContext } from '../../../../context/context'
// import EmailPopup from "../EmailPopup";

const StudentDui = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user);
  var departmentName;
  // const [selectAll, setSelectAll] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);
  // const [showPopup, setShowPopup] = useState(false); // Added state for popup visibility
  // const [data, setData] = useState([]);

  if(user){
    departmentName = user.departmentName;
  }

  const [students, setStudents] = useState([]);
  // const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  // const handleSelectAll = () => {
  //   if (!selectAll) {
  //     setSelectedStudentIds(students.map((student) => student._id));
  //   } else {
  //     setSelectedStudentIds([]);
  //   }
  //   setSelectAll(!selectAll);
  // };

  // const handleCheckboxClick = (studentId) => {
  //   setSelectedStudentIds((prevSelected) => {
  //     if (prevSelected.includes(studentId)) {
  //       return prevSelected.filter((_id) => _id !== studentId);
  //     } else {
  //       return [...prevSelected, studentId];
  //     }
  //   });
  //   setSelectAll(false); 
  // };

  const onViewStudent = (student) => {
    dispatch(setStudent(student));
    navigate('/admin/viewStudentDui');
  };

  const getAllStudents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/student/getAllStudents`);
      console.log(response.data.stu);
      setStudents(response.data.stu);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    getAllStudents(); // Fetch students when the component mounts or when the department changes
  }, []);

  return (
    <>
        <div className="flex mb-4 relative font-semibold text-lg w-3/5 items-center">
            {departmentName}
        </div>

      
        <div className="flex items-center shadow-md bg-blue-800 text-white font-semibold rounded-lg p-3 text-sm">
            <div className="w-[4%]">S.No</div>
            <div className="w-[10%]">Name</div>
            <div className="w-[35%]">Department</div>
            <div className="w-[6%]">Gender</div>
            <div className="w-[8%]">Mobile</div>
            <div className="w-[20%] pl-4">Email</div>
            <div className="w-[17%] text-center">Action</div>
            
        </div>

        {students.filter(student => student.duiApproved === false && student.depApproved === true).map((student, index) => (
            <div className={`my-2 flex bg-white shadow-sm items-center rounded-lg py-2 px-3 text-sm`}>
                <div className="w-[4%]" key={index+1}>{index+1}</div>
                <div className="w-[10%]">{student.firstName + " " + student.lastName} </div>
                <div className="w-[37%]">{student.department}</div>
                <div className="w-[6%]">{student.gender}</div>
                <div className="w-[8%]">{student.mobile}</div>
                <div className="w-[20%] pl-4">{student.email}</div>
                <div className="w-[17%] flex items-center justify-center">
                    <div className="flex justify-center">
                        <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm py-1 px-3 justify-center rounded-2xl"
                        onClick={() => onViewStudent(student)}>
                        <span className="self-center">View</span>
                        </button>
                    </div>
                </div>
            </div>
        ))}

    </>
  );
};

export default StudentDui;
