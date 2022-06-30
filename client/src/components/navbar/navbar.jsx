import "./navbar.css";
import Notification from  "../../img/notification-svgrepo-com.svg"
import message from "../../img/message-svgrepo-com.svg"
import settings from "../../img/settings-svgrepo-com.svg"
import { useEffect ,useState } from 'react';
const Navbar =({socket})=>{
const [notifications ,setNotifications]=useState([])
const [open, setOpen] = useState(false);
    useEffect(()=>{

socket.on("getNotification" , (data)=>{
    console.log(data);
setNotifications((prev)=>[...prev ,data]);

})

    },[socket])
    console.log(notifications);

    const displayNotifications =({senderName,type})=>{
let action;
if(type===1){
    action="liked"
}else if (type===2){
    action="commented"
}else if (type===3){
    action="shared"
}else action = "did sonmthing to"
return(
    <span className="notification">{`${senderName} ${action} your post ` } </span>
)
    }
    const handleRead = () => {
        setNotifications([]);
        setOpen(false);
      };
return(

<div className="navbar">

<span className="logo">notify app</span>

<div className="icons">

<div className="icon" onClick={() => setOpen(!open)} >
<img src={Notification} className="iconImg" alt="" />
{
notifications.length >0 &&
<div className="counter">{notifications.length}</div>
}
</div>

<div className="icon" onClick={() => setOpen(!open)}>
<img src={message} className="iconImg" alt="" />
<div className="counter">4</div>
</div>


<div className="icon" onClick={() => setOpen(!open)}>
<img src={settings} className="iconImg" alt="" />
<div className="counter">1</div>

</div>

</div>
{open && (
<div className="notifications">
{notifications.map((n)=>displayNotifications(n))}
<button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
</div>
)}
</div>
);
};

export default Navbar;