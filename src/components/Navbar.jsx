import React from 'react';
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { db } from '../../firebase';
import { doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Navbar() {

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        // console.log(result.user);
        // console.log(auth);
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
        alert("Logged in!");
    }
    
    const handleLogout = () => {
        auth.signOut();
        window.localStorage.removeItem("userId");
        alert("Logged out!");
    }


  return (
    <div className='w-full px-14 py-2 flex justify-between items-center sticky top-0 mb-14 overflow-x-hidden'>
        <Link to='/'>Ezgram</Link>
        <div className='w-[60%] flex items-center justify-between'>
            <div className='border-[1px] border-gray-300 py-1 px-9'>
                <input type='text' placeholder='Search' className='border-none outline-none'/>
            </div>
            <div className='flex gap-5 items-center'>
                <Link to='/'><span>Home</span></Link>
                <Link to='/post'><span>Post</span></Link>
                <Link to='/explore'><span>Explore</span></Link>
            {
                auth.currentUser ?
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <Link to={`/profile/${auth.currentUser.uid}`}><img src={auth.currentUser?.photoURL} alt={auth.currentUser?.displayName} className='w-10 rounded-full' /></Link>
                    {/* <span>{auth.currentUser?.displayName}</span> */}
                </> :
                <>
                    <button onClick={handleLogin}>Sign in w/ Google</button>
                </>
            }
            </div>
        </div>
    </div>
  )
}

export default Navbar;