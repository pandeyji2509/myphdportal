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
function NoticeBoard2() {

    const showPdf = data.map(pdf =>{
        return(
            <>
            <ul className='hover:text-red-600 text-blue-700'><li className='list-disc list-inside ml-6'><a target='_blank' href={pdf.pdf}>Notice {pdf.index}- Some Subject's PDF</a></li></ul>
            </>
        )
    })
  return (
    <>
    <div className='h-screen w-full flex justify-center items-center bg-gb bg-no-repeat bg-cover'>
        <div className='h-1/3 w-3/12 bg-gray-200 shadow-lg'>
        <div className=' text-white h-8 bg-[#181c2c] w-full flex justify-between'>
            <div className='text-xl ml-2'>Important Notices</div>
            <Link to='/notice-page'><div className='mr-2 mt-1 text-sm'>View all</div></Link>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-6">{showPdf}</div>
        </div>
    </div>
    </>
  )
}

export default NoticeBoard2
