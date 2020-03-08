import React, {useEffect, useState} from "react";
import { useInputs, useStateWithLocalStorage } from "../utility/customHooks";
import image from './../css/Assets/bytesLogo.jpg'
import image2 from '../css/Assets/group.jpg'
import {Link} from "react-router-dom"
import axios from "axios"

const LogIn = () => {
    const userName = useInputs("")
    const password = useInputs("")
    
const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
        axios.post(
            "http://localhost:3001/username",
            
            {
                user:{
                    userName: userName,
                    password: password

                    }
                }
            )

        }catch(err){
            console.log(err)
        }
        debugger
    }



    return (
        <div class="grid-container">
            <div class="GroupPicture">
            <img src={image2} alt="" className="group"/>
            </div>

             <div class="login">
             <form className="logInPage" onSubmit = {handleSubmit}>
                <img src={image} alt="" className="logo"/> 
                <h1> Log In To Byte Into Your Friend's Culinary Arts. </h1>
                <input type="text" placeholder="User Name" required {...userName}/>
                <input type="text" placeholder="Password" type="password" required {...password}/>
                <h5>Upload Profile Picture</h5>
               
                <input type="submit" className="submit"/>

                
                
            </form>

             </div>
        </div>
    )
}

export default LogIn;