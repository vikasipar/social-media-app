import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { sidebarAtom } from "./store/atoms/sidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Login from './components/Login';
import Page404 from "./components/Page404";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import PostDetails from "./components/PostDetails";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";

function App() {
  const sidebarValue = useRecoilValue(sidebarAtom);

  return (
    <BrowserRouter>
      {/* <h1>Firebase Crud Operations</h1> */}
      <Navbar/>
      { sidebarValue && <Sidebar/> }
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/post" element={<Post/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/post/:id" element={<PostDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/protected" element={<Auth/>}/>
        <Route path="/*" element={<Page404/>}/>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App;
