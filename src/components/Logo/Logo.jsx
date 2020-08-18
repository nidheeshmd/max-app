import React from 'react';

import appLogo from '../../assets/Images/burger-logo.png'

import styles from './Logo.module.css';

const logo = (props) => {
    return(
        <div className={styles.Logo} style={{height: props.height}}>
            <img src={appLogo} alt='logo'/>
        </div>
    );
}

export default logo;