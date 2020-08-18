import React from 'react';

import  Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../HOC/Auxiliary';

import styles from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let attachedClasses = [styles.SideDrawer, styles.Close];
    if(props.open){
        attachedClasses = [styles.SideDrawer, styles.Open];
    }
    return(
    <Auxiliary>
        <Backdrop show ={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <Logo height ='5%'/>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
    </Auxiliary>
    );
};

export default sideDrawer;