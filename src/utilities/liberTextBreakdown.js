import {queryEncode} from './queryEncode';

export function liberTextBreakdown(queryVal) {
	const liberData = require('../json/liber_al.json');

	// Find the cipher values for every index in the Liber AL array
	const addItUp = (array) => {
		// For each index in the array...
		const compoundVals = array.map((entry) => {
			// Output a new array of the cipher values
			return entry.cipherVals.map((vals, index) => {
				// Compound their values so that each index is a total of the previous sum plus the current cipher value
				return entry.cipherVals.slice(0, index + 1).reduce((acc, curr) => acc + curr);
			})
		});

		// Do the same as above
		const compoundPhrases = array.map((entry) => {
			// ...but add the words into progressive phrases
			return entry.processedString.map((word, index) => {
				return entry.processedString.slice(0, index + 1).reduce((acc, curr) => `${acc}  ${curr}`);
			});
		});

		// Output an array with everything in it
		return compoundVals.map((vals, index) => {
			return {'val': vals, 'phrase': compoundPhrases[index]};
		});
	}

	// Shoot through the text
	const breakItDown = (array) => {
		return array.map((string, index) => {
			// Grab the current index and the next three words
			const cipherThese = array.slice(index, index + 4);

			// Convert them into a string that the cipher function can work with
			const liberQuartets = cipherThese.join(' ');

			// Encode that shit and kick it back!
			return queryEncode(liberQuartets);
		});
	}

	// Find the matches
	const compareInputToLiber = (input) => {
		// Loop through the phrase object
		return input.liberData.map((object) => {
			// Return words and phrases that match the input value
			return object.val.map((val, index) => {
				if (parseInt(input.cipherVal) === val) {
					return object.phrase[index].trim();
				} else {
					return '';
				}
			});
		});
	}

	// Filter out everything we don't need
	const filterDuplicates = (array) => {
		// Kick out any indexes with more than one sub-index
		let filterThis = array.filter((entry) => entry.length <= 1);
		// Collapse the array down to a single dimension
		filterThis = [].concat.apply([], filterThis);
		// Return only the uniques
		return [...new Set(filterThis)];
	}

	// Run that shit!
	const init = () => {
		const evaluateThis = breakItDown(liberArr());
		const quartetVals = addItUp(evaluateThis);
		const inputObj = {'cipherVal': queryVal, 'liberData': quartetVals};
		const unfilteredMatches = compareInputToLiber(inputObj);
		const simplifiedMatches = simplifyOutput(unfilteredMatches);
		const output = filterDuplicates(simplifiedMatches);
		return output;
	}

	// Break the Liber AL text down to an array, split on spaces
	const liberArr = () => {
		return liberData.liber_al.text.split(' ');
	}

	//  Break the data down to something we can use more easily
	const simplifyOutput = (array) => {
		// Loop through the first dimension...
		const firstSet = array.map((array) => {
			// Only return indexes that have something in them
			return array.filter((phrase) => phrase.length > 0);
		});
		// Filter the first dimension of empty indexes
		return firstSet.filter((phrase) => phrase.length > 0);
	}

	const liberTextOutput = init();
	return liberTextOutput;
}