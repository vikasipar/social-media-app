import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";

function Stories() {
    const [showstory, setShowstory] = useState(false);
    const [newStart, setNewStart] = useState();
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [userIndex, setUserIndex] = useState(0);

    var start = 106;
    const end = 126;
    // var newEnd = end;

    const handleShowStory = (id) => {
        setNewStart(id);
        setShowstory(true);
    }

    useEffect(() => {

        const fetchUsers = async() => {
            const response = await fetch('https://freetestapi.com/api/v1/users?limit=40');
            const data = await response.json();
            setUsers(data);
            setLoadingUsers(false);
        }
        fetchUsers();

        const storyIntervalId = setInterval(() => {
            setNewStart(prevStart => prevStart+1);
            setUserIndex(prevIndex => prevIndex+1);
        }, 5000);

        return () => {
            clearInterval(storyIntervalId);
        };
    }, []);

    const handleCloseStory = () => {
        setShowstory(false);
    }

  return (
    <>
    <div className='flex mx-auto overflow-scroll gap-1 px-5 pt-5 z-10 relative'>
        {
            Array.from({length: end-start+1}, (_, index) => (
                <img src={`https://picsum.photos/id/${start+index}/200`&& `https://picsum.photos/id/${start+index}/200`} onClick={() => handleShowStory(start+index)} alt="" key={start+index} className='w-20 border-2 border-dashed border-[#9900ffe8] rounded-full cursor-pointer' />
            ))
        }
    </div>
    <div>
        {
            (showstory && !loadingUsers) &&
            <div className='h-screen w-full absolute z-40 bg-black/60 top-0'>
                <h2 onClick={handleCloseStory} className='text-2xl absolute right-5 top-5 p-2 rounded-full cursor-pointer'><IoClose/></h2>
                <div className='w-fit h-[91%] md:h-[86%] bg-white my-[2%] py-16 md:py-0 mx-auto'>
                    <span key={userIndex.id} className='pt-5 ml-5 text-xl font-semibold flex items-center gap-2'>
                        <img src="https://walnuteducation.com/static/core/images/icon-profile.png" alt="" className='w-9' />
                        {users[userIndex]?.name}
                    </span>
                    <img src={`https://picsum.photos/id/${newStart}/200/300`} alt="" key={newStart} className='w-96 m-auto p-9' /> 
                </div>
            </div>
        }
    </div>
    </>
  )
}

export default Stories;