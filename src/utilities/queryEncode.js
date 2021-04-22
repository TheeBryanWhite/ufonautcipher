
export function queryEncode(string) {
	const cipherData = require('../json/cipher.json');
	// Add the cipher values together
	const addItUp = (array) => {
		// For each word in the query string...
		const cipherValOutput = array.map(word => {
			let cipherSum = 0;
			// Loop through each letter...
			word.forEach(letter => {
				// Return the sum of their NAEQ cipher values
				return cipherSum += letter.value;
			});
			return cipherSum;
		});

		return cipherValOutput;
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
		const stringToLower = lowerCaseIt(string);
		const brokenOnSpaces = breakOnSpaces(stringToLower);
		const brokenDown = breakItDown(brokenOnSpaces);
		const cipheredString = runTheCipher(brokenDown);
		const cipherVals = addItUp(cipheredString);
		const total = combinedSum(cipherVals);

		return {
			"processedString": brokenOnSpaces, 
			"queryVal": cipheredString,
			"cipherVals": cipherVals,
			"totalSum": [total]
		}
	}

	// Lowercase the query string for housekeeping reasons
	const lowerCaseIt = (string) => {
		return string.toLowerCase();
	}

	// Run the string against the cipher object
	const runTheCipher = (array) => {
		// For each word in the query string...
		const encipher = array.map(word => {
			// For each letter in this word...
			const letterVals = word.map(letter => {
				let cipherVal = null;
				// Run the current letter against the cipher object
				// Return the corresponding NAEQ cipher value for that letter
				cipherData.cipher.forEach(cipherPair => {
					if (letter === cipherPair.letter) {
						cipherVal = cipherPair.value;
					}
				});
				return {'letter': letter, 'value': cipherVal};
			});
			return letterVals;
		});
		return encipher;
	}

	const allThatData = init(string);
	return allThatData;
}