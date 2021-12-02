import React, {useEffect, useState} from "react";
import axios from "axios"
import SearchBar from "./helpme/hashtagSearch"
import FeedIndex from "./helpme/feedIndex"
import UserDisplay from "./helpme/userInfo"
import CreatePost from "../component/createPost";
import "../css/home.css"
import image from './../css/Assets/bytesLogo.jpg';
import {apiUrl} from '../utility/apiUrl'

const Home = () => {


    const [posts, setPosts ] = useState([])
    const [userInfo, setUserInfo ] = useState([])
    const API = apiUrl()
    
    const getPosts = async (str="") =>{
        try{
            let res = await axios.post(`${API}/hashtag/getHashtag`, {hashtag: str})
            
            let postArr = res.data.payload
            if(postArr.length === 0 ){
                setPosts([{
                    pictures: "https://cdn.windowsreport.com/wp-content/uploads/2019/02/Ddkmd.sys-blue-screen-errors-in-Windows.jpg",
                    captions:"No Results Found"}])
            } else{
                setPosts(res.data.payload)
            }
            
        }catch(err){
            console.log(err)
            setPosts([])
        }
    }
    
    useEffect(()=>{
        getPosts()
    },[])

    const handleSubmit = (str) =>  {getPosts(str)}

    const getUserProfile = async () =>{
        try{
            let user = localStorage.getItem("currentUserID")
           
            let res = await axios.get(`${API}/users/${user}`)
    
            setUserInfo(res.data.payload)
         } catch (err){ 
            console.log(err)
            setUserInfo([])

        }
     }

     useEffect(()=>{
        getUserProfile()
    },[])

    return(
        <div className="home-container">
            <div className="Logo">
                <img src={image} className="picture" alt="" />
            </div>
            <div className="Banner">
                <div className="Search">
                    <SearchBar handleSubmit={handleSubmit} />
                </div>
            </div>
            <div className="UserInfo">
                <UserDisplay userInfo = {userInfo} />
            </div>
            <div className="UserFeed">
                <div className="Header">
                </div>
                <div className="left">
                <div className="createPost">
                    <CreatePost getPosts={getPosts} />
                </div>
                <div className="HomeFeed">
                    <FeedIndex posts={posts} />
                </div>
                </div>
            </div>
        </div>

    )
} 

export default Home;