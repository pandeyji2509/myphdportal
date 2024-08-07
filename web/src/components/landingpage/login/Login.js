import React, { useRef, useState } from 'react';
import { Button } from "@material-tailwind/react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/context";
import { message } from 'antd';
import axios from "axios";

function Login() {
  const { createSession } = useAppContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
        console.log(emailRef.current.value, passwordRef.current.value, roleRef.current.value);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/user/login`,
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          role: roleRef.current.value 
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        createSession({ accessToken: res.data.accessToken, _id: res.data.user._id });
        message.success("Log In Successful!");
        console.log("access", res.data.accessToken);
        if(roleRef.current.value === "student") {
          return navigate("/student");
        }
        else {
          return navigate("/admin");
        }
      } else {
        message.error(res.data.message);
      }

    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full mx-auto">
      <div className="rounded-lg mt-24 bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-6 relative flex items-center border-b-2 border-gray-400 rounded-b-md">
          <span className="absolute left-4 text-gray-700"><FaUser className="h-3 w-3" /></span>
          <input
            className="h-12 bg-gray-100 rounded w-full py-2 px-10 text-sm font-semibold text-gray-900 pl-10"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            ref={emailRef}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="mb-6 relative flex items-center border-b-2 border-gray-400 rounded-b-md">
          <span className="absolute left-4 text-gray-700"><FaLock className="h-3 w-3" /></span>
          <input
            className="h-12 bg-gray-100 rounded w-full py-2 px-10 text-sm font-semibold text-gray-900 pl-10"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            ref={passwordRef}
            onKeyDown={handleKeyDown}
          />
          <button onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none">
            {showPassword ? <MdVisibilityOff className="h-5 w-5" /> : <MdVisibility className="h-5 w-5" />}
          </button>
        </div>
        <div className="mb-6 relative">
          <select
            className="bg-gradient-to-r from-blue-500 to-blue-50 text-sm shadow-md h-12 rounded w-full py-2 px-3 pr-8 font-bold text-white focus:outline-none focus:shadow-outline appearance-none"
            id="role"
            name="role"
            ref={roleRef}
          >
            <option value="student">Student</option>
            <option value="department">Department</option>
            <option value="admin">R&S / DUI</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <a
            className="font-bold text-sm text-blue-500 hover:text-blue-700"
            href="/"
          >
            Forgot Password?
          </a>
        </div>
        <div className="mt-6">
          <Button className='w-full text-md bg-blue-500 hover:bg-blue-600' onClick={handleSubmit}>LOG IN</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
