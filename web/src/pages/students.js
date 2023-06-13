import React, { useState } from 'react';
import Mock_Data from './MOCK_DATA.json';
import { FaEye, FaEnvelope, FaFilePdf, FaCheck } from "react-icons/fa";
import './styles.css'


const Student = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // Added state for popup visibility

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(Mock_Data.map((item) => item.S_No));
    } else {
      setSelectedItems([]);
    }
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
  const handleEmailClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
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
          <button  onClick={handleEmailClick} className="email rounded-full bg-blue-500 text-white h-8 w-8 flex items-center justify-center cursor-pointer">
            <FaEnvelope className="text-lg" />
          </button>
          <div className="rounded-full bg-red-700 text-white h-8 w-8 flex items-center justify-center cursor-pointer ml-2">
            <FaFilePdf className="text-lg" />
          </div>
          <div className="rounded-full bg-green-500 text-white h-8 w-8 flex items-center justify-center cursor-pointer ml-2">
            <FaCheck className="text-lg" />
          </div>
        </div>
      </div>
      
      {Mock_Data.map((item) => (
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
            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-2xl">
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

      <div className="flex mb-2">
        <div className="mr-2">
          <label htmlFor="dateInput">Date: </label>
          <input type="date" id="dateInput" className="border border-gray-300 rounded-md px-2 py-1" />
        </div>
        <div>
          <label htmlFor="timeInput">Time: </label>
          <input type="time" id="timeInput" className="border border-gray-300 rounded-md px-2 py-1" />
        </div>
      </div>

      <div>
        <label htmlFor="venueInput" style={{textAlign:'center'}}>Venue: </label>
        <textarea id="venueInput" className="border border-gray-300 rounded-md px-2 py-2" style={{ width: '250px'}}></textarea>
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
          // onClick={sendEmail}
        >
          Send
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={closePopup}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


    </>
  );
};

export default Student;
