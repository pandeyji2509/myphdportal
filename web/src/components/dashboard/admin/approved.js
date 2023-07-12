import React, { useState } from 'react';
//import data from '../../../data/approved.json';
import axios from 'axios';
import { useAppContext } from '../../../context/context';
import { FaEye, FaEnvelope, FaFilePdf, FaCheck } from "react-icons/fa";

const Approved = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Added state for popup visibility
  const { approvedUsers } = useAppContext();
  
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(approvedUsers.map((item) => item.S_No));
    } else {
      setSelectedItems([]);
    }
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  const toggleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((item) => item !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const isItemSelected = (itemId) => {
    return selectedItems.includes(itemId);
  };

  const sendCredentials = () => {
    
    selectedItems.forEach((itemId) => {
      const student = approvedUsers.find((item) => item.S_No === itemId);
      const { name, department, gender, contact, Email } = student;
  
      // Compose the email data
      const emailData = {
        to: Email,
        subject: 'Credentials',
        body: `Dear ${name},\n\nHere are your credentials:\nName: ${name}\nDepartment: ${department}\nGender: ${gender}\nContact: ${contact}`
      };
  
      // Send the email using an API endpoint or email service of your choice
      axios.post('/send-email', emailData)
        .then((response) => {
          console.log('Email sent successfully');
          
        })
        .catch((error) => {
          console.log('Failed to send email:', error);
          
        });
      
    });
  
    // Close the popup and clear the selected items
    setShowPopup(false);
    setSelectedItems([]);
  };
  

  return (
    <div className='p-8'>
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
        <div className="w-2/12">Department</div>
        <div className="w-1/12">Gender</div>
        <div className="w-2/12">Mobile</div>
        <div className="w-3/12">Email</div>
        <div className="w-2/12 flex items-center justify-center">
          <div className="rounded-full bg-blue-500 text-white h-8 w-8 flex items-center justify-center cursor-pointer"  onClick={() => setShowPopup(true)}>
            <FaEnvelope className="text-lg" />
          </div>
          <div className="rounded-full bg-red-700 text-white h-8 w-8 flex items-center justify-center cursor-pointer ml-2">
            <FaFilePdf className="text-lg" />
          </div>
          <div className="rounded-full bg-green-500 text-white h-8 w-8 flex items-center justify-center cursor-pointer ml-2">
            <FaCheck className="text-lg" />
          </div>
        </div>
      </div>
      
      {approvedUsers.map((item) => (
        <div className="my-2 flex bg-white shadow-sm items-center rounded-lg py-2 px-3 text-sm">
          <div className="w-1/12 flex items-center" key={item.S_No}>
            <div className="ml-1 flex items-center justify-center rounded-full h-8 w-8 hover:bg-gray-200 transition-colors">
              <input
                type="checkbox"
                className="h-4 w-4 rounded-lg cursor-pointer"
                checked={isItemSelected(item.S_No)}
                onChange={() => toggleSelectItem(item.S_No)}
              />
            </div>
            <div className="ml-6">{item.S_No}</div>
          </div>
          
          <div className="ml-4 w-2/12">{item.name}</div>
          <div className="w-2/12">{item.department}</div>
          <div className="w-1/12">{item.gender}</div>
          <div className="w-2/12">{item.contact}</div>
          <div className="w-3/12">{item.Email}</div>
          <div className="w-2/12 flex items-center justify-center">
            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-2xl" onClick={() => {
    setSelectedStudent(item); // Set the selected student's details
    setShowDetailsPopup(true); // Open the details popup
  }}>
              <span className="mr-2">View</span>
              <FaEye className="text-lg" />
            </button>
          </div>
        </div>
      ))}
      {showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
    <div className="bg-white p-4 rounded-lg">
      {/* <h2 className="text-lg font-semibold mb-2">Email</h2> */}

        <div >Do you want to send credentials to the approved students</div>
      
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded-2xl shadow-md mr-2 hover:bg-blue-500"
          onClick={sendCredentials}
        >
          Send
        </button>
        <button
          className="bg-blue-600 text-white px-4 shadow-md rounded-2xl hover:bg-blue-500"
          onClick={closePopup}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
{showDetailsPopup && <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Student Details</h2>
  
          <div className="mb-2">
            <strong>Name:</strong> {selectedStudent.name}
          </div>
          <div className="mb-2">
            <strong>Department:</strong> {selectedStudent.department}
          </div>
          <div className="mb-2">
            <strong>Gender:</strong> {selectedStudent.gender}
          </div>
          <div className="mb-2">
            <strong>Contact:</strong> {selectedStudent.contact}
          </div>
          <div className="mb-2">
            <strong>Email:</strong> {selectedStudent.Email}
          </div>
  
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded-2xl shadow-md mr-2 hover:bg-blue-500"
              onClick={()=>setShowDetailsPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div> }
      
    </div>
  );
};

export default Approved;
