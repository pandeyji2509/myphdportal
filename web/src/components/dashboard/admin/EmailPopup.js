import React from "react";

const EmailPopup = ({
  handleDateChange,
  handleTimeChange,
  handleVenueChange,
  sendEmailToStudents,
  closePopup,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[28%] backdrop-blur-[2px]">
    <div className="bg-white w-[35%] p-4 rounded-lg">
      {/* <h2 className="text-lg font-semibold mb-2">Email</h2> */}

      <div className="flex mb-2 justify-center items-center">
        <div htmlFor="dateInput" className="w-1/6 font-semibold items-center flex">Date</div>
        <input type="date" id="dateInput" className="border w-2/6 border-gray-300 rounded-md px-2 py-1" onChange={handleDateChange} />
        <div htmlFor="timeInput" className="w-1/6 font-semibold justify-center items-center flex">Time</div>
        <input type="time" id="timeInput" className="border w-2/6 border-gray-300 rounded-md px-2 py-1"  onChange={handleTimeChange} />
      </div>

      <div className='flex mt-4'>
        <div htmlFor="venueInput" className="w-1/6 font-semibold items-center flex" >Venue</div>
        <textarea id="venueInput" className="w-5/6 border border-gray-300 rounded-md px-2 py-2"  onChange={handleVenueChange}></textarea>
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded-2xl shadow-md mr-2 hover:bg-blue-500"
          // onClick={sendEmail}
          onClick={sendEmailToStudents}
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
  );
};

export default EmailPopup;
