import React from 'react';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { MdExplore, MdAddBox } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

function BottomNavbar() {
    const userDetails = false;
  return (
    <div className='flex md:hidden justify-around w-full items-center text-stone-600 my-4 bottom-0 z-20 text-3xl sticky'>
        <NavLink to='/' style={({ isActive }) => ({color: isActive && "#9900ffe8"})} className='p-1'><span><FaHome/></span></NavLink>
        <NavLink to='/explore' style={({ isActive }) => ({color: isActive && "#9900ffe8"})} className='p-1'><span><MdExplore/></span></NavLink>
        <NavLink to='/post' style={({ isActive }) => ({color: isActive && "#9900ffe8"})} className='p-1'><span><MdAddBox/></span></NavLink>
        {
                userDetails ?
                <>
                    {/* <button onClick={handleLogout}>Logout</button> */}
                    <div><img src={auth.currentUser?.photoURL} alt={auth.currentUser?.displayName} onClick={handleShowOptions} className='w-10 rounded-full cursor-pointer relative' /></div>
                    {/* <span>{auth.currentUser?.displayName}</span> */}
                </> :
                <>
                    {/* <button onClick={handleLogin} className='border-2 border-black py-1 px-3 rounded-2xl text-base font-bold'>Sign in</button> */}
                    <NavLink to='/login' style={({ isActive }) => ({color: isActive && "#9900ffe8"})} className='p-1'><FaUserCircle/></NavLink>
                </>
            }
    </div>
  )
}

export default BottomNavbar