// using Redux saga
import { delay } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actions from "../actions/index";

export function* logoutSaga(action) {
	// // Using call
	// yield call([localStorage, "removeItem"], "token");
	// yield call([localStorage, "removeItem"], "expirationDate");
	// yield call([localStorage, "removeItem"], "userId");
	// tanda bintang penting
	yield localStorage.removeItem("token"); // di depan wajib yield
	yield localStorage.removeItem("expirationDate");
	yield localStorage.removeItem("userId");
	yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expirationTime * 1000);
	yield put(actions.logout());
}

export function* authUserSaga(action) {
	yield put(actions.authStart());
	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true,
	};
	let url =
		"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVKHisiTbhcUmaO53CrSuXJ_09rvTDB1Y";
	if (!action.isSignUp) {
		url =
			"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVKHisiTbhcUmaO53CrSuXJ_09rvTDB1Y";
	}
	try {
		const response = yield axios.post(url, authData);

		const expirationDate = yield new Date(
			new Date().getTime() + response.data.expiresIn * 1000
		);
		yield localStorage.setItem("token", response.data.idToken);
		yield localStorage.setItem("expirationDate", expirationDate);
		yield localStorage.setItem("userId", response.data.userId);
		yield put(
			actions.authSuccess(response.data.idToken, response.data.localId)
		);
		yield put(actions.checkAuthTimeout(response.data.expiresIn));
	} catch (error) {
		yield put(actions.authFail(error.response.data.error));
	}
}

export function* authCheckStateSaga(action) {
	const token = yield localStorage.getItem("token");
	if (!token) {
		yield put(actions.logout());
	} else {
		const expirationDate = yield new Date(
			yield localStorage.getItem("expirationDate")
		);
		if (expirationDate <= new Date()) {
			yield put(actions.logout());
		} else {
			const userId = yield localStorage.getItem("userId");
			yield put(actions.authSuccess(token, userId));
			yield put(
				actions.checkAuthTimeout(
					expirationDate.getTime() - new Date().getTime() / 1000
				)
			);
		}
	}
}
