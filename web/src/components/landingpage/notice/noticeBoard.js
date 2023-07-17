import { NoticeData } from "../../../constants/NoticeData";

const NoticeBoard = () => {

    return (
        <div className="w-full  ">
            
            <div className="mx-4">
                {NoticeData.map((notice) => (
                    <div key={notice.id} className="py-2  border-b-2">
                        <div className="text-gray-600">{notice.title}</div>
                        <div className="text-right font-bold">{notice.date}</div>
                    </div>
                ))}
            </div>  
        </div>
    );
  };
   
  export default NoticeBoard;
  