import React from 'react';
import DropdownMenu from './DropdownMenu';

const Inbox = () => {
  return (
    <div className='flex-1  bg-white rounded-2xl mx-5'>
        <div className='flex items-center justify-between px-4'>
            <div className='flex items-center gap-2 text-gray-700 py-2'>
                <div>
                    <DropdownMenu/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Inbox;