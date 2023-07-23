import React, { useState, useEffect } from "react";
import { FaEye, FaEnvelope, FaFilePdf, FaCheck } from "react-icons/fa";
import { jsPDF } from "jspdf";
import { useAppContext } from '../../../context/context'
import axios from 'axios';
import EmailPopup from "./EmailPopup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setStudent } from "../../../redux/features/selectedStudentSlice";
import {RiMailSendFill} from 'react-icons/ri';
import {AiOutlineDownload, AiFillCheckCircle} from 'react-icons/ai';

const Student = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user);
  var departmentName;
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // Added state for popup visibility
  const { approvedUsers, setApprovedUsers } = useAppContext([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [data, setData] = useState([]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");

  if(user){
    departmentName = user.departmentName;
  }

  const [students, setStudents] = useState([]);

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
      setStudents(response.data.students);
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('');//Api should be there
    setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log(students);
  const sendEmailToStudents = () => {
      
    data.forEach((student) => {
      const emailData = {
        recipient: student.Email,
        subject: "Mail from Admin",
        message: `
          Date: ${date}
          Time: ${time}
          Venue: ${venue}
        `
      };

      axios
        .post("/send-email", emailData) //And for Sending email write api here
        .then((response) => {
          console.log("Email sent successfully");
          // Handle success, if needed
        })
        .catch((error) => {
          console.log("Failed to send email:", error);
          // Handle error, if needed
        });
    });

    // Close the popup after sending the email
    setShowPopup(false);
  };

  

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems((prevItems) => data.map((item) => item.S_No));
    } else {
      setSelectedItems([]);
    }
    
  };
  const toggleSelectItem = (itemId) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(itemId)) {
        return prevItems.filter((item) => item !== itemId);
      } else {
        return [...prevItems, itemId];
      }
    });
  };

  useEffect(() => {
    console.log(selectedItems);
    console.log("Hello");
  }, [selectedItems]);

  const isItemSelected = (itemId) => {
    return selectedItems.includes(itemId);
  };


  const closePopup = () => {
    setShowPopup(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const filteredData = data.filter((item) =>
      selectedItems.includes(item.S_No)
    );
    
    
    
    filteredData.forEach((item, index) => {
      doc.text(10, 10, `Item ${item.S_No}`);
      doc.text(10, 20, `Name: ${item.name}`);
      doc.text(10, 30, `Department: ${item.department}`);
      doc.text(10, 40, `Gender: ${item.gender}`);
      doc.text(10, 50, `Contact: ${item.contact}`);
      doc.text(10, 60, `Email: ${item.Email}`);

      if (index !== filteredData.length - 1) {
        doc.addPage();
      }
    });

    doc.save("Student_Data.pdf");
  };

  const ApproveUser = () => {
     
    const filteredData = data.filter((item) =>
      selectedItems.includes(item.S_No)
    );
    
    setApprovedUsers((prevApprovedUsers) => [...prevApprovedUsers, ...filteredData]);
  };
  useEffect(() => {
    console.log("Selected Users:", approvedUsers);
  }, [approvedUsers]);

  return (
    <>
      <div className="flex mb-4 relative">
        <div className="font-semibold text-lg w-3/5 items-center flex">{departmentName}</div>
        <div className="font-semibold text-lg justify-end flex w-2/5">
          <div className="flex cursor-pointer hover:bg-gray-200 items-center rounded-md bg-gray-300 py-1 px-2 text-sm w-fit" onClick={() => setShowPopup(true)}>
            Send Interaction Invite 
            <RiMailSendFill className="ml-2"/>
          </div>
          <div className="flex cursor-pointer hover:bg-gray-200 items-center rounded-md bg-gray-300 py-1 px-2 ml-8 text-sm w-fit relative">
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
              onChange={toggleSelectAll}
            />
          </div>
          <div className="ml-3">S.No</div>
        </div>

        <div className="ml-4 w-2/12">Name</div>
        <div className="w-2/12">Subject</div>
        <div className="w-1/12">Gender</div>
        <div className="w-2/12">Mobile</div>
        <div className="w-2/12">Email</div>
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
        <div className={`my-2 flex ${(student && student.isApproved) ? "bg-blue-100" : "bg-white"} shadow-sm items-center rounded-lg py-2 px-3 text-sm`}>
          <div className="w-1/12 flex items-center" key={index+1}>
            <div className={`ml-1 flex items-center justify-center rounded-full h-8 w-8  ${(student && student.isApproved) ? "hover:bg-blue-300" : "hover:bg-gray-200"} transition-colors`}>
              <input
                type="checkbox"
                className="h-4 w-4 rounded-lg cursor-pointer"
                checked={isItemSelected(index+1)}
                onChange={() => toggleSelectItem(index+1)}
              />
            </div>
            <div className="ml-6">{index+1}</div>
          </div>

          <div className="ml-4 w-2/12">{student.firstName + " " + student.lastName} </div>
          <div className="w-2/12">{student.subject}</div>
          <div className="w-1/12">{student.gender}</div>
          <div className="w-2/12">{student.mobileNumber}</div>
          <div className="w-2/12">{student.email}</div>
          <div className="w-1/12">{student.overallMarks.toFixed(2)}</div>
          <div className="w-2/12 flex items-center justify-center">
              <div className="w-4/5 flex justify-center">
                <button className="flex items-center bg-[#4CAF50] hover:bg-[#3f9141] text-white font-semibold text-sm py-1 px-3 justify-center rounded-2xl"
                onClick={() => onViewStudent(student)}>
                  <span className="self-center">View / Approve</span>
                </button>
              </div>
              <div className="w-1/5 flex justify-center">
                {student && student.isApproved &&
                <AiFillCheckCircle className="text-2xl text-green-500"/>}
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
