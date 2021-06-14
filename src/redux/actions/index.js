import { types } from "../constants/types";

export const setButtonState = (data) => (dispatch) => {
	dispatch({
		type: types.SET_BUTTON_STATE,
		payload: data,
	});
}

export const setCipherVal = (data) => (dispatch) => {
	dispatch({
		type: types.SET_CIPHER_VAL,
		payload: data,
	});
}

export const setMatches = (data) => (dispatch) => {
	dispatch({
		type: types.SET_MATCHES,
		payload: data,
	});
}

export const setProcessedString = (data) => (dispatch) => {
	dispatch({
		type: types.SET_PROCESSED_STRING,
		payload: data,
	});
}

export const setQueryString = (data) => (dispatch) => {
	dispatch({
		type: types.SET_QUERY_STRING,
		payload: data,
	});
	return Promise.resolve();
}

export const setQuerySuggestions = (data) => (dispatch) => {
	dispatch({
		type: types.SET_QUERY_SUGGESTIONS,
		payload: data,
	});
}

export const setQueryVal = (data) => (dispatch) => {
	dispatch({
		type: types.SET_QUERY_VAL,
		payload: data,
	});
}

export const setResultsPaneState = (data) => (dispatch) => {
	dispatch({
		type: types.SET_RESULTS_PANE_STATE,
		payload: data,
	});
}

export const setTotalSum = (data) => (dispatch) => {
	dispatch({
		type: types.SET_TOTAL_SUM,
		payload: data,
	});
}