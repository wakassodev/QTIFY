import React from 'react';
import styles from "./Logo.module.css";
import logo from "../../assets/logo.png.png";

function Logo() {

    return <>
        <img src={logo} alt="logo" className={styles.logo}/>
    </>
}

export default Logo;