import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../../component/UI/Button/Button";
import Spinner from "../../../component/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../component/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

const ContactData = (props) => {
	const [orderForm, setOrderForm] = useState({
		name: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Your Name",
			},
			value: "",
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		street: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Street",
			},
			value: "",
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		zipCode: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Zip Code",
			},
			value: "",
			validation: {
				required: true,
				minLength: 5,
				maxLength: 5,
				isNumeric: true,
			},
			valid: false,
			touched: false,
		},
		country: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Country",
			},
			value: "",
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		email: {
			elementType: "input",
			elementConfig: {
				type: "email",
				placeholder: "Your E-Mail",
			},
			value: "",
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		deliveryMethod: {
			elementType: "select",
			elementConfig: {
				options: [
					{ value: "sicepatwet", displayValue: "SicepatWET" },
					{ value: "j&wet", displayValue: "J&WET" },
				],
			},
			value: "sicepatwet",
			validation: {},
			valid: true,
		},
	});
	const [formIsValid, setFormIsValid] = useState(false);

	const orderHandler = (event) => {
		event.preventDefault();

		const formData = {};
		for (let formElementIdentifier in orderForm) {
			formData[formElementIdentifier] =
				orderForm[formElementIdentifier].value;
		}
		// redux
		const order = {
			ingredient: props.ings,
			price: props.price,
			orderData: formData,
			userId: props.userId,
		};
		props.onOrderBurger(order, props.token);
	};

	const inputChangedHandler = (event, inputIdentifier) => {
		const updateFormElement = updateObject(orderForm[inputIdentifier], {
			value: event.target.value,
			valid: checkValidity(
				event.target.value,
				orderForm[inputIdentifier].validation
			),
			touched: true,
		});

		const updateOrderForm = updateObject(orderForm, {
			[inputIdentifier]: updateFormElement,
		});
		let formIsValid = true;
		for (let inputIdentifiers in updateOrderForm) {
			formIsValid =
				updateOrderForm[inputIdentifiers].valid && formIsValid;
		}
		setOrderForm(updateOrderForm);
		setFormIsValid(formIsValid);
	};

	const formElementsArray = [];
	for (let key in orderForm) {
		formElementsArray.push({
			id: key,
			config: orderForm[key],
		});
	}
	let form = (
		<form onSubmit={orderHandler}>
			{formElementsArray.map((formElement) => (
				<Input
					key={formElement.id}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					invalid={!formElement.config.valid}
					shouldValidate={formElement.config.validation}
					touched={formElement.config.touched}
					changed={(event) =>
						inputChangedHandler(event, formElement.id)
					}
				/>
			))}
			<Button btnType="Success" disabled={!formIsValid}>
				ORDER
			</Button>
		</form>
	);
	if (props.loading) {
		form = <Spinner />;
	}
	return (
		<div className={classes.ContactData}>
			<h4>Enter your Contact Data</h4>
			{form}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredient,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData, token) =>
			dispatch(actions.purchaseBurger(orderData, token)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));

// Before using functional component
// class ContactData extends Component {
// 	state = {
// 		orderForm: {
// 			name: {
// 				elementType: "input",
// 				elementConfig: {
// 					type: "text",
// 					placeholder: "Your Name",
// 				},
// 				value: "",
// 				validation: {
// 					required: true,
// 				},
// 				valid: false,
// 				touched: false,
// 			},
// 			street: {
// 				elementType: "input",
// 				elementConfig: {
// 					type: "text",
// 					placeholder: "Street",
// 				},
// 				value: "",
// 				validation: {
// 					required: true,
// 				},
// 				valid: false,
// 				touched: false,
// 			},
// 			zipCode: {
// 				elementType: "input",
// 				elementConfig: {
// 					type: "text",
// 					placeholder: "Zip Code",
// 				},
// 				value: "",
// 				validation: {
// 					required: true,
// 					minLength: 5,
// 					maxLength: 5,
// 					isNumeric: true,
// 				},
// 				valid: false,
// 				touched: false,
// 			},
// 			country: {
// 				elementType: "input",
// 				elementConfig: {
// 					type: "text",
// 					placeholder: "Country",
// 				},
// 				value: "",
// 				validation: {
// 					required: true,
// 				},
// 				valid: false,
// 				touched: false,
// 			},
// 			email: {
// 				elementType: "input",
// 				elementConfig: {
// 					type: "email",
// 					placeholder: "Your E-Mail",
// 				},
// 				value: "",
// 				validation: {
// 					required: true,
// 					isEmail: true,
// 				},
// 				valid: false,
// 				touched: false,
// 			},
// 			deliveryMethod: {
// 				elementType: "select",
// 				elementConfig: {
// 					options: [
// 						{ value: "sicepatwet", displayValue: "SicepatWET" },
// 						{ value: "j&wet", displayValue: "J&WET" },
// 					],
// 				},
// 				value: "sicepatwet",
// 				validation: {},
// 				valid: true,
// 			},
// 		},
// 		formIsValid: false,
// 		// loading: false, // di comment karena redux
// 	};

// 	orderHandler = (event) => {
// 		event.preventDefault();

// 		const formData = {};
// 		for (let formElementIdentifier in this.state.orderForm) {
// 			formData[formElementIdentifier] = this.state.orderForm[
// 				formElementIdentifier
// 			].value;
// 		}
// 		// redux
// 		const order = {
// 			ingredient: this.props.ings,
// 			price: this.props.price,
// 			orderData: formData,
// 			userId: this.props.userId,
// 		};
// 		this.props.onOrderBurger(order, this.props.token);
// 		// ini di comment karena use redux
// 		// axios
// 		// 	.post("/orders.json", order)
// 		// 	.then((response) => {
// 		// 		this.setState({ loading: false });
// 		// 		this.props.history.push("/");
// 		// 	})
// 		// 	.catch((error) => {
// 		// 		this.setState({ loading: false });
// 		// 	});
// 		// console.log(this.props.ingredient);
// 	};

// 	// checkValidity(value, rules) {
// 	// 	let isValid = true;
// 	// 	if (!rules) {
// 	// 		return true;
// 	// 	}
// 	// 	if (rules.required) {
// 	// 		isValid = value.trim() !== "" && isValid;
// 	// 	}
// 	// 	if (rules.minLength) {
// 	// 		isValid = value.length >= rules.minLength && isValid;
// 	// 	}
// 	// 	if (rules.maxLength) {
// 	// 		isValid = value.length <= rules.maxLength && isValid;
// 	// 	}
// 	// 	if (rules.isEmail) {
// 	// 		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
// 	// 		isValid = pattern.test(value) && isValid;
// 	// 	}

// 	// 	if (rules.isNumeric) {
// 	// 		const pattern = /^\d+$/;
// 	// 		isValid = pattern.test(value) && isValid;
// 	// 	}
// 	// 	return isValid;
// 	// }
// 	inputChangedHandler = (event, inputIdentifier) => {
// 		// const updateOrderForm = {
// 		// 	...this.state.orderForm,
// 		// };

// 		// using utility
// 		const updateFormElement = updateObject(
// 			this.state.orderForm[inputIdentifier],
// 			{
// 				value: event.target.value,
// 				valid: checkValidity(
// 					event.target.value,
// 					this.state.orderForm[inputIdentifier].validation
// 				),
// 				touched: true,
// 			}
// 		);

// 		const updateOrderForm = updateObject(this.state.orderForm, {
// 			[inputIdentifier]: updateFormElement,
// 		});

// 		// const updateFormElement = { ...updateOrderForm[inputIdentifier] };
// 		// updateFormElement.value = event.target.value;
// 		// updateFormElement.valid = this.checkValidity(
// 		// 	updateFormElement.value,
// 		// 	updateFormElement.validation
// 		// );
// 		// updateFormElement.touched = true;
// 		// updateOrderForm[inputIdentifier] = updateFormElement;

// 		let formIsValid = true;
// 		for (let inputIdentifiers in updateOrderForm) {
// 			formIsValid =
// 				updateOrderForm[inputIdentifiers].valid && formIsValid;
// 		}

// 		this.setState({ orderForm: updateOrderForm, formIsValid: formIsValid });
// 	};

// 	render() {
// 		const formElementsArray = [];
// 		for (let key in this.state.orderForm) {
// 			formElementsArray.push({
// 				id: key,
// 				config: this.state.orderForm[key],
// 			});
// 		}
// 		let form = (
// 			<form onSubmit={this.orderHandler}>
// 				{formElementsArray.map((formElement) => (
// 					<Input
// 						key={formElement.id}
// 						elementType={formElement.config.elementType}
// 						elementConfig={formElement.config.elementConfig}
// 						value={formElement.config.value}
// 						invalid={!formElement.config.valid}
// 						shouldValidate={formElement.config.validation}
// 						touched={formElement.config.touched}
// 						changed={(event) =>
// 							this.inputChangedHandler(event, formElement.id)
// 						}
// 					/>
// 				))}
// 				<Button btnType="Success" disabled={!this.state.formIsValid}>
// 					ORDER
// 				</Button>
// 			</form>
// 		);
// 		if (this.props.loading) {
// 			form = <Spinner />;
// 		}
// 		return (
// 			<div className={classes.ContactData}>
// 				<h4>Enter your Contact Data</h4>
// 				{form}
// 			</div>
// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		ings: state.burgerBuilder.ingredient,
// 		price: state.burgerBuilder.totalPrice,
// 		loading: state.order.loading,
// 		token: state.auth.token,
// 		userId: state.auth.userId,
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onOrderBurger: (orderData, token) =>
// 			dispatch(actions.purchaseBurger(orderData, token)),
// 	};
// };

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(withErrorHandler(ContactData, axios));
