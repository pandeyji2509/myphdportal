import React from 'react'

function Footer(props) {
  return (
    <>
    <div className='bg-[#181c2c] h-44 flex flex-row items-center cursor-pointer'>
        <img src={props.img} alt="" className='h-32 mx-4' />
        <div className='text-white'>
        <div className='font-bold text-xl'>Panjab University</div>
        <div>Chandigarh, India</div>
        <div>+91-(XXXXXXXXXX)</div>
        </div>
        <div className='flex space-x-36'>
        <div className='text-white flex flex-col ml-96'>
            <div className='text-lg underline cursor'>Resources</div>
            <div>PU News</div>
            <div>RTI</div>
            <div>University Forms</div>
            <div>Directorate of Sports</div>
        </div>
        <div className='text-white flex flex-col '>
            <div className='text-lg underline cursor'>Support and Services</div>
            <div>Public Relations</div>
            <div>SAIF /CIL /UCIM</div>
            <div>Publication Bureau</div>
            <div>Radio Station</div>
        </div>
        <div className='text-white flex flex-col '>
            <div className='text-lg underline cursor'>Intranet</div>
            <div>Campus Portal</div>
            <div>Mail @ Campus</div>
            <div>NetPortal(WiFi)</div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Footer
