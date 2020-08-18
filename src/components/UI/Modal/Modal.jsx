import React, { Component } from 'react';

import Auxiliary from '../../../HOC/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.module.css';

class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.show !== this.props.show || nextProps.children !== this.props.children){
            return true;
        }
        else{
            return false;
        }
    }
    render(){
    return(
        <Auxiliary>
            <Backdrop show = {this.props.show} clicked={this.props.modalClosed}></Backdrop>
            <div 
            className={styles.Modal}
            style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(100vh)',
                opacity: this.props.show ? '1' : '0'
            }}
            >
                {this.props.children}
            </div>
        </Auxiliary>
    );
};
};

export default Modal;
