export function determineSearchType(query) {
	const matchPattern = (input) => {
		let options = {
			'alpha': false,
			'alphaNumeric': true,
			'numeric': false
		}

		const alphaPattern = /[A-Za-z]/g;
		const numericPattern = /[0-9]/g;

		if (input.match(alphaPattern)) {
			options['alpha'] = true;
			options['alphaNumeric'] = false;
		}

		if (input.match(numericPattern)) {
			options['alphaNumeric'] = false;
			options['numeric'] = true;
		}

		return options;
	}

	const type = (input) => {
		const object = matchPattern(input);

		if (object.alpha) { return 'alpha'; }

		if (object.alphaNumeric) { return 'alphanumeric'; }

		if (object.numeric) { return 'numeric'; }
	}

	return type(query);
}