import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaCommentAlt } from "react-icons/fa";
import { db } from '../../firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Card = ({post}) => {

    const handleAddLikes = async(id) => {
        if(id<50){
            toast(" This post is not available for likes",{
                type: "error",
            });
        }else{
            await updateDoc(doc(db, "post", id),{
                "likes": increment(1),
            });
            toast("You've liked the post!", {
                type: "success",
             });
        }
    };

  return (
    <div key={post.id} className='w-[86%] md:w-[50%] mx-auto py-2 md:py-3 my-5 border-[1px] border-[#9900ffe8] bg-white shadow-xl rounded'>
        <Link to={`/post/${post.id}`}>
            <div className='flex pl-[5%] items-center gap-4'>
                <img src={post.userImg ? post.userImg : "https://th.bing.com/th/id/OIP.9a68s5XwkBi72-d-tph-qgHaHa?pid=ImgDet&w=161&h=161&c=7"} alt={post.userId} className='w-10 rounded-full opacity-70' />
                <h2 className='text-xl'>{post.author}</h2>
            </div>
            <h2 className='pl-[5%] text-xl md:text-2xl my-2'>{post.description ? post.description : post.title }</h2>
            <h2 className='pl-[5%] text-base md:text-lg my-2'>{post.content && post.content }</h2>
            <img src={post.postImg ? post.postImg : `https://picsum.photos/id/${post.id+53}/200/300`} alt={post.description} className='hidden md:block w-[90%] max-h-80 mx-auto aspect-auto border border-[#9900ffe8] rounded'/>
            <img src={post.postImg ? post.postImg : `https://picsum.photos/id/${post.id+53}/200`} alt={post.description} className='block md:hidden w-[90%] max-h-80 mx-auto aspect-auto border border-[#9900ffe8] rounded'/>
        </Link>
        <div className='pl-[5%] flex justify-around mt-1 md:mt-3 text-lg md:text-xl'>
            <span onClick={()=>handleAddLikes(post.id)} className='cursor-pointer flex items-center gap-2'><FaHeart className='text-[#9900FF]'/>Likes ({post.likes})</span>
            <Link to={`/post/${post.id}`} className='flex items-center gap-2'><FaCommentAlt className='text-[#9900FF]'/>Comments</Link>
        </div>
    </div>
  )
}

export default Card;