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

		// Call up our search app endpoint
		axios.get(host + queryString, {
			headers : {
				'Ocp-Apim-Subscription-Key': key
			}
		})
		.then(function (response) {
			// If the response sends any suggestions...
			if (response.data.flaggedTokens.length >= 1) {
				// Send them to the store, we'll need them later
				store.dispatch(setQuerySuggestions(response.data.flaggedTokens));
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	return init(input);
}

