import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/context";

function LoginCard({ onSignUpClick, handleSetOtp }) {
  const { createSession } = useAppContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  // console.log(state);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/login`,
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(res);

      if (res.status === 200) {
        // console.log("working");
        createSession({ accessToken: res.data.accessToken, _id: res.data.user._id });
        if (res.data.user.verified) {
          return navigate("/dashboard");
        } else handleSetOtp(true);
      }

      console.log(res);
    } catch (error) {}
  };

  return (
    <div className="w-full mx-auto">
      <div className="bg-white rounded px-20 pt-12">
        <div className="h-full mb-8">
          <div className='bg-[url("../public/pu-logodark.png")] bg-contain bg-no-repeat bg-center h-40'></div>
        </div>
        <div className="text-center">
          <h1 className="font-bold text-3xl mb-8">Student Portal</h1>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="text"
            placeholder="Enter your username"
            ref={emailRef}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            ref={passwordRef}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/"
            >
              Forgot Password?
            </a>
          </div>
          <div
            onClick={onSignUpClick}
            className="inline-block cursor-pointer  align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            No account? Register
          </div>
        </div>
        <div className="mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            LOG IN
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
