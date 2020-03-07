import React from "react";
import { NavLink } from "react-router-dom";
import "../css/NavBar.css";

const NavBar = () => {
    return(
        <nav>
            <NavLink exact to={"/"}>Home</NavLink>
            <NavLink to={"/profile"}>Profile</NavLink>
            <NavLink to={"/login"}>Sign Out</NavLink>
            <NavLink to={"/signup"}>Sign up</NavLink>
        </nav>
    )
}

export default NavBar;