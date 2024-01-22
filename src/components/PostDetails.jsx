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
        if(id<50){
            const getSingleDoc = async(id) => {
                const response = await fetch(`https://freetestapi.com/api/v1/posts/${id}`);
                const data = await response.json();
                setData(data);
            };
            getSingleDoc(id);
        }else{
            const getSingleDoc = async(id) => {
                const ref = doc(db, "post", id);
                getDoc(ref).then((doc) => setData(doc.data()));
            };
            getSingleDoc(id);
        }
    },[id]);

    const deletePost = async(id) => {
        alert("Warning: Post wil be deleted forever!");
        const delData = doc(db, "post", id);
        deleteDoc(delData);
        navigate(`/profile/${loginUserId}`);
    }

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
    <div>
        <div key={id} className='w-[90%] md:w-[50%] mx-auto py-3 my-5 border-2 border-gray-300 shadow rounded overflow-hidden'>
            <div className='flex px-[5%] items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <img src={data.userImg ? data.userImg : "https://th.bing.com/th/id/OIP.9a68s5XwkBi72-d-tph-qgHaHa?pid=ImgDet&w=161&h=161&c=7"} alt={data.userId && data.id} className='w-12 rounded-full opacity-70' />
                    <h2 className='text-xl'>{data.author}</h2>
                </div>
                {
                    data.userId && data.userId == loginUser && <button className='text-red-600 text-xl cursor-pointer' onClick={() => deletePost(id)}>Delete Post</button>
                }
            </div>
            <h2 className='pl-[5%] text-2xl my-2'>{data.description ? data.description : data.title}</h2>
            <h2 className='pl-[5%] text-xl my-2'>{data.content && data.content}</h2>
            <img src={data.postImg ? data.postImg : `https://picsum.photos/id/${id+53}/300/200`} alt={data.description} title={id+53-100} className='w-auto mx-auto px-5 max-h-96 aspect-auto border-2 border-gray-200 rounded'/>
            <div className='pl-[5%] flex justify-around mt-3 text-xl'>
                <span onClick={()=>handleAddLikes(id)} className='cursor-pointer flex items-center gap-2'><FaHeart className='text-[#9900FF]'/>Likes ({data.likes})</span>
                <span className='flex items-center gap-2'><FaCommentAlt className='text-[#9900FF]'/>Comments</span>
            </div>
            <Comments postId = {id} />
        </div>
    </div>
  )
}

export default PostDetails;