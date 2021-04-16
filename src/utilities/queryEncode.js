const queryEncode = (string) => {
	const cypherData = require('../json/cypher.json');

	// Add the cypher values together
	const addItUp = (array) => {
		// For each word in the query string...
		const cypherValOutput = array.map(word => {
			let cypherSum = 0;
			// Loop through each letter...
			word.forEach(letter => {
				// Return the sum of their NAEQ cypher values
				return cypherSum += letter.value;
			});
			return cypherSum;
		});

		return cypherValOutput;
	}

	// Break each word in each array down into their individual letters
	const breakItDown = (array) => {
		const stringLetters = array.map(element => {
			return element.split('');
		});

		return stringLetters;
	}

	// Break the query into a new array for each word in the query
	const breakOnSpaces = (string) => {
		return string.split(' ');
	}

	const combinedSum = (vals) => {
		return vals.reduce((acc, curr) => acc + curr);
	}

	const init = (string) => {
		const strippedString = stripInvalidChars(string);
		const trimmedString = trimThis(strippedString);
		const stringToLower = lowerCaseIt(trimmedString);
		const brokenOnSpaces = breakOnSpaces(stringToLower);
		const brokenDown = breakItDown(brokenOnSpaces);
		const cypheredString = runTheCypher(brokenDown);
		const cypherVals = addItUp(cypheredString);
		const total = combinedSum(cypherVals);

		return {
			"processedString": brokenOnSpaces, 
			"queryVal": cypheredString,
			"cypherVals": cypherVals,
			"totalSum": [total]
		}
	}

	// Lowercase the query string for housekeeping reasons
	const lowerCaseIt = (string) => {
		return string.toLowerCase();
	}

	// Run the string against the cypher object
	const runTheCypher = (array) => {
		// For each word in the query string...
		const encypher = array.map(word => {
			// For each letter in this word...
			const letterVals = word.map(letter => {
				let cypherVal = null;
				// Run the current letter against the cypher object
				// Return the corresponding NAEQ cypher value for that letter
				cypherData.cypher.forEach(cypherPair => {
					if (letter === cypherPair.letter) {
						cypherVal = cypherPair.value;
					}
				});
				return {'letter': letter, 'value': cypherVal};
			});
			return letterVals;
		});
		return encypher;
	}

	// Only allow alphas and spaces
	const stripInvalidChars = (string) => {
		return string.replace(/[^A-Za-z_ ]/g, '');
	}

	// Trim the whitespace on the ends to avoid any unnecessary empty arrays in the comparison object
	const trimThis = (string) => {
		return string.trim();
	}

	const allThatData = init(string);
	return allThatData;
}

export default queryEncode;