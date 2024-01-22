import React from 'react';
import Feed from './Feed';
import Stories from './Stories';
import RandomUser from './RandomUser';

function Home() {
  return (
    <div className='z-10 relative'>
      <Stories/>
      <div className='flex'>
        <Feed/>
        <RandomUser/>
      </div>
    </div>
    
  )
}

export default Home;