import React,{useEffect, useState} from "react";
import axios from 'axios';
import { apiUrl } from "../utility/apiUrl";
import "../css/Profile.css";
import image from './../css/Assets/bytesLogo.jpg';
import CreatePost from "./createPost"
import EditProfile from "./editProfile"
import SearchBar from "./helpme/hashtagSearch";

const Profile = () => {
    const [info, setInfo] = useState({});
    const [feed, setFeed] = useState([]);
    const user_id= localStorage.getItem("currentUserID");
    const API = apiUrl();
    const fetchUserInfo = async () => {
        try {
            let res = await axios.get(`${API}/users/${user_id}`)
            setInfo(res.data.payload)
        } catch(err){
            console.log(err)
            setInfo([])
        }
    }
        useEffect(() => {
            fetchUserInfo()
        }, [])

    const fetchUsersFeed = async () => {
        debugger
        try {
            let res = await axios.get(`${API}/posts/${user_id}`);
            setFeed(res.data.payload)
        }catch(err){
            console.log(err)
            setFeed([])
        }
    }
        useEffect(() => {
            fetchUsersFeed()
        }, [])
    const  showInfo = (obj) =>{
        return (
            <div>
                <h2>{obj.username}</h2>
                <img src={obj.user_pic} alt="" className="profileImg" />
                <h3>{obj.firstname} {obj.lastname}</h3>
                <p>{obj.email}</p>
            </div>
        )
    }
    const showFeed = feed.map(post => {
        return <div className="post"><div key={post.id}><img src={post.pictures} className="postPicture" alt=""/><p>{post.captions}</p></div></div>
    })
    return (
        <div className="profile-container">
            <div className="Logo">
                <img src={image} alt="" className="picture"/>
            </div>
            <div className="Banner">
            <div className="Search">
                <SearchBar />
            </div>
            </div>
            <div className="UserInfo">
                {showInfo(info)}
                <EditProfile fetchUserInfo= {fetchUserInfo}/>
            </div>
            <div className="UserFeed">
            <div className="ProHeader">
            </div>
                <div className="Feed">
                <div className="newPost">
                <CreatePost fetchUsersFeed={fetchUsersFeed}/>
                </div>
                    {showFeed}
                </div>
            </div>
        </div>
    )
}
export default Profile;