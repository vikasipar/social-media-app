import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import Card from './Card';

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const postQuery = query(collection(db, "post"),orderBy("time", "desc"));
        const fetchData = async() => {
            await onSnapshot(postQuery, (snapshot) => {
                setPosts(snapshot.docs.map((doc) => ({
                    ...doc.data(),id:doc.id
                })))
            })
        }
        fetchData();
    }, []);

  return (
    <div className='w-full relative z-10 mt-20'>
        {posts.map((post) => (

            <Card post={post} key={post.id}/>

            // <div key={post.id} className='w-[50%] mx-auto py-3 my-5 border-[1px] border-[#9900ffe8] bg-white shadow-lg rounded'>
            //     <Link to={`/post/${post.id}`}>
            //     <div className='flex pl-[5%] items-center gap-4'>
            //         <img src={post.userImg} alt={post.userId} className='w-10 rounded-full' />
            //         <h2 className='text-xl'>{post.author}</h2>
            //     </div>
            //     <h2 className='pl-[5%] text-2xl my-2'>{post.description}</h2>
            //     <img src={post.postImg} alt={post.description} className='w-[90%] max-h-80 mx-auto aspect-auto border border-[#9900ffe8] rounded'/>
            //     </Link>
            //     <div className='pl-[5%] flex justify-around my-1 text-xl'>
            //         <span onClick={()=>handleAddLikes(post.id)} className='cursor-pointer flex items-center gap-2'><FaHeart/>Likes ({post.likes})</span>
            //         <Link to={`/post/${post.id}`} className='flex items-center gap-2'><FaCommentAlt/>Comments</Link>
            //     </div>
            // </div>
        ))
        }
    </div>
  )
}

export default Feed;