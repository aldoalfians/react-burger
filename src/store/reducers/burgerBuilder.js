import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	ingredient: null,
	totalPrice: 0,
	error: false,
	building: false,
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.7,
	bacon: 0.7,
};

// Refactoring advance
const addIngredient = (state, action) => {
	const updateIngredient = {
		[action.ingredientName]: state.ingredient[action.ingredientName] + 1,
	};
	const updateIngredients = updateObject(state.ingredient, updateIngredient);
	const updateState = {
		ingredient: updateIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		building: true,
	};
	return updateObject(state, updateState);
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		// refactoring reducers
		// const updateIngredient = {
		// 	[action.ingredientName]:
		// 		state.ingredient[action.ingredientName] + 1,
		// };
		// const updateIngredients = updateObject(
		// 	state.ingredient,
		// 	updateIngredient
		// );
		// const updateState = {
		// 	ingredient: updateIngredients,
		// 	totalPrice:
		// 		state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		// };
		// return updateObject(state, updateState);
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredient: {
					...state.ingredient,
					[action.ingredientName]:
						state.ingredient[action.ingredientName] - 1,
				},
				totalPrice:
					state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
				building: true,
			};
		case actionTypes.SET_INGREDIENTS:
			return updateObject(state, {
				ingredient: {
					salad: action.ingredient.salad,
					bacon: action.ingredient.bacon,
					cheese: action.ingredient.cheese,
					meat: action.ingredient.meat,
				},
				totalPrice: 0,
				error: false,
				building: false,
			});
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true,
			};
		default:
			return state;
	}
};

export default reducer;
