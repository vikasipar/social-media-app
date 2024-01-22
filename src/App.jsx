import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RecoilRoot } from "recoil";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Page404 from "./components/Page404";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import PostDetails from "./components/PostDetails";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import RandomUser from "./components/RandomUser";

function App() {

  return (
    <BrowserRouter>
      {/* <h1>Firebase Crud Operations</h1> */}
      <RecoilRoot>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/user" element={<RandomUser/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/post" element={<Post/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/post/:id" element={<PostDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/protected" element={<Auth/>}>
          <Route path='/protected/dashboard' element={<Dashboard/>}/>
        </Route>
        <Route path="/*" element={<Page404/>}/>
      </Routes>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App;
