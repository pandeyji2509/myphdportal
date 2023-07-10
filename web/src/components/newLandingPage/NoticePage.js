import React from 'react'
import Navbar from './Navbar'
import PUimage from '../images/pu-logodark.png'
import pdf1 from '../documents/chem.pdf.pdf'
import pdf2 from '../documents/phy.pdf.pdf'
import pdf3 from '../documents/Maths.pdf.pdf'
import pdf4 from '../documents/pfps.pdf.pdf'
import pdf5 from '../documents/css.pdf.pdf'
import pdf6 from '../documents/syllabus.pdf'

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
  },
  {
    pdf:pdf5,
    index:5
  },
  {
    pdf:pdf6,
    index:6
  }
];

function NoticePage() {

  const showPdf = data.map(pdf =>{
    return(
        <>
        
          <ul className='hover:text-red-600 text-blue-700 text-md'>
          <li className='list-disc list-inside'><a href={pdf.pdf} target='_blank'>Notice-{pdf.index}</a></li>
          </ul>
          <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, fuga!</div>
        </>
    )
})
  return (
    <>
    <div className='h-screen w-full'>
      <div className='w-full bg-cover bg-no repeat h-screen bg-gb flex justify-center items-center'>
      
        <div className='bg-gray-200 h-1/2 w-1/2'>
        <div className='h-8 bg-[#181c2c] w-full'>
          <div className='text-white text-center font-bold text-xl'>Important Notices</div>
        </div>
        <div className='mt-2 ml-4'>{showPdf}</div>
        </div>
        </div>
      </div>
    
    </>
  )
}

export default NoticePage
