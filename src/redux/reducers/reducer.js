import { types } from "../constants/types";

const initialState = {
	buttonDisable: true,
	cipherVal: null,
	isNumericSearch: false,
	matches: null,
	processedString: null,
	queryString: '',
	queryVal: null,
	showResults: false,
	suggestions: [],
	totalSum: 0,
	userMatches: []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_BUTTON_STATE:
			return { 
				...state, 
				buttonDisable: action.payload
			}

		case types.SET_CIPHER_VAL:
			return { 
				...state, 
				cipherVal: action.payload
			}

		case types.SET_MATCHES:
			return { 
				...state, 
				matches: action.payload
			}

		case types.SET_PROCESSED_STRING:
			return { 
				...state, 
				processedString: action.payload
			}

		case types.SET_QUERY_STRING:
			return { 
				...state, 
				queryString: action.payload
			}

		case types.SET_QUERY_SUGGESTIONS:
			return { 
				...state, 
				suggestions: action.payload
			}

		case types.SET_QUERY_VAL:
			return { 
				...state, 
				queryVal: action.payload
			}

		case types.SET_RESULTS_PANE_STATE:
			return { 
				...state, 
				showResults: action.payload
			}

		case types.SET_TOTAL_SUM:
			return { 
				...state, 
				totalSum: action.payload
			}

		case types.SET_USER_MATCHES:
			return { 
				...state, 
				userMatches: action.payload
			}

		default:
			return {
				...state
			}
	}
};

export default reducer