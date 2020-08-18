import React from 'react';
import {withRouter} from 'react-router-dom';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
           return( <BurgerIngredient key={igKey + i} type={igKey}/>);
        });
    })
    .reduce((preValue, curValue) => {
        return preValue.concat(curValue);
    },[]);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    //Object.keys convert object to array.
    //Array() fnction create a new array eg: Array(3) creates an array with 3 empty items
    //[...Array(props.ingredients[igKey]) this create a new array
    //reduce is an array method with 2 default arguments. the previous value and the current value. [] this is the initial value.
    return( 
        <div  className={styles.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default withRouter(burger);