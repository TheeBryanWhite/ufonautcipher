const deepLinking = (path) => {
	const init = () => {
		const strippedQuery = stripInvalidChars(path);
		return trimOutput(strippedQuery);
	}

	// Only allow alphas, numbers, and spaces
	const stripInvalidChars = (string) => {
		return string.replace(/[^a-zA-Z0-9_ ]/g, ' ');
	}

	const trimOutput = (string) => {
		return string.trim();
	}

	return init();
}

export default deepLinking;