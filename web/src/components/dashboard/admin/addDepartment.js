import React, { useState } from 'react';
import { useFormik } from 'formik';
import {message} from 'antd';
import axios from "axios";

function AddDepartment() {

  const registerDep = async (body) => {
    console.log("inside");
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/admin/addDep`,
            body
          );
        
          console.log(res);
          if (res.data.success) {
            message.success(res.data.message);
          }
          else
          {
            message.error(res.data.message);
          }
      } catch (error) {
        console.log(error);
      }
  };
  const formik = useFormik({
    initialValues: {
      faculty: '',
      depName: '',
      depEmail: '',
      name: '',
      email: '',
      subjects: '',
      username:'',
      password: '',
    },
    onSubmit: () => {
      console.log('submitting', formik.values);
      registerDep(formik.values);
    },
  });

  const formFields = [
    { label: 'Faculty', name: 'faculty', placeholder: 'Faculty', type: 'text' },
    { label: 'Department Name', name: 'depName', placeholder: 'Department Name', type: 'text' },
    { label: 'Department Email', name: 'depEmail', placeholder: 'Department Email', type: 'text' },
    { label: 'Admin Name', name: 'name', placeholder: 'Admin Name', type: 'text' },
    { label: 'Admin Email', name: 'email', placeholder: 'email', type: 'text' },
    { label: 'Subjects', name: 'subjects', placeholder: 'Subjects', type: 'text' },
    { label: 'Password', name: 'password', placeholder: 'Choose Password', type: 'text' },
    { label: 'Username', name: 'username', placeholder: 'Choose Username', type: 'text' },
    
  ];

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="">
        <div className="p-8">
          <div className="bg-white rounded-lg w-full p-8 shadow-md">
            {formFields.map((field) => (
                <div key={field.name} className={`flex mb-2 items-center`}>
                <label htmlFor={field.name} className={`text-gray-700 font-bold w-1/6 mr-4 items-center`}>
                    {field.label}
                </label>
                    <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    placeholder={field.placeholder}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    required
                    />
                </div>
            ))}
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
  
  export default AddDepartment;
