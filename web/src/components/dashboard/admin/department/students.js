import React, { useState, useEffect } from "react";
import {  FaFilePdf } from "react-icons/fa";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

//import { useAppContext } from '../../../../context/context'
import axios from 'axios';
import EmailPopup from "../EmailPopup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setStudent } from "../../../../redux/features/selectedStudentSlice";
import {RiMailSendFill} from 'react-icons/ri';
import {AiOutlineDownload, AiFillCheckCircle} from 'react-icons/ai';
import {message} from 'antd';
import { personal, master, academic, other } from "../../../../constants/pdfData";
import { MdError } from "react-icons/md";

const Student = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user);
  var departmentName;
  const [selectAll, setSelectAll] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Added state for popup visibility
  // const [data, setData] = useState([]);
  // const [selectedItems, setSelectedItems] = useState([]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");

  if(user){
    departmentName = user.depName;
  }

  const [students, setStudents] = useState([]);

  // Define a state to keep track of selected student IDs
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  // Function to handle "Select All" checkbox click
  const handleSelectAll = () => {
    if (!selectAll) {
      // If "Select All" is not checked, select all students
      setSelectedStudentIds(students.map((student) => student._id)); // Use the appropriate ID field from your student data
    } else {
      // If "Select All" is checked, unselect all students
      setSelectedStudentIds([]);
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxClick = (studentId) => {
    setSelectedStudentIds((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((_id) => _id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
    setSelectAll(false); // Unselect "Select All" when individual checkboxes are clicked
  };

  const onViewStudent = (student) => {
    console.log(student);
    // Dispatch an action to set the selected student in Redux store
    dispatch(setStudent(student));

    // Redirect to the "ViewStudent" page
   navigate('/admin/viewStudent');
  };

  const getStudentsByDepartment = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/student/getStudentByDep`, {
        params: { department: departmentName },
      });
      console.log(response);
      console.log(response.data.stu);
      setStudents(response.data.stu);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    getStudentsByDepartment(); // Fetch students when the component mounts or when the department changes
  }, [departmentName]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleVenueChange = (e) => {
    setVenue(e.target.value);
  };

  console.log(students);
  const sendEmailToStudents = async() => {
    const interactionDate = new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
    const interactionTime = new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });

    console.log(selectedStudentIds, interactionDate, interactionTime, venue);
    setShowPopup(false);
    try {
        message.success("Emails sent successfully");
        const res = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/admin/sendMeetInvite`,
        { data  : selectedStudentIds,
          time  : interactionTime,
          venue : venue,
          date  : interactionDate },
        );

        console.log(res);

        if(res.data.error){
          message.error("Couldn't send Email");
          return;
        }
      } catch (error) {
        console.log(error)
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const generatePDF = () => {
  const doc = new jsPDF();

  const filteredData = students.filter((item) =>
    selectedStudentIds.includes(item._id)
  );

  // Iterate through each student and create a separate page for each student
  filteredData.forEach((student, index) => {
    if (index > 0) {
      doc.addPage();
    }

    // Custom function to render student details in PDF
    renderStudentDetailsToPDF(doc, student);
  });

  doc.save("Student_Data.pdf");
};

const renderStudentDetailsToPDF = (doc, student) => {
  // Set up styles for the table
  const tableStyles = {
    theme: "plain",
    styles: { fontSize: 10, textColor: [0, 0, 0], lineWidth: 0.1 },
    headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] },
    bodyStyles: { fillColor: [241, 241, 241] },
  };

  // Student details as an array of objects
  const studentDetails = [
    { name: "Academic Details", data : academic },
    { name: "Personal Details", data : personal},
    { name: "Master's Details", data : master },
    { name: "Other Details", data : other },
  ];

  // Add student's name as a header on the page
  doc.setFontSize(18);
  doc.text(105, 20, `${student.firstName + " " + student.lastName}`, { align: "center" });

  // Iterate through each student detail object and create a table for each
  let startY = 30;
  studentDetails.forEach((detailObj) => {
    // Create a table for the student details
    doc.autoTable({
      ...tableStyles,
      head: [[detailObj.name, ""]],
      body: detailObj.data.map((detail) => [detail.field, student[detail.value]]),
      startY,
    });

    // Increase the startY for the next table
    startY = doc.previousAutoTable.finalY + 10;
  });
};

  
  return (
    <>
      <div className="flex mb-4 relative">
        <div className="font-semibold text-lg w-3/5 items-center flex">{departmentName}</div>
        <div className="font-semibold text-lg justify-end flex w-2/5">
          <div className="flex cursor-pointer hover:bg-gray-200 items-center rounded-md bg-gray-300 py-1 px-2 text-sm w-fit" onClick={() => setShowPopup(true)}>
            Send Interaction Invite 
            <RiMailSendFill className="ml-2"/>
          </div>

          <div className="flex cursor-pointer hover:bg-gray-200 items-center rounded-md bg-gray-300 py-1 px-2 ml-8 text-sm w-fit relative" onClick={generatePDF}>
            <div className="pdf-icon absolute w-8 h-8 bg-red-600 rounded-full left-[-10%] flex items-center justify-center">
              <FaFilePdf className="text-lg text-white" />
            </div>
            <span className="ml-4 flex">Download PDF<AiOutlineDownload className="ml-2 text-lg"/></span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center shadow-md bg-blue-800 text-white font-semibold rounded-lg p-3 text-sm">
        <div className="w-1/12 flex items-center">
          <div className="ml-1 flex items-center justify-center rounded-full h-8 w-8 hover:bg-blue-500 transition-colors">
            <input
              type="checkbox"
              className="h-4 w-4 rounded-lg cursor-pointer"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </div>
          <div className="ml-3">S.No</div>
        </div>

        <div className="ml-4 w-2/12">Name</div>
        <div className="w-2/12">Subject</div>
        <div className="w-1/12">Gender</div>
        <div className="w-1/12">Mobile</div>
        <div className="w-3/12 pl-4">Email</div>
        <div className="w-1/12">Score</div>
        <div className="w-2/12 flex justify-center">
          <div className="w-4/5 text-center">Action</div>
          <div className="w-1/5"></div>
        </div>
        {/* <div className="w-2/12 flex items-center justify-center">
          <button  
           
            onClick={() => setShowPopup(true)}
            className="email rounded-full bg-blue-500 text-white p-2 flex items-center justify-center cursor-pointer hover:bg-blue-600"
          >
            <FaEnvelope className="text-lg" />
          </button>
          <button  
            onClick={generatePDF}
            className="rounded-full bg-red-700 text-white p-2 flex items-center justify-center cursor-pointer ml-2 hover:bg-red-800"
          >
            <FaFilePdf className="text-lg" />
          </button>
          <button  
            onClick={ApproveUser}
            className="mx-2 rounded-3xl p-2 bg-green-500 text-white flex items-center justify-center cursor-pointer hover:bg-green-600"
          >
            <div>Approve</div>
            <FaCheck className="ml-2 text-lg" />
          </button>
        </div> */}
      </div>

      {students.sort((a, b) => b.overallMarks - a.overallMarks).map((student, index) => (
        <div className={`my-2 flex ${(student && student.depApproved) ? "bg-blue-100" : "bg-white"} shadow-sm items-center rounded-lg py-2 px-3 text-sm`}>
          <div className="w-1/12 flex items-center" key={index+1}>
            <div className={`ml-1 flex items-center justify-center rounded-full h-8 w-8  ${(student && student.depApproved) ? "hover:bg-blue-300" : "hover:bg-gray-200"} transition-colors`}>
              <input
                type="checkbox"
                className="h-4 w-4 rounded-lg cursor-pointer"
                checked={selectedStudentIds.includes(student._id)} // Use the appropriate ID field from your student data
                onChange={() => handleCheckboxClick(student._id)} // Use the appropriate ID field from your student data
              />
            </div>
            <div className="ml-6">{index+1}</div>
          </div>

          <div className="ml-4 w-2/12">{student.firstName + " " + student.lastName} </div>
          <div className="w-2/12">{student.subject}</div>
          <div className="w-1/12">{student.gender}</div>
          <div className="w-1/12">{student.mobile}</div>
          <div className="w-3/12 pl-4">{student.email}</div>
          <div className="w-1/12">{student.overallMarks.toFixed(2)}</div>
          <div className="w-2/12 flex items-center justify-center">
              <div className="w-4/5 flex justify-center">
                <button className="flex items-center bg-[#4CAF50] hover:bg-[#3f9141] text-white font-semibold text-sm py-1 px-3 justify-center rounded-2xl"
                onClick={() => onViewStudent(student)}>
                  <span className="self-center">View / Approve</span>
                </button>
              </div>
              <div className="w-1/5 flex justify-center">
                {student && student.depApproved &&
                <AiFillCheckCircle className="text-2xl text-green-500"/>}
                {student && student.flag &&
                <MdError className="text-2xl text-red-500"/>}
              </div>
          </div>
        </div>
      ))}

      {showPopup && 
        ( <EmailPopup 
            closePopup={closePopup} 
            sendEmailToStudents={sendEmailToStudents} 
            handleDateChange={handleDateChange}
            handleTimeChange={handleTimeChange}
            handleVenueChange={handleVenueChange}/>)}

    </>
  );
};

export default Student;
