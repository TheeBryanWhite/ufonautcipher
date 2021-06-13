import axios from 'axios';
import store from '../redux/store/store';
import { 
	setQuerySuggestions
} from '../redux/actions'
import env from 'react-dotenv';

export function spellCheck(input) {
	const init = (input) => {
		checkSpelling(input);
	}

	const checkSpelling = (input) => {
		const host = env.BINGHOST;
		const key = env.BINGKEY;
		const queryString = `?text=${input}`;

		axios.get(host + queryString, {
			headers : {
				'Ocp-Apim-Subscription-Key': key
			}
		})
		.then(function (response) {
			if (response.data.flaggedTokens.length >= 1) {
				store.dispatch(setQuerySuggestions(response.data.flaggedTokens));
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	return init(input);
}

