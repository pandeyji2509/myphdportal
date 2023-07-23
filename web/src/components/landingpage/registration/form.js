import React, { useState } from 'react';
import FileUploadComponent from './FileUploadComponent';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../../../context/context'
import { faculties, departmentOptions, stateOptions, masterDegreeOptions, eligibilityTestOptions, masterYearOptions, genderOptions} from '../../../constants/formConstants';

function WriteField({ fields, keyStyle, labelStyle, inputStyle, formik }) {
  return (
    <>
      {fields.map((field) => (
        <div key={field.name} className={`flex ${keyStyle} items-center`}>
          <label htmlFor={field.name} className={`text-gray-700 font-bold ${labelStyle} mr-4 items-center`}>
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              className={`shadow appearance-none border rounded ${inputStyle} py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              required
            >
              <option value="">Select {field.label}</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              className={`shadow appearance-none border rounded ${inputStyle} py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder={field.placeholder}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              required
            />
          )}
        </div>
      ))}
    </>
  );
}

function Form() {
  const { createSession } = useAppContext();

  const [error, setError] = useState({
    email: '',
  });

  // const registerUser = async (body) => {
  //   try {
  //     console.log(process.env.REACT_APP_SERVER_ENDPOINT);
  //     const res = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/signup`, body);
  //     console.log(res);
  //     if (res.status === 200) {
  //       createSession({ accessToken: res.data.accessToken, _id: res.data.userObj._id });
  //       handleSetOtp(true);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setError((prevstate) => {
  //       return { ...prevstate, email: error.response.data.message };
  //     });
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      faculty: '',
      department: '',
      subject: '',
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
      masterDegree: '',
      masterYear: '',
      masterUniversity: '',
      masterDivision: '',
      masterMarks: '',
      masterPercent: '',
      masterSubject: '',
      masterRollNo: '',
      eligibilityTest: '',
      regNumber: '',
      researchDep: '',
      employed: '',
      employerDetails: '',
    },
    onSubmit: () => {
      console.log('submitting', formik.values);
      // console.log(formik.errors);
      // registerUser(formik.values);
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
  });

  const formFields = [
    { label: 'Faculty', name: 'faculty', placeholder: 'Select Faculty', type: 'select', options: faculties },
    {
      label: 'Department',
      name: 'department',
      placeholder: 'Select Department',
      type: 'select',
      options: departmentOptions[formik.values.faculty] || [],
      disabled: !formik.values.faculty,
    },
    { label: 'Subject', name: 'subject', placeholder: 'Subject', type: 'text' },
    { label: 'First Name', name: 'firstName', placeholder: 'First Name', type: 'text' },
    { label: 'Last Name', name: 'lastName', placeholder: 'Last Name', type: 'text' },
    { label: 'Gender', name: 'gender', placeholder: 'Select Gender', type: 'select', options: genderOptions },
    { label: "Father's Name", name: 'fatherName', placeholder: "Father's Name", type: 'text' },
    { label: "Mother's Name", name: 'motherName', placeholder: "Mother's Name", type: 'text' },
    { label: 'Mobile Number', name: 'mobileNumber', placeholder: 'Mobile Number', type: 'text' },
    { label: 'Permanent Address', name: 'permaddress', placeholder: 'Permanent Address', type: 'text' },
    { label: 'Local Address', name: 'localaddress', placeholder: 'Local Address', type: 'text' },
    { label: 'Aadhar Number', name: 'aadhar', placeholder: 'Aadhar Number', type: 'text' },
    { label: 'Telephone', name: 'telNumber', placeholder: 'Telephone', type: 'text' },
    { label: 'State', name: 'state', placeholder: 'Select State', type: 'select', options: stateOptions },
    { label: 'Email', name: 'email', placeholder: 'Email', type: 'text' },
    { label: "Master's Degree", name: 'masterDegree', placeholder: "Select", type: 'select', options: masterDegreeOptions },
    { label: 'Year', name: 'masterYear', placeholder: 'Select', type: 'select', options: masterYearOptions },
    { label: 'University', name: 'masterUniversity', placeholder: 'University', type: 'text' },
    { label: 'Division', name: 'masterDivision', placeholder: 'Division', type: 'text' },
    { label: 'Marks Obtained', name: 'masterMarks', placeholder: 'Marks Obtained', type: 'text' },
    { label: 'Percentage', name: 'masterPercent', placeholder: 'Percentage', type: 'text' },
    { label: 'Subject', name: 'masterSubject', placeholder: 'Subject', type: 'text' },
    { label: 'Roll No', name: 'masterRollNo', placeholder: 'Roll No', type: 'text' },
    { label: 'Eligibility Test', name: 'eligibilityTest', placeholder: 'Select', type: 'select', options: eligibilityTestOptions },
    { label: 'Registration No. (if any) of Panjab University', name: 'regNumber', placeholder: 'Registration No.', type: 'text' },
    { label: 'Department where research work will be carried out', name: 'researchDep', placeholder: 'Select Research Department', type: 'select', options: departmentOptions[formik.values.faculty] || [] },
    { label: 'Whether employed?', name: 'employed', placeholder: 'Select', type: 'select', options: ['Yes', 'No'] },
    { label: 'If yes, name and address of the Instruction/Organization', name: 'employerDetails', placeholder: 'Employer Details', type: 'text', disabled: formik.values.employed === 'No' },
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

      <form onSubmit={formik.handleSubmit} className="">
        {/* Form fields */}
        <div className="bg-white rounded-lg w-full p-8 shadow-md flex">
          <WriteField fields={formFields.slice(0, 1)} labelStyle="w-fit" keyStyle="w-1/3 justify-start" inputStyle="w-3/4" formik={formik}/>
          <WriteField fields={formFields.slice(1, 3)} labelStyle="w-fit" keyStyle="w-1/3 justify-end" inputStyle="w-3/4" formik={formik}/>
        </div>
        <div className="flex mt-4 text-white font-bold">
          <div className="w-1/2 mr-2 bg-blue-400 rounded-md p-2 pl-8">PERSONAL INFORMATION</div>
          <div className="w-1/2 ml-2 bg-blue-400 rounded-md p-2 pl-8">CONTACT INFORMATION</div>
        </div>
        <div className="flex mt-4">
          <div className="bg-white rounded-lg w-1/2 mr-2 p-8 shadow-md">
            <WriteField fields={formFields.slice(3, 9)} labelStyle="w-2/6" keyStyle="mb-2" inputStyle="w-4/6" formik={formik}/>
          </div>
          <div className="bg-white rounded-lg w-1/2 ml-2 p-8 shadow-md">
            <WriteField fields={formFields.slice(9, 15)} labelStyle="w-2/6" keyStyle="mb-2" inputStyle="w-4/6" formik={formik} />
          </div>
        </div>
        <div className="flex mt-4 text-white font-bold">
          <div className="w-1/2 mr-2 bg-blue-400 rounded-md p-2 pl-8">MASTER'S INFORMATION</div>
          <div className="w-1/2 ml-2 bg-blue-400 rounded-md p-2 pl-8">ADDITIONAL INFORMATION</div>
        </div>
        <div className="flex mt-4">
          <div className="bg-white rounded-lg w-1/2 mr-2 p-8 shadow-md">
            <WriteField fields={formFields.slice(15, 23)} labelStyle="w-2/6" keyStyle="mb-2" inputStyle="w-4/6" formik={formik}/>
          </div>
          <div className="bg-white rounded-lg w-1/2 ml-2 p-8 shadow-md">
            <WriteField fields={formFields.slice(23, 29)} labelStyle="w-2/6" keyStyle="mb-2" inputStyle="w-4/6" formik={formik}/>
          </div>
        </div>
        <div className="flex mt-4 text-white font-bold bg-blue-400 rounded-md p-2 pl-8">DOCUMENTS UPLOAD</div>
        <div className="mt-4 bg-white rounded-lg w-full px-8 py-4 shadow-md overflow-hidden">
          <FileUploadComponent />
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
