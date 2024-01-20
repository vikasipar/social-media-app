import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';

function Comments({postId}) {
    const auth = getAuth();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState(null);

    const handleAddComment = async(e) => {
        e.preventDefault();
        if(auth.currentUser){
            await addDoc(collection(db, "comments"),{
                postId,
                message: newComment,
                author: auth.currentUser.displayName,
                userImg: auth.currentUser.photoURL,
                time: new Date(),
            })
            setNewComment("");
            alert("Comment added!");
        }else{
            alert("Login required!");
        }
    };

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
    }, []);

    const filterComments = comments.filter((comment) => comment.postId == postId);

  return (
    <div className='sm:px-[5%] text-xl'>
        <h1 className='my-2'>Comments</h1>
        <form onSubmit={handleAddComment} className='sm:w-[90%] mx-1 sm:mx-auto'>
            <input type='text' placeholder='add comment...' onChange={(e) => setNewComment(e.target.value)} className='w-[77%] rounded px-3 py-1 border-2 border-[#9900ffe8] rounded-r-none'/>
            <button type='submit' className='w-fit px-3 py-1 border-2 border-[#9900ffe8] bg-[#9900ffe8] rounded rounded-l-none text-white'>Add</button>
        </form>
        <div>
            {filterComments.map((comment) => (
                <div className='flex flex-wrap sm:pl-[5%] items-start gap-6 my-4 p-2 mx-1 sm:mx-14 border-2 border-gray-300' key={comment.message}>
                    <div className='flex gap-2 items-center'>
                        <img src={comment.userImg} alt={comment.author} className='w-7 rounded-full' />
                        <h2 className='text-base'>{comment.author}</h2>
                    </div>
                    
                    <p className='text-gray-600'>{comment.message}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Comments;