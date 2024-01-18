import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../firebase.config';
import { getAuth } from 'firebase/auth';

function Post() {
    const auth = getAuth();

    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

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
        <form onSubmit={handleSubmit}>
            <label htmlFor='desc'>Title</label>
            <input type='text' id='desc' onChange={(e) => setDescription(e.target.value)} required/>
            <label htmlFor='image'>Image</label>
            <input type='file' id='image' accept='image/*' onChange={handleChange} required/>
            <input type='submit' value="Add Post"/>
        </form>
    </div>
  )
}

export default Post;