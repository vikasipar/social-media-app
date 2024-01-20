import React, { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../store/atoms/user';
import { useNavigate } from 'react-router-dom';

function Post() {
    const auth = getAuth();
    const userDetails = useRecoilValue(userAtom);
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        !userDetails && navigate('/login');
    }),[];

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(auth.currentUser){
            const storageRef = ref(storage, `images/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
            await uploadTask;

            const url = await getDownloadURL(uploadTask.snapshot.ref);
            const data = {
                userId: auth.currentUser.uid,
                author: auth.currentUser.displayName,
                email: auth.currentUser.email,
                userImg: auth.currentUser.photoURL,
                postImg: url,
                description,
                likes: 0,
                time: serverTimestamp(),
            }
            const saveData = await addDoc(collection(db, "post"), data);
            alert("Image posted successfully!");
        }else{
            alert("Log in required!");
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className='w-[60%] h-full mt-44 mx-auto flex flex-col border-2 border-gray-300 shadow text-xl rounded'>
            <div className='flex items-center my-2 gap-10 px-9 py-3'>
                <label htmlFor='desc'>Description</label>
                <input type='text' id='desc' onChange={(e) => setDescription(e.target.value)} required className='border-[1px] border-gray-500 rounded w-full outline-none  py-4 px-5'/>
            </div>
            <div className='flex items-center mt-2 gap-20 px-9 py-3'>
                <label htmlFor='image'>Image</label>
                <input type='file' id='image' accept='image/*' onChange={handleChange} className='border-[1px] border-gray-500 w-full py-2 px-5 rounded'/>
            </div>
            <span className='text-base mx-auto mt-[-1%] text-yellow-600'>Note: add 1:1 image</span>
            <input type='submit' value="Post" className='border-[1px] border-gray-500 bg-gray-500 outline-none py-2 px-5 mx-9 my-5 rounded'/>
        </form>
    </div>
  )
}

export default Post;