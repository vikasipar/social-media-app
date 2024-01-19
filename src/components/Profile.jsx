import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../firebase'; 
import { doc, getDoc, query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';

function Profile() {
    const {id} = useParams();
    const [userdata, setUserdata] = useState("");
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    window.localStorage.setItem("userId", id);

    useEffect(() => {
        const getUser = async(id) => {
            const ref = doc(db, "users", id);
            getDoc(ref).then((doc) => setUserdata(doc.data()));
        };
        getUser(id);

        const postQuery = query(collection(db, "post"), orderBy("time", "desc"));
        const getPosts = async() => {
            await onSnapshot(postQuery, (snapshot) => {
                setPosts(snapshot.docs.map((doc) => ({
                    ...doc.data(),id:doc.id
                })))
            })
        };
        getPosts();
        setFilteredPosts(posts.filter((post) => post.userId == id));
        // console.log("all posts= ", filteredPosts);
    }, [id]);

    // console.log("All post:", posts);


  return (
    <div>
        <div className='flex items-center w-[60%] mx-auto'>
            <img src={userdata.img} alt="" className='rounded-full'/>
            <div>
               <h3 className='text-4xl font-semibold'>{userdata.name}</h3>
                <h5 className='text-xl'>{userdata.email}</h5> 
            </div>
            <span>Edit Profile</span>
        </div>
        <div className='flex flex-wrap justify-center columns-3 gap-3 w-[70%] mx-auto mt-20 mb-12'>
            {filteredPosts.map((post) => (
                <Link to={`/post/${post.id}`} className='w-[30%]'>
                    <img src={post.postImg} alt='' key={post.id} className='aspect-square border-2 border-black h-fit'/>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Profile;