import React, { useContext, useState, useEffect } from 'react';
import { DarkModeContext } from '../../../context/DarkModeContext';
import NoticeBoard from '../admin/NoticeBoard';
import axios from 'axios';

const MainBody = ({ onAddNew }) => {
    
    const [countFaculty, setCountFaculty] = useState(0);
    const [countDep, setCountDep] = useState(0);
    const [countStudent, setCountStudent] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const [facultyResponse, departmentResponse, studentResponse] = await Promise.all([
            axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/stats/countFaculty`),
            axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/stats/countDepartments`),
            axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/stats/countStudents`),
            ]);
            setCountFaculty(facultyResponse.data.count);
            setCountDep(departmentResponse.data.count);
            setCountStudent(studentResponse.data.count);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);
    
    const { darkMode } = useContext(DarkModeContext);

    return ( 
        <div className={`w-full flex mb-4 h-fit`}>
            <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white  shadow-md"} w-1/2 rounded-md mr-4`}>
                <h2 className="text-xl font-bold px-4 py-3">Enrollment Details</h2>
                <div className={`border-b ${darkMode ? "border-gray-500" : "border-gray-300"}`}>
                </div>
                <div className="flex w-full h-32 p-4 pb-0">
                    <div className={`${darkMode ? "bg-gray-700" : "bg-white shadow-md"} w-1/3 rounded-md px-4 py-2`}>
                        <div className="text-lg text-right font-semibold">Students</div>
                        <div className="text justify-end text-right text-5xl mt-3 font-bold text-blue-800">{countStudent}</div>
                    </div>
                    <div className={`${darkMode ? "bg-gray-700" : "bg-white shadow-md"} w-1/3 rounded-md px-4 py-2 mx-4`}>
                        <div className="text-lg text-right font-semibold">Faculty</div>
                        <div className="text justify-end text-right text-5xl mt-3 font-bold text-blue-800">{countFaculty}</div>
                    </div>
                    <div className={`${darkMode ? "bg-gray-700" : "bg-white shadow-md"} w-1/3 rounded-md px-4 py-2`}>
                        <div className="text-lg text-right font-semibold">Departments</div>
                        <div className="text justify-end text-right text-5xl mt-3 font-bold text-blue-800">{countDep}</div>
                    </div>
                </div>
            </div>
            <div className="h-fit w-1/2">
                <NoticeBoard onAddNew = {onAddNew}/>
            </div>
            
            
        </div> 
     );
}
 
export default MainBody;