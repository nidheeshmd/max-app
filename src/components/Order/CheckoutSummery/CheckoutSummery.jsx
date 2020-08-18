import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import styles from './CheckoutSummery.module.css';
const checkoutSummery = (props) => {

    return(
        <div className={styles.CheckoutSummery} style={{textAlign:'center'}}>
            <h1>WE hope it tastes well</h1>
            <div style ={{width: '100%', margin: 'auto'}}>
                <Burger ingredients = {props.ingredients}/>
            </div>
            <div style={{textAlign:'center'}}>
                <Button
                btnType='Danger'
                clicked = { props.checkoutCancelled } >CANCEL</Button>
                <Button
                btnType='Success'
                clicked = { props.checkoutContinued } >CONTINUE</Button>
            </div>
        </div>
    );

};export default checkoutSummery;