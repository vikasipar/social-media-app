import React from 'react';
import { CiWarning } from "react-icons/ci";

function Page404() {
  return (
    <div className='my-40 w-fit mx-auto'>
      <CiWarning className='w-fit mx-auto text-7xl my-5 text-yellow-500'/>
      <h2 className='text-2xl text-[#9900ffe8]'><span>Error 404:</span> Page Not Found.</h2>
    </div>
  )
}

export default Page404;