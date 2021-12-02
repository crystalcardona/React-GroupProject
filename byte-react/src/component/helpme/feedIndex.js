import React from "react"

const FeedIndex =({posts})=>{
    debugger
  
    const displayResults = posts.map(post=>{
        return(
            <div className="post" key={post.id}>
                <div className="usersProfilePic">
                    <img src= {post.user_pic} alt="" className="posterPic"></img>
                    <h5>{post.username}</h5>
                </div>
                <div className="usersPost">
                    <img src= {post.pictures} className="postPic" alt=""></img>
                    <div className="caption">
                        <label>{post.captions}</label>
                        
                    </div>
                </div>
            </div>
        )
    })

    return(
        <>
        {displayResults}
        </>
    )

}
export default FeedIndex
