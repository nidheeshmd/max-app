import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import axiosInstance from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

//import styles from './contactData.module.css';
import styles from './ContactData.module.css';

class ContactData extends Component{
    state = {
        /*name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },*/
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '' ,
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}],
                    placeholder: 'Delivery Type'
                },
                value: '',
                validation: {
                    //no validations
                },
                valid: true
            }
        },
        loading: false,
        stateFormIsValid: false
    }

    checkValidity(value, rules){
        let isValid = true;
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = (value.trim() !== '' && isValid);
        }

        if(rules.minLength){
            isValid = (value.length >= rules.minLength && isValid);
        }

        if(rules.maxLength){
            isValid = (value.length <= rules.maxLength && isValid);
        }
        return isValid;
    }

    orderHandler = (event)=>{
        event.preventDefault();
        //console.log(this.props.ingredients);
        this.setState({ loading: true });
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            //here the 'value' is from state, not a property.
        }
        const OrderDtls = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axiosInstance.post('/orders.json', OrderDtls)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    };

    inputChangedHandler =(event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement ={
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, stateFormIsValid: formIsValid});
    }

    render(){
        const forElementArray = [];
        for(let key in this.state.orderForm){
            forElementArray.push({
                id:key,
                confiq: this.state.orderForm[key]
            });
        }
console.log(this.state.stateFormIsValid);
        let varForm =(
            <form onSubmit={this.orderHandler}>
               {/*<input className={ styles.Input } type='text' name ='name' placeholder='Your name'/>
                <input className={ styles.Input } type='email' name ='email' placeholder='Your email'/>
                <input className={ styles.Input } type='text' name ='street' placeholder='Street'/>
                <input className={ styles.Input } type='text' name ='postal' placeholder='Postal Code'/>*/}

                {
                    forElementArray.map(formElement => (
                        
                        <Input key={formElement.key}
                        elementType={formElement.confiq.elementType} 
                        elementConfig={formElement.confiq.elementConfig} 
                        value ={formElement.confiq.value}
                        invalid = {!formElement.confiq.valid}
                        shouldValidate={formElement.confiq.validation}
                        touched = {formElement.confiq.touched}
                        changed={(event) => this.inputChangedHandler(event,formElement.id)}/>
                    ))
                }
                <Button btnType='Success' disabled={!this.state.stateFormIsValid} clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            varForm=<Spinner/>
        }
    return(
        <div className={styles.ContactData}>
            <h4>Enter your Contact data</h4>
            {varForm}
        </div>
    );
}
};

export default withRouter(ContactData);