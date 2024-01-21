import React from 'react';
import Feed from './Feed';
import Stories from './Stories';

function Home() {
  return (
    <div className='z-10 relative'>
      <Stories/>
      <Feed/>
    </div>
    
  )
}

export default Home;