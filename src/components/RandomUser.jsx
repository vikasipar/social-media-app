import React, { useEffect, useState } from 'react';

function RandomUser() {
    const [user, setUser] = useState('');

    useEffect(() => {
        const getUser = async() => {
            const response = await fetch('https://randomuser.me/api/');
            const data = await response.json();
            setUser(data.results[0]);
        }
        const interval = setInterval(getUser, 5000);
        return() => clearInterval(interval);
    },[]);

  return (
    <div className='w-[20%] absolute right-4 top-52 shadow-xl z-10 my-auto mx-auto text-center'>
        <h3 className='text-lg mb-3'>Suggestions For You</h3>
    {user &&
        <div className='border border-[#9363b3] bg-white py-5 cursor-pointer rounded-lg'>
            <img src={user.picture?.large ? user.picture?.large : user.picture?.medium} alt="" className='w-52 mx-auto rounded-full'/>
            <h3 className='text-2xl'>Hi, My name is</h3>
            <h2 className='text-3xl px-1'>{user.name.first ? user.name.first : ''} {user.name.last ? user.name.last : ''}</h2>
        </div>}
    </div>
  )
}

export default RandomUser;