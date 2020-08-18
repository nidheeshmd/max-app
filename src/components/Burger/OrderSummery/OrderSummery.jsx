import React, { Component } from 'react';

import Auxiliary from '../../../HOC//Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummery extends Component {
    render() {
        const ingredientSummery = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ testTransform: 'capitalize' }}>{igKey}</span>:{this.props.ingredients[igKey]}
                    </li>
                );
            });
        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious buger with the following ingredients:</p>
                <ul>
                    {ingredientSummery}
                </ul>
                <p><strong>total Prince:</strong>{this.props.price.toFixed(2)}</p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Auxiliary>
        );
    };
};

export default OrderSummery;