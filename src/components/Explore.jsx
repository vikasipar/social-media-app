import React, { useState, useEffect } from 'react';
import Card from './Card';

function Explore() {
  const [posts, setPosts] = useState(null);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchPosts = async() => {
      try{
        const response = await fetch('https://freetestapi.com/api/v1/posts?limit=30');
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
      {
        isloading ? 
        <h1>loading...</h1>
        :
        (posts.map((post, index) => (
          <Card post={post} key={index}/>
      )))
      }
    </div>
  )
}

export default Explore;