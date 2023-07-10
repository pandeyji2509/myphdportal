import React from 'react'
import pdf1 from '../documents/chem.pdf.pdf'
import pdf2 from '../documents/phy.pdf.pdf'
import pdf3 from '../documents/Maths.pdf.pdf'
import pdf4 from '../documents/pfps.pdf.pdf'
import { Link } from 'react-router-dom'


const data =[
  {
    pdf:pdf1,
    index:1
  },
  {
    pdf:pdf2,
    index:2
  },
  {
    pdf:pdf3,
    index:3
  },
  {
    pdf:pdf4,
    index:4
  }
];


function Noticeboard() {
  const showPdf = data.map( pdf => {
    return (
    <><div className='hover:text-red-600 hover:decoration-red-600 decoration-[#181c2c] underline'><a target='_blank' href={pdf.pdf}>Notice {pdf.index}- Some Subject's PDF</a></div>
    <hr className="w-full h-px   bg-gray-400 border-0 rounded" />
    </>
    )
  })
  return (
    <>
    <div className='h-screen w-full flex justify-center items-center'>
       <div className='h-1/2 w-3/12 bg-gray-100 border-gray-400 border-4 rounded-lg grid grid-cols-1 shadow-lg'>
         <div className='font-md text-2xl font-bold text-[#181c2c]mt-2 mx-4 text-center my-auto'>Important Notices</div>
         <hr className="w-full h-1  bg-gray-400 border-0 rounded" />
         <div className='mx-4 my-4 text-[#181c2c] text-xl'>
          <div className="grid grid-cols-1 gap-4 ">{showPdf}</div>
         {/*{<div className='hover:text-red-600 hover:decoration-red-600 decoration-[#181c2c] underline'><a target='_blank' href={data[0]}>Notice 1- Some Subject's PDF</a></div>}*/}
         {/*{<div className='hover:text-red-600 hover:decoration-red-600 decoration-[#181c2c] underline'><a target='_blank' href={data[1]}>Notice 2- Some Subject's PDF</a></div>
         <div className='hover:text-red-600 hover:decoration-red-600 decoration-[#181c2c] underline'><a target='_blank' href={data[2]}>Notice 3- Some Subject's PDF</a></div>
         <div className='hover:text-red-600 hover:decoration-red-600 decoration-[#181c2c] underline'><a target='_blank' href={data[3]}>Notice 4- Some Subject's PDF</a></div>}*/}
         </div>
         <Link to="/notice-page"><div className='mx-4 text-[#181c2c] hover:text-white text-center bg-gray-400 hover:bg-[#181c2c]'>View More</div></Link>   
        </div>
    </div>
    </>
  )
}

export default Noticeboard
