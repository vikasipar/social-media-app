import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../firebase'; 
import { doc, getDoc, query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userAtom } from '../store/atoms/user';

function Profile() {
    const {id} = useParams();
    const [userdata, setUserdata] = useState("");
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const userDetails = useRecoilValue(userAtom);
    const setUserState = useSetRecoilState(userAtom);
    const [isloading, setIsloading] = useState(true);

    useEffect(() => {
        const getUser = async(id) => {
            const ref = doc(db, "users", id);
            getDoc(ref).then((doc) => setUserdata(doc.data()));
        };
        getUser(id);

        const postQuery = query(collection(db, "post"), orderBy("time", "desc"));
        const getPosts = onSnapshot(postQuery, (snapshot) => {
            const postData = snapshot.docs.map((doc) => ({
                ...doc.data(),id:doc.id
            }));
            setPosts(postData);
            setIsloading(false);
        });
        return() => getPosts();
    }, [id]);

    useEffect(() => {
        setFilteredPosts(posts.filter((post) => post.userId == id));
    }, [id, posts]);

  return (
    <div>
        <img src="https://static.vecteezy.com/system/resources/previews/002/885/318/large_2x/nature-green-tree-fresh-leaf-on-beautiful-blurred-soft-bokeh-sunlight-background-with-free-copy-space-spring-summer-or-environment-cover-page-template-web-banner-and-header-free-photo.jpg" alt="" className='absolute w-[80%] mx-[10%] border-2 border-green-200 z-10 max-h-52 opacity-70' />

        <div className='flex items-end w-[60%] mx-auto gap-10 z-30 relative bg-transparent pt-32'>
            <img src={userDetails==null ? userdata.img : userDetails.userImg } alt="" className='rounded-full w-44 shadow-2xl'/>
            <div>
               <h3 className='text-5xl font-semibold shadow-2xl'>{userDetails==null ? userdata.name : userDetails.userName}</h3>
                <h5 className='text-2xl'>{userDetails==null ? userdata.email : userDetails.userEmail}</h5> 
            </div>
            {/* <span>Edit Profile</span> */}
        </div>
        <div className='flex flex-wrap justify-center columns-3 gap-3 w-[70%] mx-auto mt-20 mb-12 z-30 relative'>
            {
            isloading ? 
            (<h2 className='text-xl font-semibold text-gray-500'>loading...</h2>) :
            filteredPosts.length > 0 ? 
            filteredPosts.map((post) => (
                <Link to={`/post/${post.id}`} className='w-[30%]' key={post.id}>
                    <img src={post.postImg} alt='' className='aspect-square border-2 border-black h-fit'/>
                </Link>
            )) 
            : <span className='text-xl font-semibold text-gray-500'>{userDetails==null ? userdata.name : userDetails.userName} hasn't posted yet</span>
            }
        </div>
    </div>
  )
}

export default Profile;