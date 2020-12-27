import React, { useEffect } from "react";
import { connect } from "react-redux";
import Order from "../../component/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../component/UI/Spinner/Spinner";

const Orders = (props) => {
	const { onFetchOrders } = props;

	useEffect(() => {
		onFetchOrders(props.token, props.userId);
	}, [onFetchOrders]);

	let orders = <Spinner />;
	if (!props.loading) {
		orders = props.orders.map((order) => (
			<Order
				key={order.id}
				ingredient={order.ingredient}
				price={order.price}
			/>
		));
	}
	return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: (token, userId) =>
			dispatch(actions.fetchOrders(token, userId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));

// Before using functional component
// class Orders extends Component {
// 	// state = {
// 	// 	orders: [],
// 	// 	loading: true,
// 	// };

// 	componentDidMount() {
// 		this.props.onFetchOrders(this.props.token, this.props.userId);
// 		// sudah tidak digunakan karena redux
// 		// axios
// 		// 	.get("/orders.json")
// 		// 	.then((res) => {
// 		// 		const fetchedOrders = [];
// 		// 		for (let key in res.data) {
// 		// 			fetchedOrders.push({
// 		// 				...res.data[key],
// 		// 				id: key,
// 		// 			});
// 		// 		}
// 		// 		this.setState({ loading: true, orders: fetchedOrders });
// 		// 	})
// 		// 	.catch((err) => {
// 		// 		this.setState({ loading: false });
// 		// 	});
// 	}

// 	render() {
// 		let orders = <Spinner />;
// 		if (!this.props.loading) {
// 			orders = this.props.orders.map((order) => (
// 				<Order
// 					key={order.id}
// 					ingredient={order.ingredient}
// 					price={order.price}
// 				/>
// 			));
// 		}
// 		return <div>{orders}</div>;
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		orders: state.order.orders,
// 		loading: state.order.loading,
// 		token: state.auth.token,
// 		userId: state.auth.userId,
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onFetchOrders: (token, userId) =>
// 			dispatch(actions.fetchOrders(token, userId)),
// 	};
// };

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(withErrorHandler(Orders, axios));
