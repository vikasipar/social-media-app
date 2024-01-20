import React, { useState } from 'react';
import { auth } from '../../firebase';
import { FaHome } from "react-icons/fa";
import { MdAddBox, MdExplore } from "react-icons/md";
import { BsPeopleFill, BsSearch } from "react-icons/bs";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '../store/atoms/user';


function Navbar() {
    const userDetails = useRecoilValue(userAtom);
    const setUserState = useSetRecoilState(userAtom);
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut();
        // window.localStorage.removeItem("userId");
        alert("Logged out!");
        navigate('/');
        setUserState("");
    }

    const handleShowOptions = () => {
        setShowOptions(!showOptions);
    }

  return (
    <div className='w-full px-14 py-2 flex justify-between items-baseline top-0 mb-5 overflow-x-hidden text-2xl z-40 sticky'>
        <Link to='/' className='text-4xl' id='logo'>Ezgram</Link>
        <div className='w-[60%] flex items-center justify-between'>
            <div className='flex items-center gap-2 border-[1px] border-[#9900ffe8] rounded py-1 px-9 text-lg'>
                <BsSearch className='text-gray-400 font-normal'/>
                <input type='text' placeholder='Search' className='border-none outline-none'/>
            </div>
            <div className='flex gap-5 items-center'>
                <NavLink to='/' style={({ isActive }) => ({ borderBottom: isActive && "solid 3px #9900ffe8", color: "#9900ffe8"})} className='p-1'><span><FaHome/></span></NavLink>
                <NavLink to='/post' style={({ isActive }) => ({borderBottom: isActive && "solid 3px #9900ffe8", color: isActive && "#9900ffe8"})} className='p-1'><span><MdAddBox/></span></NavLink>
                <NavLink to='/explore' style={({ isActive }) => ({borderBottom: isActive && "solid 3px #9900ffe8", color: isActive && "#9900ffe8"})} className='p-1'><span><MdExplore/></span></NavLink>
            {
                userDetails ?
                <>
                    {/* <button onClick={handleLogout}>Logout</button> */}
                    <div><img src={auth.currentUser?.photoURL} alt={auth.currentUser?.displayName} onClick={handleShowOptions} className='w-10 rounded-full cursor-pointer relative' /></div>
                    {showOptions && <div className='flex flex-col absolute top-16 right-1 z-40 border-2 border-[#9900FF] py-4 px-14 gap-2'>
                        <Link to={`/profile/${auth.currentUser.uid}`} onClick={handleShowOptions}>Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>}
                    {/* <span>{auth.currentUser?.displayName}</span> */}
                </> :
                <>
                    {/* <button onClick={handleLogin} className='border-2 border-black py-1 px-3 rounded-2xl text-base font-bold'>Sign in</button> */}
                    <Link to='/login' className='border-2 text-white bg-[#9900FF] py-1 px-3 rounded-2xl text-base font-bold'>Signin</Link>
                </>
            }
            </div>
        </div>
    </div>
  )
}

export default Navbar;