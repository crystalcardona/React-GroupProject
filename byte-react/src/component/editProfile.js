import React, {useState} from 'react';
import axios from 'axios';
import { useInputs } from "../utility/InputHooks";
import { apiUrl } from "../utility/apiUrl";
import Popup from 'reactjs-popup';

const EditProfile = ({fetchUserInfo}) => { 
    const username = useInputs("")
    const [userPic, setUserPic] = useState("")
    const [loading, setLoading] = useState(false)

    const user_id= localStorage.getItem("currentUserID")
    const API = apiUrl();

    const uploadPicture = async (e) => {
        const files = e.target.files;
        const data = new FormData(); 
        
        data.append('file', files[0])
        data.append('upload_preset', 'BytesReact');
        data.append('cloud_name', 'dbhncpu02')
        setLoading(true)

        let res = await fetch("https://api.cloudinary.com/v1_1/dbhncpu02/image/upload", {
            method: 'Post',
            body: data
            }
        )
        const file = await res.json()
        setUserPic(file.secure_url)
        setLoading(false)
    }


    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${API}/users/${user_id}`, {userName:username.value, user_pic:userPic})
            fetchUserInfo()
        } catch(err){
            console.log(err)
        }
    }


    return (
        <>
        <Popup trigger={<button className="Pop">Change Profile</button>} position="right center">
            <div>
                <form onSubmit={updateProfile}>
                    <label>
                        Edit username:
                    </label>
                    <input type="text" placeholder="Change Username" {...username}/>
                    <br></br>
                    <label>
                        Edit pic:
                    </label>
                    <input type="file" onChange={uploadPicture}/>
                    <input type="submit"/>
                </form>
            </div>
        </Popup>
        </>
    )
}

export default EditProfile;