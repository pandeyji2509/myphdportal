import React from 'react';
import { Button } from "@material-tailwind/react";
import { FaUserGraduate } from "react-icons/fa6";

function AdminLogin({ onStudentClick }) {
  return (
    <div className="w-full mx-auto font-bold">

        <div className="text-3xl drop-shadow-md text-white justify-center flex py-4">Admin Portal</div>
        <div className="px-8 pb-8"><hr className="border-white" /></div>

        <div className="rounded-2xl shadow-xl bg-blue-50 p-6">
        <div className="mb-4">
            <label className="block mb-2 text-sm" htmlFor="username">Username</label>
            <input
            className="shadow font-medium bg-white h-12 rounded w-full py-2 px-3 text-gray-600 focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            />
        </div>
        <div className="mb-8">
            <label className="block mb-2 text-sm" htmlFor="password">Password</label>
            <input
            className="shadow font-medium bg-white h-12 rounded w-full py-2 px-3 text-gray-600 focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            />
        </div>
        <div className="flex items-center justify-between">
            <div className='items-center flex'>
            <a
                className=" items-center font-bold text-sm text-blue-400 hover:text-blue-700"
                href="/"
            >
                Forgot Password?
            </a>
            </div>
        </div>

        <div className="mt-8">
            <Button className='w-full text-md hover:bg-blue-600'>LOG IN</Button>
        </div>
        </div>

        <div className="pt-8"><hr className="border-white" /></div>
        <div className="flex py-8 justify-center">
            <Button className="flex items-center gap-3 bg-gray-500 hover:bg-gray-600 text-sm" onClick={onStudentClick}>
            <FaUserGraduate className='h-5 w-5'/> STUDENT LOGIN
          </Button>
        </div>
        
    </div>
  );
}

export default AdminLogin;
