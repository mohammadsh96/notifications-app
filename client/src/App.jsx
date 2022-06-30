import './app.css';
import {useState} from 'react';
import Navbar from './components/navbar/navbar';
import Card from './components/card/card';
import {posts} from "./data"
import { io } from "socket.io-client";
import { useEffect } from 'react';
function App() {
  const [username, setUsername]=useState("");
  const [user, setUser]=useState("");
  const [socket ,setSocket] = useState(null)
console.log(user);

useEffect(()=>{
setSocket(io("http://localhost:4000"))


},[])

useEffect(()=>{
socket?.emit("newUser" ,user);

},[socket,user]);
  return (
    <div className="container">
    {user ? (

      <>
      <Navbar socket={socket} />
      {posts.map((post)=>(
        <Card  key={post.id} post={post} socket={socket} user={user}/>

      ))}
      <span className='username'>{user}</span>
      </>

    ) : ( 
  <div className="login"> 
  <input type="text" placeholder='username' onChange={(e)=>setUsername(e.target.value)}></input>
  <button  onClick={(e)=>setUser(username)}>login</button>
  </div>
  )}

    </div>
  );
}

export default App;
