import * as actionTypes from "./actionTypes";

export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name,
	};
};

export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name,
	};
};

export const setIngredients = (ingredient) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredient: ingredient,
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	};
};

export const initIngredients = () => {
	return {
		type: actionTypes.INIT_INGREDIENTS,
	};
	// sudah tidak digunakan karena redux saga
	// return (dispatch) => {
	// 	axios
	// 		.get("https://react-my-burger-d207b.firebaseio.com/ingredient.json")
	// 		.then((response) => {
	// 			dispatch(setIngredients(response.data));
	// 		})
	// 		.catch((error) => {
	// 			dispatch(fetchIngredientsFailed());
	// 		});
	// };
};
