import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { FaSave, FaFilePdf } from 'react-icons/fa';
import { FcApprove } from 'react-icons/fc';
import { BiSolidCloudUpload } from "react-icons/bi";
import axios from 'axios';
import {message} from 'antd';
import { useAppContext } from '../../../../context/context';
import { personal, master, academic, other } from '../../../../constants/viewStudentData';
import { jsPDF } from "jspdf";
import { Icon } from '../icon';

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

  const [studentScores, setStudentScores] = useState(null);
  const [objection, setObjection] = useState(null);
  const [viewlink, setlink] = useState(null);
  useEffect(() => {
    fetchStudentScores();
    fetchObjections();
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
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/admin/removeObj/${stu._id}`, { obj : objectionText }
      );
      message.success("Objection Deleted!");
      fetchObjections();
    } catch (error) {
      console.error('Error :', error);
    } 
  };

  const viewLink = async (id) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/student/viewfile`, {id : id}
      );
      window.open(data.filelink, '_blank');
    } catch (error) {
      console.error('Error fetching link:', error);
    }
  };

  // File Upload

  const [selectedFiles, setSelectedFiles] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = async(event) => {
    const files = Array.from(event.target.files);
    console.log("file", files[0]);
    setSelectedFiles(files);
    console.log(selectedFiles);

    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/uploadMoM`, 
        {email : stu.email, mom : files[0]}, 
        {
          headers: {
            "content-type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRectangleClick = () => {
    fileInputRef.current.click();
  };

  const calculateOverallMarks = () => {
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

  const handleSubmit = async (flag) => {
    try {
      setStudentScores((prevScores) => ({ ...prevScores }));
      setSaveButtonDisabled(true);
  
      await axios.put(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/student/scores/${stu._id}`,
        { scores : studentScores, flag : flag }
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
      studentScores.isNOCApproved &&
      studentScores.isScholarshipApproved &&
      studentScores.isFeeUploaded
    );
  };

  const [finalApprovalTriggered, setFinalApprovalTriggered] = useState(false);
  // Add useEffect to call handleSubmit when finalApproval becomes true
  useEffect(() => {
    if (finalApprovalTriggered && studentScores?.finalApproval) {
      handleSubmit(true);
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
    // Handle the submit to save changes
  };

  const generatePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Define the table data (dummy data)
    const tableData = [
      ['S.No', 'Heading', 'Subhead', 'Weightage', 'Marks Obtained', 'Marks Secured', 'Remarks'],
      [1, 'Academic Record (50%)', 'Bachelor’s Degree', '20% (20)', 88, 20, 'Good'],
      [2, 'Personal Details', 'Address', '10% (10)', 45, 9, 'Average'],
      [3, 'Master\'s Details', 'Degree', '15% (15)', 72, 10, 'Excellent'],
      ['', '', 'Master\'s Major', '', '', '', ''], // Empty row to merge cells (2,2) and (3,2)
      [4, 'Other Details', 'Experience', '5% (5)', 15, 5, 'Satisfactory'],
      [5, 'Additional Info', 'Hobbies', '5% (5)', 10, 4, 'Good'],
      ['', '', 'Other Hobbies', '', '', '', ''], // Empty row to merge cells (5,2) and (6,2)
      [6, 'Overall', '', '100%', 230, 48, ''],
    ];
  
    // Set the table column widths (you can adjust these as needed)
    const colWidths = [15, 60, 60, 40, 35, 40, 40];
  
    // Set font size for the table
    doc.setFontSize(12);
  
    // Define the margin and starting y-position
    const margin = 10;
    let y = margin;
  
    // Iterate through each row and column to add data to the PDF
    tableData.forEach((row, rowIndex) => {
      let x = margin;
  
      row.forEach((column, colIndex) => {
        const cellWidth = colWidths[colIndex];
        const cellHeight = 10;
  
        // Apply table header styling to the first row
        if (rowIndex === 0) {
          doc.setFillColor(41, 128, 185); // Header background color
          doc.setTextColor(0, 0, 0); // Header text color
          doc.setFont('bold');
        }
  
        // Merge cells (2,2) and (3,2)
        if ((rowIndex === 2 || rowIndex === 3) && colIndex === 2) {
          doc.rect(x, y, cellWidth, cellHeight, 'S');
          doc.text(column.toString(), x + 2, y + 8, { maxWidth: cellWidth - 4, align: 'center' });
        } else {
          // Add cell content with padding and alignment
          doc.rect(x, y, cellWidth, cellHeight, 'S');
          doc.text(column.toString(), x + 2, y + 8, { maxWidth: cellWidth - 4, align: 'center' });
        }
  
        x += cellWidth;
      });
  
      // Move to the next row
      y += 10;
  
      // Reset styling for subsequent rows
      if (rowIndex === 0) {
        doc.setFillColor(255, 255, 255); // Reset background color
        doc.setTextColor(0, 0, 0); // Reset text color
        doc.setFont('normal');
      }
    });
    
    let name = `${stu.firstName + stu.lastName + "_Scorecard.pdf"}`
    // Save the PDF or open it in a new tab
    doc.save(name);
  };


  const handleFeeRequest = async() =>{
    console.log("in here");
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/admin/feeRequest`,
        {id: stu._id},
      );
      if(res.data.error)
      {
        message.error("Error sending request");
      } else {
        message.success("Request sent successfully");
      }
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
              <div className="w-3/4 text-blue-700 font-semibold hover:underline cursor-pointer" onClick={() => viewLink(stu.dmc)}>1. Master's Degree / DMC</div>
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
            <div className="w-3/4 text-blue-700 font-semibold hover:underline cursor-pointer" onClick={() => viewLink(stu.eligibility)}>2. Eligibility Test (PhD Entrance Test / GATE / UGC-NET)</div>
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
            <div className="w-3/4 text-blue-700 font-semibold hover:underline cursor-pointer" onClick={() => viewLink(stu.migration)}>3. Migration Certificate (if from other university)</div>
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
              <div className="w-3/4 text-blue-700 font-semibold hover:underline cursor-pointer" onClick={() => viewLink(stu.noc)}>4. NOC (If Employed)</div>
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
            <div className="flex py-1 font-medium">
              <div className="w-3/4 text-blue-700 font-semibold hover:underline cursor-pointer" onClick={() => viewLink(stu.scholarship)}>5. Scholarship Proof</div>
              <div className="w-1/4 flex justify-end">
              <input
                name="isScholarshipApproved"
                type="checkbox"
                className="mr-2"
                checked={studentScores ? studentScores.isScholarshipApproved : false}
                onChange={(e) => handleApprovalChange('isScholarshipApproved', e.target.checked)}
                disabled = {stu.isApproved}
              />
                <div className='text-sm items-center flex mr-2'>Approve</div>
              </div>
            </div>
            <div className="flex py-1 font-medium">
              <div className="w-3/4 text-blue-700 font-semibold hover:underline cursor-pointer" onClick={() => viewLink(stu.fee)}>6. Fee Receipt</div>
              <div className="w-1/4 flex justify-end">
              <input
                name="isFeeUploaded"
                type="checkbox"
                className="mr-2"
                checked={studentScores ? studentScores.isFeeUploaded : false}
                onChange={(e) => handleApprovalChange('isFeeUploaded', e.target.checked)}
                disabled = {stu.isApproved}
              />
                <div className='text-sm items-center flex mr-2'>Approve</div>
              </div>
            </div>
        </div>

       </div>


        {/* Second Column */}


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
                (saveButtonDisabled || stu.depApproved)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              }`}
              onClick={() => handleSubmit(false)}
              disabled={saveButtonDisabled}
            >
              <div className="w-3/4 text-sm">Save Changes</div>
              <div className="w-1/4 text-lg justify-end flex">
                <FaSave />
              </div>
            </div>
            <div className={`shadow-md my-4 px-4 py-2 font-semibold text-white rounded-md flex ${
                stu.depApproved
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#4CAF50] hover:bg-[#3a873d] cursor-pointer"
              }`}
              onClick={handleSaveAndApprove}>
                <div className="w-5/6 text-sm">Save & Approve</div>
                <div className="w-1/6 text-lg justify-end flex"><FcApprove /></div>
            </div>

            <div className={`shadow-md my-4 px-4 py-2 font-semibold text-white rounded-md flex bg-blue-500 hover:bg-blue-600 cursor-pointer`}
              onClick={handleFeeRequest}>
                <div className="w-5/6 text-sm">Request Fee Upload</div>
                <div className="w-1/6 text-lg justify-end flex"><BiSolidCloudUpload /></div>
            </div>

            <div className={`shadow-md my-4 px-4 py-2 font-semibold text-white rounded-md flex bg-red-500 hover:bg-red-600 cursor-pointer`} onClick = {generatePDF}>
                <div className="w-5/6 text-sm">Generate Scorecard</div>
                <div className="w-1/6 text-lg justify-end flex"><FaFilePdf /></div>
            </div>
            <div className={`shadow-md my-4 px-4 py-2 font-semibold text-white rounded-md flex cursor-pointer ${
                selectedFiles
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`} onClick={handleRectangleClick}>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                />
                <div className="w-5/6 text-sm">
                  {` ${ selectedFiles ? "Signed Copy Attached" : "Attach Signed Copy"}`}</div>
                <div className="w-1/6 text-xl justify-end flex"><BiSolidCloudUpload /></div>
            </div>
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

export default ViewStudent;
