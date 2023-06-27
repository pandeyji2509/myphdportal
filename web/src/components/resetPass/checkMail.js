const CheckMail = () => {

    return (  
        <div className="w-full mx-auto ">
            <div className="bg-white rounded px-20 py-10">
                <div className='my-4 bg-[url("../public/mailsent.png")] bg-contain bg-no-repeat bg-center h-48'></div>
                <div className="font-bold text-center text-3xl">Check you mail</div>
                <div className="mt-10 text-center text-lg text-gray-600">We have sent a password recover instructions to your email</div>
                <div className="mt-10 text-center text-sm text-gray-600">
                    Did not receive the mail? Check your spam filter, or
                    <div className='cursor-pointer text-blue-700 font-semibold'>try another email address</div> 
                </div>
                
            </div>
        </div>
    );
}
 
export default CheckMail;
