import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import ComposeMail from './ComposeMail';

const SendMail = () => {
  return (
    <div className='bg-white max-h-min max-w-xl shadow-xl shadow-slate-600 rounded-t-md'>
        <div className='flex px-3 py-2 bg-[#F2F6Fc] justify-between rounded-t-md'>
            <h1>New message</h1>
            <div className='p-2 hover:text-white hover:bg-[#E11325] cursor-pointer transition-all duration-1000 ease-in-out hover:rotate-90'>
                <RxCross1/>
            </div>
        </div>
        <form action='' className='flex flex-col gap-2 p-3'>
            <ComposeMail />
            <button type='submit' className='bg-[#0B57D0] rounded-full w-fit px-4 text-white font-medium'>Send</button>
        </form>
    </div>
  )
}

export default SendMail;