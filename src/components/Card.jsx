import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaCommentAlt } from "react-icons/fa";
import { db } from '../../firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

const Card = ({post}) => {

    const handleAddLikes = async(id) => {
        if(id<50){
            alert('This post is not allowed to like');
        }else{
            await updateDoc(doc(db, "post", id),{
                "likes": increment(1),
             });
        }
    };

  return (
    <div key={post.id} className='w-[50%] mx-auto py-3 my-5 border-[1px] border-[#9900ffe8] bg-white shadow-lg rounded'>
        <Link to={`/post/${post.id}`}>
            <div className='flex pl-[5%] items-center gap-4'>
                <img src={post.userImg ? post.userImg : "https://walnuteducation.com/static/core/images/icon-profile.png"} alt={post.userId} className='w-10 rounded-full' />
                <h2 className='text-xl'>{post.author}</h2>
            </div>
            <h2 className='pl-[5%] text-2xl my-2'>{post.description ? post.description : post.title }</h2>
            <h2 className='pl-[5%] text-lg my-2'>{post.content && post.content }</h2>
            <img src={post.postImg ? post.postImg : `https://picsum.photos/id/${post.id+53}/200/300`} alt={post.description} className='w-[90%] max-h-80 mx-auto aspect-auto border border-[#9900ffe8] rounded'/>
        </Link>
        <div className='pl-[5%] flex justify-around my-1 text-xl'>
            <span onClick={()=>handleAddLikes(post.id)} className='cursor-pointer flex items-center gap-2'><FaHeart/>Likes ({post.likes})</span>
            <Link to={`/post/${post.id}`} className='flex items-center gap-2'><FaCommentAlt/>Comments</Link>
        </div>
    </div>
  )
}

export default Card;