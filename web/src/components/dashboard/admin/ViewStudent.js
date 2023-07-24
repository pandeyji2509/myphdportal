import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { FaSave } from 'react-icons/fa';
import { FcApprove } from 'react-icons/fc';
import { BsFillSendCheckFill } from 'react-icons/bs';
import axios from 'axios';
import {message} from 'antd';
import { useAppContext } from '../../../context/context';
import { personal, master, academic, other } from '../../../constants/viewStudentData';
// import AppContext from 'antd/es/app/context';


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


const ScoreRow = ({ label, value, onChange, disabled, text, stu }) => (
  <div className="flex py-2">
    <span className="font-semibold w-3/4">{label}</span>
    <span className="w-1/4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(text, e.target.value)}
        disabled={disabled}
        className={`w-full ${disabled ? 'bg-gray-100' : 'bg-white border border-gray-300'} p-1 rounded-md`}
      />
    </span>
  </div>
);

const ViewStudent = () => {
  const state = useAppContext();
  const student = useSelector((state) => state.student);
  const stu = student.student;

  // Initialize studentScores state with data fetched from backend
  const [studentScores, setStudentScores] = useState(null);

  useEffect(() => {
    fetchStudentScores();
  }, []);

  const fetchStudentScores = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/student/scores/${stu._id}`
      );
      setStudentScores(data.scores);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  const calculateOverallMarks = () => {
    // Calculate overallMarks from the studentScores object if it exists
    const { bsc, msc, scholarship, proposal, interaction } = studentScores || {};
    const overallMarks =
      parseFloat(bsc || 0) + parseFloat(msc || 0) + parseFloat(scholarship || 0) + parseFloat(proposal || 0) + parseFloat(interaction || 0);
    return overallMarks;
  };
  
  const handleChange = (field, value) => {
    if (isNaN(value)) {
      value = 0;
    }

    value = parseInt(value);
    // Update the studentScores state with the new value
    setStudentScores((prevScores) => ({
      ...prevScores,
      [field]: value,
    }));
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

  const handleApprovalChange = (field, value) => {
    // Update the studentScores state with the new approval status
    setStudentScores((prevScores) => ({
      ...prevScores,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setStudentScores((prevScores) => ({ ...prevScores }));
      setSaveButtonDisabled(true);
  
      await axios.put(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/student/scores/${stu._id}`,
        studentScores
      );
      message.success("Changes Saved Successfully!");
    } catch (error) {
      console.error('Error updating scores:', error);
    } finally {
      setSaveButtonDisabled(false);
    }
  };
  
  // Add a new state to manage the button disabled state
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const scoreRows = [
    { label: "B.Sc. (20%)", value: studentScores?.bsc || '', disabled: true },
    { label: "M.Sc. (30%)", value: studentScores?.msc.toFixed(1) || '', disabled: true },
    { label: "Scholarship (10%)", value: studentScores?.scholarship || '', onChange: handleChange, text: "scholarship", disabled: stu.isApproved },
    { label: "Marks for the research proposal (Written) (10%)", value: studentScores?.proposal || '', onChange: handleChange, text: "proposal", disabled: stu.isApproved},
    { label: "Interaction with Committee (30%)", value: studentScores?.interaction || '', onChange: handleChange, text: "interaction", disabled: stu.isApproved },
  ];


  const areAllApprovalsTrue = () => {
    return (
      studentScores &&
      studentScores.isAcademicApproved &&
      studentScores.isMastersApproved &&
      studentScores.isOthersApproved &&
      studentScores.isMasterDMCApproved &&
      studentScores.isEligibilityTestApproved &&
      studentScores.isMigrationApproved &&
      studentScores.isNOCApproved
    );
  };

  const [finalApprovalTriggered, setFinalApprovalTriggered] = useState(false);
  // Add useEffect to call handleSubmit when finalApproval becomes true
  useEffect(() => {
    if (finalApprovalTriggered && studentScores?.finalApproval) {
      handleSubmit();
      setFinalApprovalTriggered(false);
    }
  }, [studentScores, finalApprovalTriggered]);

  const handleSaveAndApprove = () => {
    if (!areAllApprovalsTrue()) {
      message.error("Please approve all checkboxes before saving & approving.");
      return;
    }

    // Show a confirmation message before proceeding
    const isConfirmed = window.confirm(
      "You won't be able to change anything again. Make sure the scores are given correctly."
    );

    if (!isConfirmed) {
      return;
    }

    // Update the studentScores state to set finalApproval to true
    setStudentScores((prevScores) => ({
      ...prevScores,
      finalApproval: true,
    }));
    setFinalApprovalTriggered(true);
    console.log(studentScores);
    // Handle the submit to save changes
  };


  const handleSendCredentials = async() =>{
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/admin/sendCredentials`,
      {id: stu._id},
    );

    if(res.error)
    {
      message.error("You cannot send credentials before approving the candidate's scores");

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
        <Link to="/admin/students"> {"< Back"}</Link>
      </div>
      <div className="flex">
      <div className="bg-white w-3/4 shadow-md rounded-md">
        <h2 className="text-xl font-bold px-4 py-3">{stu.firstName + " " + stu.lastName}</h2>
        <div className="border-b border-gray-300"></div>
        <div className="w-full p-4 text-justify text-md">
            <div className='bg-gray-100 p-2 rounded-md font-medium text-lg mb-4 text-gray-500 flex'>
              <div className="w-1/2">Academic Details</div>
              <div className="w-1/2 flex justify-end">
              <input
                name="isAcademicApproved"
                type="checkbox"
                className="mr-2"
                checked={studentScores ? studentScores.isAcademicApproved : false}
                onChange={(e) => handleApprovalChange('isAcademicApproved', e.target.checked)}
                disabled = {stu.isApproved}
              />
                <div className='text-sm items-center flex mr-2'>Approve</div>
              </div>
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
              <div className="w-1/2">Master's Details</div>
              <div className="w-1/2 flex justify-end">
              <input
                name="isMastersApproved"
                type="checkbox"
                className="mr-2"
                checked={studentScores ? studentScores.isMastersApproved : false}
                onChange={(e) => handleApprovalChange('isMastersApproved', e.target.checked)}
                disabled = {stu.isApproved}
              />
                <div className='text-sm items-center flex mr-2'>Approve</div>
              </div>
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
              <div className="w-1/2">Other Details</div>
              <div className="w-1/2 flex justify-end">
              <input
                name="isOthersApproved"
                type="checkbox"
                className="mr-2"
                checked={studentScores ? studentScores.isOthersApproved : false}
                onChange={(e) => handleApprovalChange('isOthersApproved', e.target.checked)}
                disabled = {stu.isApproved}
              />
                <div className='text-sm items-center flex mr-2'>Approve</div>
              </div>
            </div>
          {renderStudentDetails(other)}

            <div className='bg-gray-100 p-2 rounded-md font-medium text-lg my-4 text-gray-500 flex'>
              <div className="w-1/2">Uploaded Documents</div>
            </div>
            <div className="flex py-1 font-medium">
              <div className="w-3/4">1. Master's Degree / DMC</div>
              <div className="w-1/4 flex justify-end">
              <input
                name="isMasterDMCApproved"
                type="checkbox"
                className="mr-2"
                checked={studentScores ? studentScores.isMasterDMCApproved : false}
                onChange={(e) => handleApprovalChange('isMasterDMCApproved', e.target.checked)}
                disabled = {stu.isApproved}
              />
                <div className='text-sm items-center flex mr-2'>Approve</div>
              </div>
            </div>
            <div className="flex py-1 font-medium">
              <div className="w-3/4">2. Eligibility Test (PhD Entrance Test / GATE / UGC-NET)</div>
              <div className="w-1/4 flex justify-end">
              <input
                name="isEligibilityTestApproved"
                type="checkbox"
                className="mr-2"
                checked={studentScores ? studentScores.isEligibilityTestApproved : false}
                onChange={(e) => handleApprovalChange('isEligibilityTestApproved', e.target.checked)}
                disabled = {stu.isApproved}
              />
                <div className='text-sm items-center flex mr-2'>Approve</div>
              </div>
            </div>
            <div className="flex py-1 font-medium">
              <div className="w-3/4">3. Migration Certificate (if from other university)</div>
              <div className="w-1/4 flex justify-end">
              <input
                name="isMigrationApproved"
                type="checkbox"
                className="mr-2"
                checked={studentScores ? studentScores.isMigrationApproved : false}
                onChange={(e) => handleApprovalChange('isMigrationApproved', e.target.checked)}
                disabled = {stu.isApproved}
              />
                <div className='text-sm items-center flex mr-2'>Approve</div>
              </div>
            </div>
            <div className="flex py-1 font-medium">
              <div className="w-3/4">4. NOC (If Employed)</div>
              <div className="w-1/4 flex justify-end">
              <input
                name="isNOCApproved"
                type="checkbox"
                className="mr-2"
                checked={studentScores ? studentScores.isNOCApproved : false}
                onChange={(e) => handleApprovalChange('isNOCApproved', e.target.checked)}
                disabled = {stu.isApproved}
              />
                <div className='text-sm items-center flex mr-2'>Approve</div>
              </div>
            </div>
        </div>

       </div>
        <div className="w-1/4 ml-4">
            <div className="bg-white shadow-md h-fit rounded-md">
                <h2 className="text-xl font-bold px-4 py-3">Scores</h2>
                <div className="border-b border-gray-300"></div>
                <div className="w-full p-4 text-md">
                  {scoreRows.map((row) => (
                    <ScoreRow key={row.label} {...row}/>
                  ))}
                  <ScoreRow
                    label="Overall Marks"
                    value={calculateOverallMarks()}
                    disabled
                  />
                </div>
            </div>
            <div
              className={`shadow-md my-4 px-4 py-2 font-semibold text-white rounded-md flex ${
                (saveButtonDisabled || stu.isApproved)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              }`}
              onClick={handleSubmit}
              disabled={saveButtonDisabled}
            >
              <div className="w-3/4 text-sm">Save Changes</div>
              <div className="w-1/4 text-lg justify-end flex">
                <FaSave />
              </div>
            </div>
            <div className={`shadow-md my-4 px-4 py-2 font-semibold text-white rounded-md flex ${
                stu.isApproved
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#4CAF50] hover:bg-[#3a873d] cursor-pointer"
              }`}
              onClick={handleSaveAndApprove}>
                <div className="w-5/6 text-sm">Save & Approve</div>
                <div className="w-1/6 text-lg justify-end flex"><FcApprove /></div>
            </div>
            <div className={`shadow-md my-4 px-4 py-2 font-semibold text-white rounded-md flex ${
                false
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              }`} onClick = {handleSendCredentials}>
                <div className="w-5/6 text-sm">Send Credentials</div>
                <div className="w-1/6 text-lg justify-end flex"><BsFillSendCheckFill /></div>
            </div>
        </div>
        
    </div>
      
    </div>
  );
};

export default ViewStudent;
