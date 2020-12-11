import React from "react";
// import { withRouter } from "react-router-dom";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {
	console.log(props);
	let transformedIngredient = Object.keys(props.ingredient)
		.map((igKey) =>
			[...Array(props.ingredient[igKey])].map((_, i) => (
				<BurgerIngredient key={igKey + i} type={igKey} />
			))
		)
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);
	if (transformedIngredient.length === 0) {
		transformedIngredient = <p>Please start adding ingredient</p>;
	}
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredient}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
