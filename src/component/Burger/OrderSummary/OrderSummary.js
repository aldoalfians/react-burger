import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredient).map((igKey) => (
		<li key={igKey}>
			<span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
			{props.ingredient[igKey]}
		</li>
	));

	return (
		<Auxiliary>
			<div>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p>
					<strong>Total Price: {props.price.toFixed(2)}</strong>
				</p>
				<p>Continue to Checkout?</p>
			</div>

			<Button btnType="Danger" clicked={props.purchaseCancelled}>
				Cancel
			</Button>
			<Button btnType="Success" clicked={props.purchaseContinued}>
				Continue
			</Button>
		</Auxiliary>
	);
};

export default OrderSummary;

// Before using functional component

// class OrderSummary extends Component {
// 	render() {
// 		const ingredientSummary = Object.keys(this.props.ingredient).map(
// 			(igKey) => (
// 				<li key={igKey}>
// 					<span style={{ textTransform: "capitalize" }}>{igKey}</span>
// 					: {this.props.ingredient[igKey]}
// 				</li>
// 			)
// 		);

// 		return (
// 			<Auxiliary>
// 				<div>
// 					<h3>Your Order</h3>
// 					<p>A delicious burger with the following ingredients:</p>
// 					<ul>{ingredientSummary}</ul>
// 					<p>
// 						<strong>
// 							Total Price: {this.props.price.toFixed(2)}
// 						</strong>
// 					</p>
// 					<p>Continue to Checkout?</p>
// 				</div>

// 				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>
// 					Cancel
// 				</Button>
// 				<Button
// 					btnType="Success"
// 					clicked={this.props.purchaseContinued}
// 				>
// 					Continue
// 				</Button>
// 			</Auxiliary>
// 		);
// 	}
// }

// export default OrderSummary;
