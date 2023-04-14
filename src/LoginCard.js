import React from 'react';

function LoginCard({ onSignUpClick }) {
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
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
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
          <div onClick={onSignUpClick} className="inline-block cursor-pointer  align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            
              No account? Register

          </div>
        </div>
        <div className="mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            LOG IN
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
