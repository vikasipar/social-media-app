import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../store/atoms/user';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';

function Login() {
  const setUserState = useSetRecoilState(userAtom);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if(!docSnap.exists()){
            await setDoc(doc(db, "users", user.uid),{
                name: user.displayName,
                email: user.email,
                img: user.photoURL,
                timestamp: serverTimestamp(),
            })
        }
        toast('Login successful!');
        navigate('/');

        setUserState({
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
            userImg: user.photoURL,
        })
    }

  return (
    <div className='w-full h-[80vh] flex flex-col'>
      <div className='w-[45%] mx-auto py-9 my-auto space-y-16 border border-gray-500 bg-white rounded-lg shadow'>
        <h1 className='w-[90%] mx-auto text-5xl text-center font-bold border-b-2 pb-5 border-gray-400'>Log In</h1>
        <button onClick={handleLogin} className='border-2 border-[#9900ffe8] py-2 px-14 rounded-xl text-xl gap-9 font-bold flex items-center mx-auto'><FcGoogle className='text-5xl'/>Sign in with Google</button>
      </div>
    </div>
  )
}

export default Login;