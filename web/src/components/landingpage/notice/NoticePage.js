import React from "react";
import { NoticeData } from "../../../constants/NoticeData";

const NoticePage = () => {
    return (
        <div className="bg-white p-4 mx-4 rounded-md shadow-sm">
          {NoticeData.map((notice) => (
            <div key={notice.id} className="py-2 border-b-2">
              <a href={notice.link} target="_blank" rel="noreferrer"><div className="text-gray-600 hover:underline hover:text-blue-500">{notice.title}</div></a>
              <div className="text-right font-bold">{notice.date}</div>
            </div>
          ))} 
        </div>
    );
  };
   
  export default NoticePage;
  