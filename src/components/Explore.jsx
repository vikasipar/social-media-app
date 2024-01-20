import React, { useState, useEffect } from 'react';
import Card from './Card';

function Explore() {
  const [posts, setPosts] = useState(null);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchPosts = async() => {
      try{
        const response = await fetch('https://freetestapi.com/api/v1/posts');
        const data = await response.json();
        setPosts(data);
        setIsloading(false);
      }catch(error){
        console.error("Posts are not available. ", error);
      }
    };
    fetchPosts();
   
},[]);

  return (
    <div className='w-full relative z-10 mt-20'>
      {/* <h1>Explore</h1> */}
      {
        isloading ? 
        <h1>loading...</h1>
        :
        (posts.map((post) => (
          <Card post={post} key={post.comments.id}/>
      )))
      }
    </div>
  )
}

export default Explore;