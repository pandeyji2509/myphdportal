import { useState, useRef } from "react";
import classNames from "classnames";
import axios from "axios";
import { useAppContext } from "../context/context";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const { state } = useAppContext();
  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    if (isNaN(e.target.value)) return;
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value !== "") {
      if (index === otp.length - 1) {
        inputRefs.current[index].blur();
      } else {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index !== 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .slice(0, 4 - otp.filter(Boolean).length)
      .split("");
    const newOtp = [...otp];
    let currentDigitIndex = inputRefs.current.findIndex(
      (ref) => ref === document.activeElement
    );
    for (let i = 0; i < 4; i++) {
      if (currentDigitIndex > -1 && i >= currentDigitIndex) {
        newOtp[i] = pastedData.shift();
      } else if (!newOtp[i]) {
        newOtp[i] = pastedData.shift();
      }
    }
    setOtp(newOtp);
  };

  const handleClick = (index) => {
    inputRefs.current[index].focus();
  };

  const handleSubmit = async () => {
    // console.log(state, obj);
    const body = { id: state._id, otp: otp.join("") };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/verifyOtp`,
        body
      );

      // console.log(res);
      if (res.status === 200) {
        console.log("working");
        return navigate("/dashboard");
      }
    } catch (error) {}
  };

  console.log(otp.join(""));

  return (
    <div className="font-['Poppins'] w-full mx-auto mt-16">
      <div className="bg-white rounded px-20 pt-12">
        <div className="font-semibold text-center text-3xl">Verification</div>
        <div className='my-4 bg-[url("../public/otp.png")] bg-contain bg-no-repeat bg-center h-48'></div>
        <div className="font-semibold text-center text-xl text-gray-600">
          Enter the verification code we just sent on your email address.
        </div>
        <div className="flex my-8 items-center justify-center">
          {otp.map((data, index) => (
            <input
              type="text"
              name="otp"
              maxLength="1"
              className={classNames(
                "otp-input border-2 w-14 h-14 mx-2 rounded-lg text-center text-2xl focus:outline-none",
                {
                  "otp-input-active": document.activeElement === inputRefs.current[index],
                }
              )}
              value={data}
              key={index}
              onFocus={() => handleClick(index)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <div className="flex text-center justify-center mb-8">
          <div className="font-semibold text-center text-md text-gray-400 mr-2">
            If you didn't receive a code!
          </div>
          <div className="font-semibold text-center text-md text-red-600 cursor-pointer">
            Resend
          </div>
        </div>
        <div className="w-full justify-center text-center flex">
          <div
            className="font-semibold text-center justify-center text-2xl shadow-md bg-blue-500 text-white p-1 w-2/5 rounded-full cursor-pointer hover:bg-blue-400"
            onClick={handleSubmit}
          >
            Verify
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
