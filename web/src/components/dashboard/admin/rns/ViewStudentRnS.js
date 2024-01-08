import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { MdError, MdClose, MdDone } from "react-icons/md";
import { FaFilePdf } from 'react-icons/fa';
import { BsFillSendCheckFill } from 'react-icons/bs';
import axios from 'axios';
import {message} from 'antd';
//import { useAppContext } from '../../../../context/context';
import { personal, master, academic, other } from '../../../../constants/viewStudentData';

function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? 'rotate-180' : ''
        } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }

const ViewStudentRnS = () => {
  const student = useSelector((state) => state.student);
  const stu = student.student;
  const [objection, setObjection] = useState(null);
  useEffect(() => {
    fetchObjections();
  }, []);

  const fetchObjections = async () => {
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/admin/getObjections/${stu._id}`
      );
      setObjection(data.data.objections);
    } catch (error) {
      console.error('Error fetching objections:', error);
    }
  };

  const removeObjection = async (objectionText) => {
    console.log(objectionText);
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/admin/removeObj/${stu._id}`,
        { obj : objectionText }
      );
      message.success("Objection Deleted!");
      fetchObjections();
    } catch (error) {
      console.error('Error :', error);
    } 
  };

  const viewLink = async (id) => {
    console.log("MOM ID", id);
    try {
      console.log(id);
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/student/viewfile`,
        {id : id}
      );
      window.open(data.filelink, '_blank');
      console.log("Link ", data.filelink);
    } catch (error) {
      console.error('Error fetching link:', error);
    }
  };
  
  const renderStudentDetails = (obj) => {
    return Object.entries(obj).map(([field, value]) => (
      <div key={field} className="flex py-1">
        <span className="font-semibold w-1/4">{value}</span>
        <span className="w-3/4">{stu[field]}</span>
      </div>
    ));
  };

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const [showTextBox, setShowTextBox] = useState(false);
  const [objectionText, setObjectionText] = useState('');

  const handleRaiseObjection = () => {
    setShowTextBox(true);
  };

  const handleClose = () => {
    setShowTextBox(false);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/admin/raiseObj/${stu._id}`,
        { obj : objectionText }
      );
      message.success("Objection Raised!");
      fetchObjections();
    } catch (error) {
      console.error('Error :', error);
    } finally {
      setShowTextBox(false);
    }
  };

  const handleSendCredentials = async() =>{
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/admin/sendCredentials`,
      {id: stu._id},
    );
    console.log(res);

    if(res.data.error)
    {
      message.error("Error sending credentials");
      return;
    }
    message.success("Credentials sent successfully");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="px-8 py-4">
      <div className="font-medium text-lg w-fit mb-4 hover:text-blue-600 cursor-pointer">
        <Link to="/admin/studentsRnS"> {"< Back"}</Link>
      </div>
      <div className="flex">
      <div className="bg-white w-3/4 shadow-md rounded-md">
        <h2 className="text-xl font-bold px-4 py-3">{stu.firstName + " " + stu.lastName}</h2>
        <div className="border-b border-gray-300"></div>
        <div className="w-full p-4 text-justify text-md">
            <div className='bg-gray-100 p-2 rounded-md font-medium text-lg mb-4 text-gray-500 flex'>
              <div className="w-full">Academic Details</div>
            </div>
          {renderStudentDetails(academic)}

          {/* Accordion for Personal Details */}
          <Accordion className='mt-4' open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)} className='text-lg bg-gray-100 p-2 rounded-md text-gray-500 font-medium py-2'>Personal Details</AccordionHeader>
            <AccordionBody>
              {renderStudentDetails(personal)}
            </AccordionBody>
          </Accordion>

          <div className='bg-gray-100 p-2 rounded-md font-medium text-lg my-4 text-gray-500 flex'>
              <div className="w-full">Master's Details</div>
              
            </div>
          <div className="flex py-1">
            <span className="font-semibold w-1/6">{master.masterDegree}</span>
            <span className="w-2/6">{stu["masterDegree"]}</span>
            <span className="font-semibold w-1/6">{master.masterUniversity}</span>
            <span className="w-2/6">{stu["masterUniversity"]}</span>
          </div>
          <div className="flex py-1">
            <span className="font-semibold w-1/6">{master.masterYear}</span>
            <span className="w-2/6">{stu["masterYear"]}</span>
            <span className="font-semibold w-1/6">{master.masterDivision}</span>
            <span className="w-2/6">{stu["masterDivision"]}</span>
          </div>
          <div className="flex py-1">
            <span className="font-semibold w-1/6">{master.masterMarks}</span>
            <span className="w-2/6">{stu["masterMarks"]}</span>
            <span className="font-semibold w-1/6">{master.masterPercent}</span>
            <span className="w-2/6">{stu["masterPercent"]}</span>
          </div>
          <div className="flex py-1">
            <span className="font-semibold w-1/6">{master.masterSubject}</span>
            <span className="w-2/6">{stu["masterSubject"]}</span>
            <span className="font-semibold w-1/6">{master.masterRollNo}</span>
            <span className="w-2/6">{stu["masterRollNo"]}</span>
          </div>


          <div className='bg-gray-100 p-2 rounded-md font-medium text-lg my-4 text-gray-500 flex'>
              <div className="w-full">Other Details</div>
            </div>
          {renderStudentDetails(other)}

            <div className='bg-gray-100 p-2 rounded-md font-medium text-lg my-4 text-gray-500 flex'>
              <div className="w-1/2">Uploaded Documents</div>
            </div>
            <div className="flex py-1 font-medium">
              <div className="w-full text-blue-700 font-semibold hover:underline cursor-pointer" onClick={() => viewLink(stu.dmc)}>1. Master's Degree / DMC</div>
            </div>
            <div className="flex py-1 font-medium">
            <div className="w-full text-blue-700 font-semibold hover:underline cursor-pointer" onClick={() => viewLink(stu.eligibility)}>2. Eligibility Test (PhD Entrance Test / GATE / UGC-NET)</div>

            </div>
            <div className="flex py-1 font-medium">
            <div className="w-full text-blue-700 font-semibold hover:underline cursor-pointer" onClick={() => viewLink(stu.migration)}>3. Migration Certificate (if from other university)</div>
            </div>
            <div className="flex py-1 font-medium">
            <div className="w-full text-blue-700 font-semibold hover:underline cursor-pointer" onClick={() => viewLink(stu.noc)}>4. NOC (If Employed)</div>
            </div>
            <div className="flex py-1 font-medium">
            <div className="w-full text-blue-700 font-semibold hover:underline cursor-pointer" onClick={() => viewLink(stu.scholarship)}>4. Scholarship Proof</div>
            </div>
        </div>

       </div>
       <div className="w-1/4 ml-4">
            <div className={`shadow-md px-4 py-2 font-semibold text-white rounded-md flex ${
                false
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              }`} onClick={() => viewLink(stu.mom)} >
                <div className="w-5/6 text-sm">View Scorecard</div>
                <div className="w-1/6 text-lg justify-end flex"><FaFilePdf /></div>
            </div>
            <div className={`shadow-md my-4 px-4 py-2 font-semibold text-white rounded-md flex ${
                false
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 cursor-pointer"
              }`} onClick={handleSendCredentials}>
                <div className="w-5/6 text-sm">Send Enrollment Letter</div>
                <div className="w-1/6 text-lg justify-end flex"><BsFillSendCheckFill /></div>
            </div>
            <div className={`shadow-md my-4 px-4 py-2 font-semibold text-white rounded-md flex ${
                false
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 cursor-pointer"
              }`} onClick={handleRaiseObjection}>
                <div className="w-5/6 text-sm">Raise Objection</div>
                <div className="w-1/6 text-lg justify-end flex"><MdError /></div>
            </div>
            {showTextBox && (
              <div className="bg-gray-200 rounded-md p-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">Objection Detail</span>
                  <div className="flex items-center">
                    <button className="text-red-500 rounded-full hover:bg-red-300" onClick={handleClose}>
                      <MdClose />
                    </button>
                    <button className="text-green-500 ml-2 rounded-full hover:bg-green-300" onClick={handleSubmit}>
                      <MdDone />
                    </button>
                  </div>
                </div>
                {/* Your text area input goes here */}
                <textarea
                  className="w-full border rounded-md p-2"
                  rows="4"
                  value={objectionText}
                  onChange={(e) => setObjectionText(e.target.value)}
                />
              </div>
            )}

        <div className="bg-white shadow-md h-fit rounded-md pb-2">
                <h2 className="text-md font-bold px-4 py-3">Notice</h2>
                <div className="border-b border-gray-30"></div>

                {objection && (
                  <div>
                    {objection.map((objection, index) => (
                      <div key={index} className='flex items-center my-2 px-2 text-sm'>
                        <div className='rounded-full bg-red h-4 w-4 items-center flex justify-center text-xs text-white font-semibold bg-red-700 mr-2 hover:bg-red-600 hover:cursor-pointer' onClick={() => removeObjection(objection)}>X</div>
                        {objection}
                      </div>
                    ))}
                  </div>
                )}
            </div>
        </div>
        
    </div>
      
    </div>
  );
};

export default ViewStudentRnS;
