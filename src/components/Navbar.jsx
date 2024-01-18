import React from 'react';
import { auth } from '../../firebase.config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { db } from '../../firebase.config';
import { doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore';

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
        alert("Logged out!");
    }


  return (
    <div>
        <h1>Navbar</h1>
        {
            auth.currentUser ?
            <>
                <img src={auth.currentUser?.photoURL} alt={auth.currentUser?.displayName} />
                <span>{auth.currentUser?.displayName}</span>
                <button onClick={handleLogout}>Logout</button>
            </> :
            <>
                <button onClick={handleLogin}>Sign in w/ Google</button>
            </>
        }
        
    </div>
  )
}

export default Navbar;