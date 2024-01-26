import React from 'react';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { MdExplore, MdAddBox } from 'react-icons/md';
import { IoMdClose } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { sidebarAtom } from '../store/atoms/sidebar';
import { userAtom } from '../store/atoms/user';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function Sidebar() {
    const userDetails = useRecoilValue(userAtom);
    const setUserState = useSetRecoilState(userAtom);
    const sidebarValue = useRecoilValue(sidebarAtom);
    const setSidebarState = useSetRecoilState(sidebarAtom);

    const navigate = useNavigate();

    const handleSidebar = () => {
        setSidebarState(!sidebarValue);
    }

    const handleLogout = () => {
        auth.signOut();
        toast("Logged out successfully!",{
            type: "warning",
        });
        navigate('/');
        setUserState("");
    }

  return (
    <div className='h-full absolute top-0 block md:hidden w-full text-center bg-white/90 z-50 text-xl'>
        <IoMdClose onClick={handleSidebar} className='ml-[88%] mt-5 text-3xl text-right'/>
        <div className='bg-transparent h-[40%] my-[45%] border-black text-3xl'>
            <NavLink to='/' onClick={() => setSidebarState(false)} style={({ isActive }) => ({color: isActive && "#9900ffe8"})} className=''><span className='flex items-center bg-transparent gap-9 text-center w-[50%] mx-auto my-10'><FaHome className='bg-transparent'/>Home</span></NavLink>
            <NavLink to='/explore' onClick={() => setSidebarState(false)} style={({ isActive }) => ({color: isActive && "#9900ffe8"})} className=''><span className='flex items-center bg-transparent gap-9 text-center w-[50%] mx-auto my-10'><MdExplore className='bg-transparent'/>Explore</span></NavLink>
            <NavLink to='/post' onClick={() => setSidebarState(false)} style={({ isActive }) => ({color: isActive && "#9900ffe8"})} className=''><span className='flex items-center bg-transparent gap-9 text-center w-[50%] mx-auto my-10'><MdAddBox className='bg-transparent'/>Post</span></NavLink>
            {
                userDetails ?
                <div>
                    <NavLink to={`/profile/${auth.currentUser.uid}`} onClick={() => setSidebarState(false)} style={({ isActive }) => ({ color: isActive && "#9900ffe8"})} className='flex items-center bg-transparent gap-4 text-center w-[50%] mx-auto my-10'>
                        <img src={auth.currentUser?.photoURL} alt={auth.currentUser?.displayName} className='w-14 rounded-full cursor-pointer relative'/>
                        Profile
                    </NavLink>
                    <button onClick={handleLogout} className='mt-9'>Logout</button>
                    {/* <span>{auth.currentUser?.displayName}</span> */}
                </div> :
                <>
                    {/* <button onClick={handleLogin} className='border-2 border-black py-1 px-3 rounded-2xl text-base font-bold'>Sign in</button> */}
                    <NavLink to='/login' onClick={() => setSidebarState(false)} style={({ isActive }) => ({color: isActive && "#9900ffe8"})} className=''><span className='flex items-center bg-transparent gap-9 text-center w-[50%] mx-auto my-10'><FaUserCircle className='bg-transparent'/>Login</span></NavLink>
                </>
            }
        </div>
    </div>
  )
}

export default Sidebar;