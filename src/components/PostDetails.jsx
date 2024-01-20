import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoc, doc, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../firebase';
import Comments from './Comments';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../store/atoms/user';
import { FaHeart, FaCommentAlt } from "react-icons/fa";

function PostDetails() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState("");
    const userDetails = useRecoilValue(userAtom);

    const loginUserId = window.localStorage.getItem("userId");
    const loginUser = userDetails?.userId;

    useEffect(() => {
        const getSingleDoc = async(id) => {
            const ref = doc(db, "post", id);
            getDoc(ref).then((doc) => setData(doc.data()));
        };
        getSingleDoc(id);
    },[id]);

    const deletePost = async(id) => {
        alert("Warning: Post wil be deleted forever!");
        const delData = doc(db, "post", id);
        deleteDoc(delData);
        navigate(`/profile/${loginUserId}`);
    }

    const handleAddLikes = async(id) => {
        await updateDoc(doc(db, "post", id),{
           "likes": increment(1),
        });
    };

  return (
    <div>
        <div key={id} className='w-[90%] md:w-[50%] mx-auto py-3 my-5 border-2 border-gray-300 shadow rounded overflow-hidden'>
            <div className='flex px-[5%] items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <img src={data.userImg} alt={data.userId} className='w-12 rounded-full' />
                    <h2 className='text-xl'>{data.author}</h2>
                </div>
                {
                    data.userId == loginUser && <button className='text-red-600 text-xl cursor-pointer' onClick={() => deletePost(id)}>Delete Post</button>
                }
            </div>
            <h2 className='pl-[5%] text-2xl my-2'>{data.description}</h2>
            <img src={data.postImg} alt={data.description} className='w-auto mx-auto px-5 max-h-96 aspect-auto border-2 border-gray-200 rounded'/>
            <div className='pl-[5%] flex justify-around my-1 text-xl'>
                <span onClick={()=>handleAddLikes(id)} className='cursor-pointer flex items-center gap-2'><FaHeart/>Likes ({data.likes})</span>
                <span className='flex items-center gap-2'><FaCommentAlt/>Comments</span>
            </div>
            <Comments postId = {id} />
        </div>
    </div>
  )
}

export default PostDetails;