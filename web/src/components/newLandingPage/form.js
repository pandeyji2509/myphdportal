import React, { useState } from 'react';

function WriteField({fields, formData, handleChange, keyStyle, labelStyle, inputStyle}) {

  return (
    <>
      {fields.map((field) => (
        <div key={field.name} className={`flex ${keyStyle} items-center`}>
          <label htmlFor={field.name} className={`text-gray-700 font-bold ${labelStyle} mr-4 items-center`}>
            {field.label}
          </label>
          <input
            type="text"
            id={field.name}
            name={field.name}
            className={`shadow appearance-none border rounded ${inputStyle} py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
    </>
  );
}

function Form({ onLoginClick }) {
  const [formData, setFormData] = useState({
    department: '',
    subject: '',
    faculty: '',
    firstName: '',
    lastName: '',
    gender: '',
    fatherName: '',
    motherName: '',
    mobileNumber: '',
    permaddress: '',
    localaddress: '',
    aadhar: '',
    telNumber: '',
    state: '',
    email: '',
    regNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const formFields = [
    { label: 'Department', name: 'department', placeholder: 'Faculty of Engineering & Technology' },
    { label: 'Subject', name: 'subject', placeholder: 'Computer Science' },
    { label: 'Faculty', name: 'faculty', placeholder: 'Faculty' },
    { label: 'First Name', name: 'firstName', placeholder: 'John' },
    { label: 'Last Name', name: 'lastName', placeholder: 'Doe' },
    { label: 'Gender', name: 'gender', placeholder: 'Male/Female' },
    { label: 'Father\'s Name', name: 'fatherName', placeholder: 'John Doe Sr.' },
    { label: 'Mother\'s Name', name: 'motherName', placeholder: 'Jane Doe' },
    { label: 'Mobile Number', name: 'mobileNumber', placeholder: '1234567890' },
    { label: 'Permanent Address', name: 'permaddress', placeholder: '123 Main St' },
    { label: 'Local Address', name: 'localaddress', placeholder: '456 Elm St' },
    { label: 'Aadhar Number', name: 'aadhar', placeholder: '1234-5678-9012' },
    { label: 'Telephone', name: 'telNumber', placeholder: '9876543210' },
    { label: 'State', name: 'state', placeholder: 'California' },
    { label: 'Email', name: 'email', placeholder: 'example@example.com' },
    { label: "Master's Degree", name: 'masters', placeholder: 'M.A.' },
    { label: 'Year', name: 'year', placeholder: '2023' },
    { label: 'University', name: 'university', placeholder: 'University Name' },
    { label: 'Division', name: 'division', placeholder: 'First' },
    { label: 'Marks Obtained', name: 'marksobtained', placeholder: '100' },
    { label: 'Percentage', name: 'percentage', placeholder: '100%' },
    { label: 'Subject', name: 'masterSubject', placeholder: 'Subject' },
    { label: 'Roll No', name: 'masterRollNo', placeholder: '123456' },
    { label: 'Eligibility Test', name: 'eligibilityTest', placeholder: 'GATE' },
    { label: 'Registration No. (if any) of Panjab University', name: 'regNum', placeholder: '36925000120'},
    { label: 'Department where research work will be carried out', name: 'researchDep', placeholder: 'Department'},
    { label: 'Whether employed?', name: 'employed', placeholder: 'NO' },
    { label: 'If yes, name and address of the Instruction /Organization', name: 'employerDetails', placeholder: 'Employer Details'},
    // Add more fields as needed
  ];

  return (
    <>
      <div>
        <div className="border-b border-gray-300 mb-2 mx-12"></div>
        <div className="text-gray-500 font-bold text-center px-12">
          Application form for Registration as a candidate for the degree of Doctor of Philosophy
        </div>
        <div className="border-b border-gray-300 mt-2 mb-8 mx-12"></div>
      </div>

      <form onSubmit={handleSubmit} className="">
        <div className="bg-white rounded-lg w-full p-8 shadow-md">
          <div className="flex">
            <WriteField fields={formFields.slice(0,3)} formData={formData} handleChange = {handleChange} labelStyle={"w-fit"} keyStyle={"w-1/3 justify-end"} inputStyle={"w-3/4"}/>
          </div>
        </div>
        <div className="flex mt-4 text-white font-bold">
          <div className="w-1/2 mr-2 bg-blue-400 rounded-md p-2 pl-8">PERSONAL INFORMATION</div>
          <div className="w-1/2 ml-2 bg-blue-400 rounded-md p-2 pl-8">CONTACT INFORMATION</div>
        </div>
        <div className="flex mt-4">
          <div className="bg-white rounded-lg w-1/2 mr-2 p-8 shadow-md">
            {/* <div className="text-white font-bold bg-blue-400 rounded-md p-2 mb-8">
              PERSONAL DETAILS
            </div> */}
            <WriteField fields={formFields.slice(3,9)} formData={formData} handleChange = {handleChange} labelStyle={"w-2/6"} keyStyle={"mb-2"} inputStyle={"w-4/6"}/>
          </div>
          <div className="bg-white rounded-lg w-1/2 ml-2 p-8 shadow-md">
            <WriteField fields={formFields.slice(9,15)} formData={formData} handleChange = {handleChange} labelStyle={"w-2/6"} keyStyle={"mb-2"} inputStyle={"w-4/6"}/>
          </div>
        </div>
        <div className="flex mt-4 text-white font-bold">
          <div className="w-1/2 mr-2 bg-blue-400 rounded-md p-2 pl-8">MASTER'S INFORMATION</div>
          <div className="w-1/2 ml-2 bg-blue-400 rounded-md p-2 pl-8">ADDITIONAL INFORMATION</div>
        </div>
        <div className="flex mt-4">
          <div className="bg-white rounded-lg w-1/2 mr-2 p-8 shadow-md">
            {/* <div className="text-white font-bold bg-blue-400 rounded-md p-2 mb-8">
              PERSONAL DETAILS
            </div> */}
            <WriteField fields={formFields.slice(15,23)} formData={formData} handleChange = {handleChange} labelStyle={"w-2/6"} keyStyle={"mb-2"} inputStyle={"w-4/6"}/>
          </div>
          <div className="bg-white rounded-lg w-1/2 ml-2 p-8 shadow-md">
            <WriteField fields={formFields.slice(23,24)} formData={formData} handleChange = {handleChange} labelStyle={"w-2/6"} keyStyle={"mb-2"} inputStyle={"w-4/6"}/>
            <WriteField fields={formFields.slice(24,28)} formData={formData} handleChange = {handleChange} labelStyle={"w-3/5"} keyStyle={"mb-2"} inputStyle={"w-2/5"}/>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-8 tracking-widest"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </>
    
  );
}

export default Form;
