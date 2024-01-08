import React, { useState, useRef } from "react";
import { MdCloudUpload } from "react-icons/md";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import axios from "axios"; // Import Axios
import {message} from 'antd';

const FeeUpload = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
    };

    const handleRectangleClick = () => {
        fileInputRef.current.click();
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        setSelectedFiles(files);
    };

    const handleSubmit = async () => {
        const enrNum = document.getElementById("enrollmentNumber").value;
        console.log(enrNum);
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/uploadFee`, 
              {enrollmentNumber : enrNum, fee : selectedFiles[0]}, 
              {
                headers: {
                  "content-type": "multipart/form-data",
              },
            });

            if(res.data.error)
            {
                message.error(res.data.message);
            } else {
                message.success("Fee Receipt uploaded successfully!");
            }
          } catch (error) {
            message.error(error.response.data.message);
          }
    };

    return (
        <div className="font-['IBM_Plex_Sans'] p-12 flex flex-grow h-[88vh] bg-[#f8f4fc]">
            <div className="bg-white h-fit p-8 w-full rounded-md shadow-sm">
                <div className="text-xl pb-4 font-bold border-b-2 text-center">UPLOAD FEE RECEIPT</div>

                <div className={`text-gray-700 mt-8 font-bold items-center text-center`}>
                    Enrollment Number
                </div>
                
                <div className="flex justify-center mt-4">
                    <input
                    type="text"
                    id="enrollmentNumber"
                    name="enrollmentNumber"
                    className={`shadow appearance-none border rounded py-2 px-3 w-[20%] ml-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    required
                    />
                </div>
                
                <div className={`text-gray-700 mt-8 font-bold items-center text-center`}>
                    Upload the fee receipt
                </div>

                <div className="flex items-center px-4 mt-4">
                    <div
                        className="bg-gray-200 rounded-lg w-4/6 p-2 text-center cursor-pointer"
                        onClick={handleRectangleClick}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                        />
                        <label className="mb-4 flex cursor-pointer flex-col items-center justify-center text-gray-600 font-bold">
                        <MdCloudUpload className="h-8 w-8 mb-2 text-blue-500" />
                        <span className="text-lg font-bold">Click here to browse file</span>
                        </label>
                        <p className="text-gray-500">Drag and drop files here</p>
                    </div>
                    <div className="ml-4 w-2/6">
                        {selectedFiles.length > 0 ? (
                        <div className="bg-gray-100 rounded-lg py-4 px-4">
                            <h2 className="text-lg font-bold mb-7 text-center">Selected files</h2>
                            {selectedFiles.map((file) => (
                            <div className="flex items-center" key={file.name}>
                                <div className="w-1/5 flex justify-center">
                                {file.type.includes("image") ? (
                                    <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="h-8 w-8 mr-2 rounded"
                                    />
                                ) : (
                                    <BsFillFileEarmarkPdfFill className="h-7 w-8 mr-2 text-red-500" />
                                )}
                                </div>
                                <div className="w-3/5 flex items-center">{file.name}</div>
                                <div className="w-1/5 flex items-center text-end justify-end text-gray-500">
                                {formatFileSize(file.size)}
                                </div>
                            </div>
                            ))}
                        </div>
                        ) : (
                        <div className="bg-gray-100 rounded-lg pt-12 pb-11 px-4 text-center">
                            <p className="text-lg font-bold">No File Selected</p>
                        </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
                
            </div>
        </div>
    );
  };
   
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  export default FeeUpload;
  