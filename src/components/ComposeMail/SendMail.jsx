import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import ComposeMail from './ComposeMail';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../redux/appSlice';

const SendMail = () => {
  const open= useSelector((state)=>state.appSlice.open); 
  const dispatch = useDispatch();
  return (
    <div className={`${open ? 'block': "hidden"} bg-white shadow-xl shadow-slate-600 rounded-t-md w-fit`}>
        <div className='flex px-3 py-2 bg-[#c1c9ee] justify-between rounded-t-md'>
            <h1>New message</h1>
            <div onClick={()=> dispatch(setOpen(false))} className='p-2 hover:text-white hover:bg-[#E11325] cursor-pointer transition-all duration-1000 ease-in-out hover:rotate-90'>
                <RxCross1/>
            </div>
        </div>
        <ComposeMail />   
    </div>
  )
}

export default SendMail;