import * as actionTypes from "./actionTypes";

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const logout = () => {
	// comment Because redux
	// localStorage.removeItem("token");
	// localStorage.removeItem("expirationDate");
	// localStorage.removeItem("userId");
	return {
		// type: actionTypes.AUTH_LOGOUT, replace using redux
		type: actionTypes.AUTH_INITIATE_LOGOUT,
	};
};

export const logoutSucceed = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

// Agar token tidak 1 jam saja
export const checkAuthTimeout = (expirationTime) => {
	return {
		type: actionTypes.AUTH_CHECK_TIMEOUT,
		expirationTime: expirationTime,
	};
	// sudah tidak gunakan karena using redux-saga
	// return (dispatch) => {
	// 	setTimeout(() => {
	// 		dispatch(logout());
	// 	}, expirationTime * 1000);
	// };
};

export const auth = (email, password, isSignUp) => {
	return {
		type: actionTypes.AUTH_USER,
		email: email,
		password: password,
		isSignUp: isSignUp,
	};

	// sudah tidak diguanaka karena redux saga
	//return dispatch =>{
	// dispatch(authStart());
	// const authData = {
	// 	email: email,
	// 	password: password,
	// 	returnSecureToken: true,
	// };
	// let url =
	// 	"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVKHisiTbhcUmaO53CrSuXJ_09rvTDB1Y";
	// if (!isSignUp) {
	// 	url =
	// 		"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVKHisiTbhcUmaO53CrSuXJ_09rvTDB1Y";
	// }
	// axios
	// 	.post(url, authData)
	// 	.then((response) => {
	// 		console.log(response);
	// 		const expirationDate = new Date(
	// 			new Date().getTime() + response.data.expiresIn * 1000
	// 		);
	// 		localStorage.setItem("token", response.data.idToken);
	// 		localStorage.setItem("expirationDate", expirationDate);
	// 		localStorage.setItem("userId", response.data.userId);
	// 		dispatch(
	// 			authSuccess(response.data.idToken, response.data.localId)
	// 		);
	// 		dispatch(checkAuthTimeout(response.data.expiresIn));
	// 	})
	// 	.catch((err) => {
	// 		dispatch(authFail(err.response.data.error));
	// 	});
	//}
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const authCheckState = () => {
	return {
		type: actionTypes.AUTH_CHECK_STATE,
	};

	// Sudah tidak digunakan karena redux saga
	// return (dispatch) => {
	// const token = localStorage.getItem("token");
	// if (!token) {
	// 	dispatch(logout());
	// } else {
	// 	const expirationDate = new Date(
	// 		localStorage.getItem("expirationDate")
	// 	);
	// 	if (expirationDate <= new Date()) {
	// 		dispatch(logout());
	// 	} else {
	// 		const userId = localStorage.getItem("userId");
	// 		dispatch(authSuccess(token, userId));
	// 		dispatch(
	// 			checkAuthTimeout(
	// 				expirationDate.getTime() - new Date().getTime() / 1000
	// 			)
	// 		);
	// 	}
	// }
	//};
};
