import React from 'react';
import {Button} from "@material-tailwind/react";
import { MdAdminPanelSettings } from "react-icons/md";

function LoginCard({ onAdminClick }) {
  return (
    <div className=" font-['IBM_Plex_Sans'] w-full  mx-auto">

      <div className="text-3xl drop-shadow-md text-white font-bold justify-center flex py-4">
                Student Portal
      </div>
      <div className="px-8 pb-8"><hr className="border-white" /></div>



      <div className="rounded-2xl bg-[#f8f4fc]  p-6">

        <div className="mb-4">
          <label className="block font-bold text-sm mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="bg-white shadow-sm h-12 rounded w-full py-2 px-3 text-gray-600 focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-8">
          <label className="block font-bold text-sm mb-2" htmlFor="password">
            Password
          </label>
          <input
            className=" bg-white shadow-sm h-12 rounded w-full py-2 px-3 text-gray-600 focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className='items-center flex'>
            <a
              className=" items-`center` font-bold text-sm text-blue-400 hover:text-blue-700"
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
        <div className="py-4 text-gray-300 font-bold">For Office Use Only</div>
        <div className="flex justify-center">
          <Button className="flex items-center gap-3 bg-gray-500 hover:bg-gray-600 text-sm" onClick={onAdminClick}>
            <MdAdminPanelSettings className='h-5 w-5'/> DEPARTMENT LOGIN
          </Button>
        </div>
    </div>
  );
}

export default LoginCard;
