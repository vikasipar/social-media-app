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
        ))
        }
    </div>
  )
}

export default Feed;