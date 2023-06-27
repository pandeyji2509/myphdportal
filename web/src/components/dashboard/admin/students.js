import React, { useState, useEffect } from "react";
import data from '../../../data/newRegistrations.json';
import { FaEye, FaEnvelope, FaFilePdf, FaCheck } from "react-icons/fa";
import { jsPDF } from "jspdf";
import { useAppContext } from '../../../context/context'

const Student = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // Added state for popup visibility
  const { approvedUsers, setApprovedUsers } = useAppContext();
  console.log(approvedUsers);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems((prevItems) => data.map((item) => item.S_No));
    } else {
      setSelectedItems([]);
    }
    console.log(selectedItems);
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
  }, [selectedItems]);

  const isItemSelected = (itemId) => {
    return selectedItems.includes(itemId);
  };
  const handleEmailClick = () => {
    setShowPopup(true);
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
    setApprovedUsers(filteredData);
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
          <button  
            onClick={handleEmailClick} 
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
        </div>
      </div>
      {data.map((item) => (
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

      <div className="flex mb-2 justify-center items-center">
        <div htmlFor="dateInput" className="w-1/6 font-semibold items-center flex">Date</div>
        <input type="date" id="dateInput" className="border w-2/6 border-gray-300 rounded-md px-2 py-1" />
        <div htmlFor="timeInput" className="w-1/6 font-semibold justify-center items-center flex">Time</div>
        <input type="time" id="timeInput" className="border w-2/6 border-gray-300 rounded-md px-2 py-1" />
      </div>

      <div className='flex mt-4'>
        <div htmlFor="venueInput" className="w-1/6 font-semibold items-center flex">Venue</div>
        <textarea id="venueInput" className="w-5/6 border border-gray-300 rounded-md px-2 py-2"></textarea>
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded-2xl shadow-md mr-2 hover:bg-blue-500"
          // onClick={sendEmail}
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


    </>
  );
};

export default Student;