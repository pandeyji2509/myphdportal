const ResetPass = () => {

    return (  
        <div className="w-full mx-auto mt-16">
            <div className="bg-white rounded px-20 py-10">
                <div className="font-bold text-center text-3xl">Reset Password</div>
                <div className="mt-10 text-center text-lg text-gray-600">Enter the email associated with your account and we'll send an email with instructions to reset your password.</div>
                <div className="my-10">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                        Email Address
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 my-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                </div>
                
                <div className="w-full justify-center text-center flex">
                   <div className="font-semibold text-center justify-center text-lg shadow-md bg-blue-500 text-white p-1 w-full rounded-md cursor-pointer hover:bg-blue-400">Send Instructions</div>
                </div>
                
            </div>
        </div>
    );
}
 
export default ResetPass;
