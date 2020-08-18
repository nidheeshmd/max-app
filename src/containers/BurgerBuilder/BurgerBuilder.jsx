import React from 'react';
import { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import SpinnerSummery from '../../components/UI/Spinner/Spinner';

import Auxiliary from '../../HOC/Auxiliary';

import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


class BurgerBuilder extends Component {

   

    constructor(props){
        super(props);
        this.state = {
            /*ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },*/
            ingredients:null,// when dynamically loading ingredients
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        }
        axiosInstance.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error:true});
        });//causes an error(chapter 10 of tutorial)‚
    }

    updatePurchaseState = (ingredients) => {
        //const ingredients = { ...this.state.ingredients};
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0); // here el = ingredients[igKey]
        this.setState({ purchasable: sum > 0 })// return true or false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients }; // making a copy of our state to mutate our state.abs
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const OldPrice = this.state.totalPrice;
        const newPrice = OldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients }; // making a copy of our state to mutate our state.abs
        updatedIngredients[type] = updatedCount;
        const priceReduction = INGREDIENT_PRICE[type];
        const OldPrice = this.state.totalPrice;
        const newPrice = OldPrice - priceReduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //alert('You continue!');
        /**/

            const queryParams = [];
            for(let ingredient in this.state.ingredients){
                queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient]));
                //encodeURIComponent - javascript function that encode string that needed to as URL
            }
            queryParams.push('price=' + this.state.totalPrice);
            const queryString = queryParams.join('&');
            this.props.history.push({
               pathname: '/checkout',
                search: '?' + queryString
            });
    }


    render() {

        const disabledInfo = { ...this.state.ingredients }; //copying the state into new variable to not overwrite the present one.
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };
        /* 'disabledInfo[key] <= 0' this returns true or false based on the value
        so at the end the variable 'disabledInfo[key] get true or false*/

        let varOrderSummery = null;
        if (this.state.loading) {
            varOrderSummery = <SpinnerSummery />
        }
        let burger = this.state.error ? <p>Ingrdients can't be loaded!</p> : <SpinnerSummery/>
        if(this.state.ingredients){
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler} />
                </Auxiliary>
            );

            varOrderSummery = <OrderSummery
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {varOrderSummery}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
};

export default withErrorHandler(BurgerBuilder, axiosInstance);