import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

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
        console.log(posts);
    }, []);
  return (
    <div>{posts.map((post) => (
        <div key={post.id}>
            <h2>{post.author}</h2>
            <img src={post.postImg} alt={post.description}/>
            <h2>{post.description}</h2>
        </div>
    ))
        }</div>
  )
}

export default Feed;