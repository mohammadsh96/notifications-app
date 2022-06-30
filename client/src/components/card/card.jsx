import "./card.css"
import Heart from "../../img/heart.svg"
import info from "../../img/info.svg"
import HeartFilled from "../../img/heartfilled.svg"
import Comment from "../../img/comment.svg"
import Share from "../../img/share.svg"
import {useState} from 'react'
const Card =({post ,socket ,user})=>{
const [liked ,setLiked]=useState(false);
const handleLike = (type)=>{
   setLiked(true)
   socket.emit("sendlike" , {
    senderName:user,
    recivedName:post.username,
    type,
   })
}
return(
<div classNAme="card">

<div calssName="info" > 
<img className="userImg" src={post.userImg} alt=""></img>
<span > {post.fullname}</span>
</div>
<img src={post.postImg} classname="postImg"></img>
<div className="interaction">
    {liked ? (

        <img src={HeartFilled} alt="" className="cardIcon" />  

    ) : (
        <img src={Heart} alt="" className="cardIcon" onClick={()=>handleLike(1)} />  
        
    )}

  <img src={Comment} alt="" className="cardIcon" onClick={()=>handleLike(2)} />  
  <img src={Share} alt="" className="cardIcon" onClick={()=>handleLike(3)} />  
  <img src={info} alt="" className="cardIcon infoIcon"  />  


</div>
</div>



)


};

export default Card ;