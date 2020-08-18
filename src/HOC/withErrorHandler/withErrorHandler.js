import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary';
const withErrorHandler = ( WrappedComponent, axiosInstance) => {
    return class extends Component{
        state = {
            error: null
        }

        componentDidMount(){
          this.reqInterceptor =  axiosInstance.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });
          this.resInterceptor =  axiosInstance.interceptors.response.use(res => res ,error => {
                this.setState({error: error})
            }); /*res => res means it return the 'res' same as the above req*/
        }

        componentWillUnmount(){
            axiosInstance.interceptors.request.eject(this.reqInterceptor);
            axiosInstance.interceptors.response.eject(this.resInterceptor);

        }

        errorConfirmedHandler = () =>{
            this.setState({error: null});
        }

        render(){
            return(
                <Auxiliary>
                    <Modal 
                    show = {this.state.error}
                    modalClosed = {this.errorConfirmedHandler}
                    >{this.state.error ? this.state.error.message : null}</Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            )
        }
    }
};

export default withErrorHandler;