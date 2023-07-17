import React, { useContext } from 'react';
import { DarkModeContext } from '../../../context/DarkModeContext';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Greeting = () => {
    const [greeting, setGreeting] = useState("");
    const { darkMode } = useContext(DarkModeContext);
    const {user} = useSelector(state => state.user);
    var Name = "Student";
    if(user){
        Name = user.firstName + " " + user.lastName;
    }
    useEffect(() => {
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

        <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white shadow-md"} p-4 w-full rounded-md mb-4`}>
                    <h2 className="text-2xl font-bold mb-4">{greeting}! {Name}</h2>
                    <p className ={`${darkMode ? "text-gray-400" : ""}`}>Student Dashboard</p>
        </div>
     );
}
 
export default Greeting;