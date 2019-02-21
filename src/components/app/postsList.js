
import React from 'react';

const PostList = props =>{
    return(
        <div>
            {
                props.posts.map((post,index)=>{
                    let likeColor = post.liked ? "blue" : "#aaa"
                    return (
                        <div key={post._id} style={{    margin: "25px 10px"}} > 
                            <div>{post.postText}</div>
                            <div>
                                <img style={{width:"300px"}} src={post.img} alt="uuuu" />
                            </div>
                            <div>
                                <span style={{color:likeColor}} >
                                    <i onClick={()  =>props.sendLike(post._id,index) } className="fas fa-heart pointer"></i>
                                    <span>{post.likes} </span>
                                </span>
                                <span style={{color:"#aaa"}}>
                                    <i className="fas fa-comment"></i>
                                    <span>{post.comments.length} </span>
                                </span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    ) 
}

export default PostList;