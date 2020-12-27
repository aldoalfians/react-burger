import React from "react";
import { connect } from "react-redux";
import CheckoutSummary from "../../component/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
	const checkoutCancelledHandler = () => {
		props.history.goBack();
	};

	const checkoutContinuedHandler = () => {
		props.history.replace("/checkout/contact-data");
	};

	let summary = <Redirect to="/" />;
	if (props.ings) {
		const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
		summary = (
			<div className={classes.Checkout}>
				{purchasedRedirect}
				<CheckoutSummary
					ingredient={props.ings}
					checkoutCancelled={checkoutCancelledHandler}
					checkoutContinued={checkoutContinuedHandler}
				/>
				<Route
					path={props.match.path + "/contact-data"}
					component={ContactData}
				/>
			</div>
		);
	}
	return summary;
};

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredient,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(Checkout);

// note: use before redux
// // <div className={classes.Checkout}>

// 				{/* <Route */}
// 					{/* path={this.props.match.path + "/contact-data"} */}
// 					{/* // render={(props) => ( */}
// 					{/* // 	<ContactData */}
// 					{/* // 		ingredient={this.state.ingredient}
// 					// 		price={this.state.totalPrice}
// 					// 		{...props}
// 					// 	/>
// 					// )} // SUDAH TIDAK DIGUNAKAN KARENA REDUX
// 				// 	component={ContactData}
// 				// /> */}
// 			// </div>

// class Checkout extends Component {
// 	// state = {
// 	// 	ingredient: null,
// 	// 	price: 0,
// 	// };

// 	// componentWillMount() {

// 	//sudah tidak dibutuhkan karena redux

// 	// 	const query = new URLSearchParams(this.props.location.search);
// 	// 	const ingredient = {};
// 	// 	let price = 0;
// 	// 	for (let param of query.entries()) {
// 	// 		// ["salad", '1] isinya
// 	// 		if (param[0] === "price") {
// 	// 			price = param[1];
// 	// 		} else {
// 	// 			ingredient[param[0]] = +param[1];
// 	// 		}
// 	// 	}
// 	// 	this.setState({ ingredient: ingredient, totalPrice: price });
// 	// }

// 	checkoutCancelledHandler = () => {
// 		this.props.history.goBack();
// 	};

// 	checkoutContinuedHandler = () => {
// 		this.props.history.replace("/checkout/contact-data");
// 	};
// 	render() {
// 		let summary = <Redirect to="/" />;
// 		if (this.props.ings) {
// 			const purchasedRedirect = this.props.purchased ? (
// 				<Redirect to="/" />
// 			) : null;
// 			summary = (
// 				<div className={classes.Checkout}>
// 					{purchasedRedirect}
// 					<CheckoutSummary
// 						ingredient={this.props.ings}
// 						checkoutCancelled={this.checkoutCancelledHandler}
// 						checkoutContinued={this.checkoutContinuedHandler}
// 					/>
// 					<Route
// 						path={this.props.match.path + "/contact-data"}
// 						component={ContactData}
// 					/>
// 				</div>
// 			);
// 		}
// 		return summary;
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		ings: state.burgerBuilder.ingredient,
// 		purchased: state.order.purchased,
// 	};
// };

// export default connect(mapStateToProps)(Checkout);
