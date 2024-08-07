import { useState } from 'react';

const CreateNewPass = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check that passwords match and are at least 8 characters long
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
    } else if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
    } else {
      // Submit the form
      // TODO: Add code to submit the form
    }
  };

  return (
    <div className="w-full mx-auto mt-16">
      <div className="bg-white rounded px-20 py-10">
        <div className="font-bold text-center text-3xl">Create New Password</div>
        <div className="mt-10 text-center text-lg text-gray-600">Your new password must be different from previous used passwords.</div>
        <form className="my-10" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-bold mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 my-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className='mt-5'>
            <label className="block text-gray-700 font-bold mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 my-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div className="w-full justify-center text-center flex mt-10">
            <div className="font-bold text-center justify-center shadow-md bg-blue-500 text-white p-1 w-full rounded-md cursor-pointer hover:bg-blue-600" onClick={handleSubmit}>Reset Password</div>
          </div>
        </form>
        {errorMessage && (
          <div className="text-center text-red-500 mt-4">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};
 
export default CreateNewPass;
