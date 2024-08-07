import React, { useContext } from 'react';
import { DarkModeContext } from '../../../context/DarkModeContext';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import  axios  from 'axios';
const Greeting = () => {
    const [greeting, setGreeting] = useState("");
    const { darkMode } = useContext(DarkModeContext);
    const {user} = useSelector(state => state.user);
    const [student,setStudents]=useState();
    const [stuImg,setImg]=useState();
    var Name = "Student";
    if(user){
        Name = user.firstName + " " + user.lastName;
    }
    const viewLink = async (id) => {
        console.log("MOM ID", id);
        try {
          console.log(id);
          const { data } = await axios.post(
            `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/student/viewfile`,
            {id : id}
          );
          console.log("data",data);
          setImg(data.filelink);
        // window.open(data.filelink, '_blank');
          console.log("Link ", data.filelink);
        } catch (error) {
          console.error('Error fetching link:', error);
        }
      };
      
      const getAllStudents = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/student/getAllStudents`);
          console.log("aa",response.data.stu);
          setStudents(response.data.stu);
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };
      useEffect(()=>{
        // console.log(student[0].photo);
        if(student)
        viewLink(student[0].photo)
      },[student])
    console.log("user",student);

    useEffect(() => {
        getAllStudents();
        const now = new Date();
        const currentHour = now.getHours();   
        if (currentHour >= 5 && currentHour < 12) {
        setGreeting("Good morning");
        } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting("Good afternoon");
        } else {
        setGreeting("Good evening");
        }
    }, []);
    

    return ( 
        <div>
        {setImg?(
        <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white shadow-md"} p-4 w-full rounded-md mb-4`}>
                    <h2 className="text-2xl font-bold mb-4">{greeting}! {Name}</h2>
                    <p className ={`${darkMode ? "" : "text-xl font-bold mb-4"}`}>Student Dashboard</p>
                    <div className='flex flex-wrap'>
                    <div className='flex'>
                      <p className='font-bold mb-4'> Department: </p>
                      <p className='ml-2'> {student?student[0].department:""}</p>
                    </div>                   
                        {student? <img className="ml-auto" src={stuImg} alt="student" width="100" height="100"/>:""}
                    </div>
        </div>)
        :""}
        </div>
     );
}
 
export default Greeting;