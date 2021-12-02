import React, {useState} from 'react';
import axios from 'axios';
import { useInputs } from "../utility/InputHooks";
import { apiUrl } from "../utility/apiUrl";
const CreatePost = ({fetchUsersFeed, getPosts}) => {
    const API = apiUrl();
    const caption = useInputs("")
    const [picture, setPicture] = useState("");
    const user_id= localStorage.getItem("currentUserID")

    const uploadPicture = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0])
        data.append('upload_preset', 'BytesReact');
        data.append('cloud_name', 'dbhncpu02')
        // setLoading(true)
        let res = await fetch("https://api.cloudinary.com/v1_1/dbhncpu02/image/upload", {
            method: 'Post',
            body: data
            }
        )
        const file = await res.json()
        setPicture(file.secure_url)
        // setLoading(false)
    }
    const handlePostSubmit = async (e) => {
        e.preventDefault()
        try {
        let res = await axios.post(`${API}/posts/`, {
                user_id: user_id,
                pictures: picture,
                captions: caption.value
        })
        let postID = res.data.payload.id
        debugger
        let arrCaption = (caption.value.split(' '));
        getHashtag(arrCaption, postID)
        if(getPosts) {
            getPosts()
        } else {
            fetchUsersFeed()
        }
        }catch(err){
            console.log(err)
        }
    }
    const getHashtag = async (arr, postID) => {
        debugger
        let newHash
        arr.forEach((word) =>{
            if(word[0] === "#"){
                newHash = word
         }
       })
       try{
           await axios.post(`${API}/hashtag/`, { post_id:postID, hashtag:newHash });
     } catch (err){
         console.log(err)
    }
}
    return (
            <>
            <form onSubmit ={handlePostSubmit} className="UserFeed">
                <input type="text" placeholder="Enter A Caption!" {...caption}/>
                 <input type="file" onChange={uploadPicture}/>
                <button type="submit" > Post Bytes </button>
            </form>
            </>
    )
}
export default CreatePost;
