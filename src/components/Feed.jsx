import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

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

    const handleAddLikes = async(id) => {
            await updateDoc(doc(db, "post", id),{
               "likes": increment(1),
            });
    };

  return (
    <div className='w-full overflow-x-hidden'>
        {posts.map((post) => (
            <div key={post.id} className='w-[50%] mx-auto py-3 my-5 border-2 border-gray-300 shadow rounded'>
                <Link to={`/post/${post.id}`}>
                <div className='flex pl-[5%] items-center gap-4'>
                    <img src={post.userImg} alt={post.userId} className='w-10 rounded-full' />
                    <h2>{post.author}</h2>
                </div>
                <h2 className='pl-[5%]'>{post.description}</h2>
                <img src={post.postImg} alt={post.description} className='w-[90%] max-h-80 mx-auto aspect-auto border-2 border-gray-400 rounded'/>
                </Link>
                <div className='pl-[5%] flex justify-around my-1'>
                    <span onClick={()=>handleAddLikes(post.id)} className='cursor-pointer'>Likes ({post.likes})</span>
                    <Link to={`/post/${post.id}`}>Comments</Link>
                </div>
            </div>
        ))
        }
    </div>
  )
}

export default Feed;