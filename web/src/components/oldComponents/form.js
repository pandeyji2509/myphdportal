import * as React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAppContext } from "../../context/context";

function Form({ onLoginClick, handleSetOtp }) {
  const { createSession } = useAppContext();
  // console.log(obj);

  const [error, setError] = useState({
    email: "",
  });

  const registerUser = async (body) => {
    try {
      console.log(process.env.REACT_APP_SERVER_ENDPOINT);
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/signup`,
        body
      );
      console.log(res);
      if (res.status === 200) {
        createSession({ accessToken: res.data.accessToken, _id: res.data.userObj._id });
        handleSetOtp(true);
      }
    } catch (error) {
      console.log(error);
      setError((prevstate) => {
        return { ...prevstate, email: error.response.data.message };
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      department: "",
      email: "",
      password: "",
      confirmPassword: "",
      subject: "",
      faculty: "",
      firstName: "",
      lastName: "",
      gender: "",
      fatherName: "",
      motherName: "",
      mobileNumber: "",
      permaddress: "",
      localaddress: "",
      aadhar: "",
      telNumber: "",
      state: "",
      regNumber: "",
    },
    onSubmit: () => {
      console.log("submitting", formik.values);
      // console.log(formik.errors);
      registerUser(formik.values);
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Password is Required"),
      confirmPassword: Yup.string()
        .required("Confirmation for Password is Required")
        .test(
          "must be same",
          "Password are not matching",
          (value, ctx) => value === ctx.parent.password
        ),
    }),
  });

  // console.log(error.email.length > 0, error.email);

  return (
    // <div className="bg-cover bg-center h-screen flex items-center justify-center bg-[url('../public/gandhibhawan.jpg')]">
    //   <div className="bg-black/[.4] h-full w-full flex pt-16 sm:pt-0 sm:items-center justify-center">
    <div className="bg-white rounded-lg w-full p-8">
      <div className="flex justify-end px-12">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={onLoginClick}
        >
          Already registered? Login
        </button>
      </div>
      <div className="mb-4 flex px-20 items-center text-center justify-center">
        <div className='bg-[url("../public/pu-logodark.png")] bg-contain bg-no-repeat bg-center h-24 w-24 '></div>
        <div className="p-6 text-center justify-center">
          <div className="text-3xl font-bold mb-2">Application Form</div>
        </div>
      </div>
      <div className="border-b border-gray-300 mb-2 mx-12"></div>
      <div className="text-gray-500 font-bold text-center px-12">
        Application form for Registration as a candidate for the degree of Doctor of Philosophy
      </div>
      <div className="border-b border-gray-300 mt-2 mb-8 mx-12"></div>
      <form onSubmit={formik.handleSubmit} className="px-12">
        <div className="mb-4 flex items-center">
          <label
            htmlFor="department"
            className="text-gray-700 font-bold w-1/4 mr-4 items-center"
          >
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Faculty of Engineering & Technology"
            value={formik.values.department}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="subject" className="text-gray-700 items-center font-bold w-1/4 mr-4">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Computer Science"
            value={formik.values.subject}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="faculty" className="text-gray-700 items-center font-bold w-1/4 mr-4">
            Faculty
          </label>
          <input
            type="text"
            id="faculty"
            name="faculty"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Faculty"
            value={formik.values.faculty}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div className="text-white font-bold mt-8 bg-blue-400 rounded-md p-2 mb-8">
          PERSONAL DETAILS
        </div>
        {/* <div className="border-b border-gray-300 mt-2 mb-8"></div> */}
        <div className="mb-4 flex">
          <label htmlFor="firstName" className="text-gray-700 font-bold mb-2 w-1/4 mr-4">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="John"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div className="mb-4 flex">
          <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2 w-1/4 mr-4">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Doe"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div className="mb-4 flex">
          <label htmlFor="gender" className="block text-gray-700 font-bold mb-2 w-1/4 mr-4">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formik.values.gender}
            onChange={formik.handleChange}
            required
          >
            <option value="">--Select--</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4 flex">
          <label
            htmlFor="fatherName"
            className="block text-gray-700 font-bold mb-2 w-1/4 mr-4"
          >
            Father's Name
          </label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="John Doe Sr."
            value={formik.values.fatherName}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div className="mb-4 flex">
          <label
            htmlFor="motherName"
            className="block text-gray-700 font-bold mb-2 w-1/4 mr-4"
          >
            Mother's Name
          </label>
          <input
            type="text"
            id="motherName"
            name="motherName"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Jane Doe"
            value={formik.values.motherName}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div className="text-white font-bold mt-8 bg-blue-400 rounded-md p-2 mb-8">
          ADDITIONAL DETAILS
        </div>

        <div className="mb-4 flex">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2 w-1/4 mr-4">
            Permanent Address
          </label>
          <textarea
            id="permaddress"
            name="permaddress"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="1234 Main St, Anytown, USA"
            rows="4"
            value={formik.values.permaddress}
            onChange={formik.handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-4 flex">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2 w-1/4 mr-4">
            Local Address
          </label>
          <textarea
            id="localaddress"
            name="localaddress"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="1234 Main St, Anytown, USA"
            rows="4"
            value={formik.values.localaddress}
            onChange={formik.handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-4 flex">
          <label htmlFor="aadhar" className="text-gray-700 font-bold mb-2 w-1/4 mr-4">
            Aadhar Number
          </label>
          <input
            type="text"
            id="aadhar"
            name="aadhar"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="1234 5678 9012"
            value={formik.values.aadhar}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div className="mb-4 flex">
          <label htmlFor="telNumber" className="block text-gray-700 font-bold mb-2 w-1/4 mr-4">
            Tel Number
          </label>
          <input
            type="text"
            id="telNumber"
            name="telNumber"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="81XXXXXXXX"
            value={formik.values.telNumber}
            onChange={formik.handleChange}
            required
          />
        </div>

        <div className="mb-4 flex">
          <label
            htmlFor="mobileNumber"
            className="block text-gray-700 font-bold mb-2 w-1/4 mr-4"
          >
            Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="99XXXXXXXX"
            value={formik.values.mobileNumber}
            onChange={formik.handleChange}
            required
          />
        </div>

        <div className="mb-4 flex">
          <label htmlFor="state" className="text-gray-700 font-bold mb-2 w-1/4 mr-4">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Chandigarh"
            value={formik.values.state}
            onChange={formik.handleChange}
            required
          />
        </div>

        <div className="mb-4 flex">
          <label htmlFor="email" className="text-gray-700 font-bold mb-2 w-1/4 mr-4">
            Email ID
          </label>

          <div className="flex flex-col w-3/4">
            <input
              type="email"
              id="email"
              name="email"
              className={`shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                error.email && error.email.length > 0
              }`}
              placeholder="john.doe@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              required
            />

            <small>{error.email && error.email.length > 0 && error.email}</small>
          </div>
        </div>

        <div className="mb-4 flex">
          <label htmlFor="regNumber" className="block text-gray-700 font-bold mb-2 w-1/4 mr-4">
            Registration Number (if any)
          </label>
          <input
            type="text"
            id="regNumber"
            name="regNumber"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="36920000501"
            value={formik.values.regNumber}
            onChange={formik.handleChange}
            required
          />
        </div>

        <div className="text-white font-bold mt-8 bg-blue-400 rounded-md p-2 mb-8">
          PASSWORD
        </div>

        <div className="mb-4 flex">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2 w-1/4 mr-4">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            // placeholder="36920000501"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
          />
        </div>

        <div className="mb-4 flex">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-bold mb-2 w-1/4 mr-4"
          >
            Confirm Password
          </label>

          <div className="flex flex-col w-3/4">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword &&
                "bg-red-100 border-2 border-red-300"
              }`}
              // placeholder="36920000501"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              required
            />
            <small>
              {formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword) &&
                formik.errors.confirmPassword}
            </small>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    //   </div>
    // </div>
  );
}

export default Form;
