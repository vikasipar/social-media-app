import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Page404 from "./components/Page404";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Feed from "./components/Feed";

function App() {

  return (
    <BrowserRouter>
      <h1>Firebase Crud Operations</h1>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/post" element={<Post/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/protected" element={<Auth/>}>
          <Route path='/protected/dashboard' element={<Dashboard/>}/>
        </Route>
        <Route path="/*" element={<Page404/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
