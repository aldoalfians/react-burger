import * as actionTypes from "./actionTypes";

// ini masih synchronous
export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData,
	};
};

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error,
	};
};

// use asynchronous

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	};
};

// asynchronous use redux - thunk
export const purchaseBurger = (orderData, token) => {
	return {
		type: actionTypes.PURCHASE_BURGER,
		orderData: orderData,
		token: token,
	};
	// Sudah tidak digunakan karena redux-saga
	// return (dispatch) => {
	// 	dispatch(purchaseBurgerStart());
	// 	axios
	// 		.post("/orders.json?auth=" + token, orderData)
	// 		.then((response) => {
	// 			console.log(response.data);
	// 			dispatch(purchaseBurgerSuccess(response.data.name, orderData));
	// 		})
	// 		.catch((error) => {
	// 			dispatch(purchaseBurgerFail(error));
	// 		});
	// };
};

// ini mengirimkan halaman ke home burger setelah checkout
export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	};
};

// FETCHING ORDERS to page 2
export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders,
	};
};

export const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error,
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

export const fetchOrders = (token, userId) => {
	return {
		type: actionTypes.FETCH_ORDERS,
		token: token,
		userId: userId,
	};
	// sudah tidak digunakan karena redux-saga
	// return (dispatch) => {
	// dispatch(fetchOrdersStart());
	// const queryParams =
	// 	"?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
	// axios
	// 	.get("/orders.json" + queryParams)
	// 	.then((res) => {
	// 		const fetchedOrders = [];
	// 		for (let key in res.data) {
	// 			fetchedOrders.push({
	// 				...res.data[key],
	// 				id: key,
	// 			});
	// 		}
	// 		dispatch(fetchOrdersSuccess(fetchedOrders));
	// 	})
	// 	.catch((err) => {
	// 		dispatch(fetchOrdersFail(err));
	// 	});
	// };
};
