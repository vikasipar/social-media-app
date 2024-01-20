import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

function Explore() {
  const [allUsersData, setAllUsersData] = useState([]);

        const fetchData = async() => {
            await onSnapshot(postQuery, (snapshot) => {
                setPosts(snapshot.docs.map((doc) => ({
                    ...doc.data(),id:doc.id
                })))
            })
        }

  useEffect(() => {
   const usersQuery = query(collection(db, "users"));
    const getAllUsers = async() => {
      await onSnapshot(usersQuery, (snapshot) => {
        setAllUsersData(snapshot.docs.map((doc) => ({
          ...doc.data(),id:doc.id
        })))
      })
    };
    getAllUsers();
},[]);

  return (
    <div className='w-full relative z-10 mt-20'>
      {/* <h1>Explore</h1> */}
      <div>
        {allUsersData.map((user) => (
          <Link to={`/profile/${user.id}`} key={user.id} className='flex items-center gap-5 w-[50%] mx-auto my-9 border-2 border-gray-300 p-5 rounded-xl shadow bg-white'>
            <img src={user.img} alt="" className='rounded-full w-16'/>
            <div className=''>
              <h2 className='text-2xl font-semibold'>{user.name}</h2>
              <h2 className='text-lg'>{user.email}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Explore;