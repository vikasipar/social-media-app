import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

function Comments({postId}) {
    const auth = getAuth();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState(null);
    const [isloading, setIsloading] = useState(true);
    var filterComments = null;

    if(postId < 50){
        useEffect(() => {
            const fetchComments = async() => {
            try{
                const response = await fetch(`https://freetestapi.com/api/v1/posts/${postId}`);
                const data = await response.json();
                setComments(data);
                setIsloading(false);
            }catch(error){
                console.error("Posts are not available. ", error);
            }
            };
            fetchComments();
        },[]);
        filterComments = comments.comments;
    }else{
        useEffect(() => {
            const commentsQuery = query(collection(db, "comments"),orderBy("time", "desc"));
            const fetchComments = async() => {
                await onSnapshot(commentsQuery, (snapshot) => {
                    setComments(snapshot.docs.map((doc) => ({
                        ...doc.data(),id:doc.id,
                    })))
                })
            }
            fetchComments();
            setIsloading(false);
        }, []);
    
        filterComments = comments.filter((comment) => comment.postId == postId);
    }

    const handleAddComment = async(e) => {
        e.preventDefault();
        if(postId<50){
            toast(" This post is not available for comments",{
                type: "error",
            });
        }else{
            if(auth.currentUser){
                await addDoc(collection(db, "comments"),{
                    postId,
                    message: newComment,
                    author: auth.currentUser.displayName,
                    userImg: auth.currentUser.photoURL,
                    time: new Date(),
                })
                toast("Comment posted successfully!", {
                    type: "success",
                });
            }else{
                toast("Login required!", {
                    type: "warning",
                });
            }
        }
    };


  return (
    <div className='sm:px-[5%] text-xl'>
        <h1 className='my-2'>Comments</h1>
        <form onSubmit={handleAddComment} className='sm:w-[90%] mx-1 sm:mx-auto'>
            <input type='text' placeholder='add comment...' onChange={(e) => setNewComment(e.target.value)} className='w-[77%] rounded px-3 py-1 border-2 border-[#9900ffe8] rounded-r-none'/>
            <button type='submit' className='w-fit px-3 py-1 border-2 border-[#9900ffe8] bg-[#9900FF] rounded rounded-l-none text-white'>Add</button>
        </form>
        <div>
            {
                isloading ? 
                <span>loading...</span> :
            filterComments.map((comment) => (
                <div className='flex flex-wrap sm:pl-[5%] items-start gap-6 my-4 p-2 mx-1 sm:mx-14 border-2 border-gray-300' key={comment.message ? comment.message : comment.id}>
                    <div className='flex gap-2 items-center'>
                        <img src={comment.userImg ? comment.userImg : "https://walnuteducation.com/static/core/images/icon-profile.png"} alt={comment.author} className='w-7 rounded-full' />
                        <h2 className='text-base'>{comment.author}</h2>
                    </div>
                    
                    <p className='text-gray-600'>{comment.message ? comment.message : comment.text}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Comments;