import React, { Component } from "react";
import { connect } from "react-redux";

import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../component/Burger/Burger";
import BuildControls from "../../component/Burger/BuildControls/BuildControls";
import Modal from "../../component/UI/Modal/Modal";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import OrderSummary from "../../component/Burger/OrderSummary/OrderSummary";
import Spinner from "../../component/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import * as burgerBuilderActions from "../../store/actions/index";

// const INGREDIENT_PRICES = {
// 	salad: 0.5,
// 	cheese: 0.4,
// 	meat: 1.7,
// 	bacon: 0.7,
// };

export class BurgerBuilder extends Component {
	state = {
		// ingredient: null
		// totalPrice : 0,
		// purchasable: false,
		purchasing: false,
		// loading: false,
		// error: false,
	};

	componentDidMount() {
		console.log(this.props);
		this.props.onInitIngredients();
		// axios
		// 	.get("https://react-my-burger-d207b.firebaseio.com/ingredient.json")
		// 	.then((response) => {
		// 		this.setState({ ingredient: response.data });
		// 	})
		// 	.catch((error) => {
		// 		this.setState({ error: true });
		// 	});
	}

	// addIngredientHandler = (type) => {
	// 	const oldCount = this.state.ingredient[type];
	// 	const updatedCount = oldCount + 1;
	// 	const updatedIngredient = {
	// 		...this.state.ingredient,
	// 	};
	// 	updatedIngredient[type] = updatedCount;
	// 	const priceAddition = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice + priceAddition;
	// 	this.setState({ totalPrice: newPrice, ingredient: updatedIngredient });
	// 	this.updatePurchaseState(updatedIngredient);
	// };

	// removeIngredientHandler = (type) => {
	// 	const oldCount = this.state.ingredient[type];
	// 	const updatedCount = oldCount - 1;
	// 	const updatedIngredient = {
	// 		...this.state.ingredient,
	// 	};
	// 	updatedIngredient[type] = updatedCount;
	// 	const priceDeduction = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice - priceDeduction;
	// 	this.setState({ totalPrice: newPrice, ingredient: updatedIngredient });
	// 	this.updatePurchaseState(updatedIngredient);
	// };
	updatePurchaseState(ingredient) {
		const sum = Object.keys(ingredient)
			.map((igKey) => ingredient[igKey])
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		// this.setState({ purchasable: sum > 0 });
		// no setState
		return sum > 0;
	}

	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetAuthRedirectPath("/checkout");
			this.props.history.push("/auth");
		}
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		// alert("Thank you!");

		// const queryParams = [];
		// for (let i in this.state.ingredient) {
		// 	queryParams.push(
		// 		encodeURIComponent(i) +
		// 			"=" +
		// 			encodeURIComponent(this.state.ingredient[i])
		// 	);
		// }
		// queryParams.push("price=" + this.state.totalPrice);
		// const queryString = queryParams.join("&");
		// this.props.history.push({
		// 	pathname: "/checkout",
		// 	search: "?" + queryString,
		// });

		// use redux
		this.props.onInitPurchase();
		this.props.history.push("/checkout");
	};

	render() {
		const disableInfo = {
			// ...this.state.ingredient, no use reudux
			...this.props.ings,
		};
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = this.props.error ? (
			<p>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		);

		if (this.props.ings) {
			// seblumnya this.state.ingredient
			burger = (
				<Auxiliary>
					<Burger ingredient={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disableInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
						isAuth={this.props.isAuthenticated}
						price={this.props.price}
					/>
				</Auxiliary>
			);
			orderSummary = (
				<OrderSummary
					ingredient={this.props.ings}
					price={this.props.price}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
				/>
			);
		}
		// if (this.state.loading) {
		// 	orderSummary = <Spinner />;
		// }

		return (
			<Auxiliary>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Auxiliary>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredient,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) =>
			dispatch(burgerBuilderActions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) =>
			dispatch(burgerBuilderActions.removeIngredient(ingName)),
		onInitIngredients: () => {
			dispatch(burgerBuilderActions.initIngredients());
		},
		onInitPurchase: () => {
			dispatch(burgerBuilderActions.purchaseInit());
		},
		onSetAuthRedirectPath: (path) => {
			dispatch(burgerBuilderActions.setAuthRedirectPath(path));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
