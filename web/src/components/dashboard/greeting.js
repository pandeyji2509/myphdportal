import React, { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';
import { useState, useEffect } from "react";

const Greeting = () => {
    const [greeting, setGreeting] = useState("");
    const { darkMode } = useContext(DarkModeContext);

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
                    <h2 className="text-2xl font-bold mb-4">{greeting}! Nitin</h2>
                    <p className ={`${darkMode ? "text-gray-400" : ""}`}>Welcome to your dashboard. Here you can see an overview of your account.</p>
        </div>
     );
}
 
export default Greeting;