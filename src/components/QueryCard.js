/** @jsxRuntime classic */
/** @jsx jsx */
import { 
	Component, 
	lazy, 
	Suspense 
} from 'react';
import axios from 'axios';
import { css, jsx } from '@emotion/react';
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { 
	setButtonState,
	setCipherVal,
	setMatches,
	setQueryString,
	setQueryVal,
	setProcessedString,
	setResultsPaneState,
	setTotalSum,
	setUserMatches
} from '../redux/actions'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import debounce from 'lodash.debounce';
import InfoBar from './InfoBar';
import {
	deepLinking,
	determineSearchType,
	liberTextBreakdown,
	queryEncode,
	spellCheck
} from '../utilities';

const ResultsPane = lazy(() => import('./ResultsPane'));
const renderLoader = () => <p>Loading</p>;

class QueryCard extends Component {

	constructor(props) {
		super(props);

		this.pathname = props.location.pathname;

		this.buttonDisable = this.buttonDisable.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.checkSpelling = this.checkSpelling.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
		this.createWord = this.createWord.bind(this);
		this.debounceThis = debounce(this.debounceThis.bind(this), 500);
		this.deepLinkInit = this.deepLinkInit.bind(this);
		this.encodedStateUpdate = this.encodedStateUpdate.bind(this);
		this.fetchWords = this.fetchWords.bind(this);
		this.searchType = this.searchType.bind(this);
		this.stripInvalidChars = this.stripInvalidChars.bind(this);
		this.trimThis = this.trimThis.bind(this);
	}

	// Enable the button once there's a string to submit in the field
	buttonDisable = () => {
		if (this.props.queryString !== '') {
			this.props.setButtonState(false);
		} else {
			this.props.setButtonState(true);
		}
		return false;
	}

	// Functions to be run when the query field value changes
	changeHandler = (event) => {
		this.props.setQueryString(event.target.value);
		this.debounceThis();
	}

	checkSpelling = (query) => {
		spellCheck(query);
	}

	// Functions to be run when the submit button is clicked
	clickHandler = (event) => {
		event.preventDefault();
		this.checkSpelling(this.props.processedString);
		this.props.setMatches(liberTextBreakdown(this.props.totalSum));
		this.props.setResultsPaneState(true);
		this.createWord();
	}

	createWord = () => {
		const type = this.searchType(this.props.queryString);
		const createUrl = `http://localhost:3001/v1/words/`;
		const self = this;
		if (type !== 'numeric') {
			if (self.props.suggestions.length === 0) {
				axios.post(createUrl, {
					cipherVal: self.props.cipherVal,
					processedString: self.props.processedString,
					queryString: self.props.queryString,
					queryVal: self.props.queryVal,
					totalSum: self.props.totalSum
				})
				.then(function (response) {
					console.log('Word added to lexicanum');
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		}
	}

	// Delay these a bit so we're not running them on every keystroke
	debounceThis = () => {
		let encodedQuery;
		const type = this.searchType(this.props.queryString);

		if (type !== 'numeric') {
			const strippedString = this.stripInvalidChars(this.props.queryString);
			const trimmedString = this.trimThis(strippedString);
			
			encodedQuery = queryEncode(trimmedString);
		} else {
			encodedQuery = this.trimThis(this.props.queryString);
		}

		this.encodedStateUpdate(encodedQuery);
		this.fetchWords(this.props.cipherVal);
		this.buttonDisable();
	}

	deepLinkInit = (query) => {
		this.props.setQueryString(query)
			.then(() => {
				let encodedQuery;
				const type = this.searchType(query);

				if (type !== 'numeric') {
					encodedQuery = queryEncode(query);
				} else {
					encodedQuery = query;
				}

				this.encodedStateUpdate(encodedQuery);
			});
	}

	encodedStateUpdate = (input) => {
		const type = this.searchType(this.props.queryString);

		if (type !== 'numeric') {
			const matches = liberTextBreakdown(input.totalSum);
			this.props.setCipherVal(input.cipherVals);
			this.props.setMatches(matches);
			this.props.setProcessedString(input.processedString);
			this.props.setQueryVal(input.queryVal);
			this.props.setTotalSum(input.totalSum);
		} else {
			const arr = [parseInt(input)];
			const matches = liberTextBreakdown(arr);
			this.props.setCipherVal(arr);
			this.props.setMatches(matches);
			this.props.setProcessedString(arr);
			this.props.setQueryVal(arr);
			this.props.setTotalSum(arr);
		}
	}

	fetchWords = () => {
		const fetchUrl = `http://localhost:3001/v1/words/${this.props.cipherVal}`;
		const self = this;
		axios.get(fetchUrl, {})
		.then(function (response) {
			self.props.setUserMatches(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	searchType = (query) => {
		return determineSearchType(query);
	}

	// Only allow alphas and spaces
	stripInvalidChars = (string) => {
		return string.replace(/[^A-Za-z_ ]/g, '');
	}

	// Trim the whitespace on the ends to avoid any unnecessary empty arrays in the comparison object
	trimThis = (string) => {
		return string.trim();
	}

	componentDidMount() {
		const pathName = deepLinking(this.pathname);
		if (pathName.length > 0) {
			this.deepLinkInit(pathName);
			this.props.setResultsPaneState(true);
		}
	}

	render() {
		const ShowResults = () => {
			if (this.props.showResults) {
				return (
					<Suspense fallback={renderLoader()}>
						<Grid
							item
							xs={12}
						>
							<ResultsPane 
								cipherValData={this.props.cipherVal} 
								matchData={this.props.matches}
								processedStringData={this.props.processedString}
								queryData={this.props.queryString}
								sharePath={this.props.processedString}
								totalSumData={this.props.totalSum}
								userMatchData={this.props.userMatches}
							/>
						</Grid>
					</Suspense>
				)
			}
	
			return false;
		}

		return(
			<main
				css={css`
					margin: 50px 0;
				`}
			>
				 <Card
					css={css`
						padding: 1rem;
						@media (min-width: 768px) {
						padding: 2rem;
						}
					`}
				>
					<form 
						autoComplete="off"
						noValidate
						onSubmit={this.clickHandler}
					>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={9}>
								<TextField
									css={css`
										width: 100%;
									`}
									id="outlined-required"
									label="Your query"
									onChange={this.changeHandler}
									required
									value={this.props.queryString}
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Button 
									css={css`
										height: 100%;
										width: 100%;
									`}
									disabled={this.props.buttonDisable}
									onClick={this.clickHandler}
									type="submit"
									variant="contained"
								>
									Search
								</Button>
							</Grid>
						</Grid>
					</form>
					<InfoBar />
					<ShowResults />
				</Card>
			</main>
		)
	}
}

const mapStateToProps = state => ({
    buttonDisable: state.app.buttonDisable,
	cipherVal: state.app.cipherVal,
	matches: state.app.matches,
	processedString: state.app.processedString,
	queryString: state.app.queryString,
	queryVal: state.app.queryVal,
	showResults: state.app.showResults,
	suggestions: state.app.suggestions,
	totalSum: state.app.totalSum,
	userMatches: state.app.userMatches
});

export default connect(
	mapStateToProps, 
	{
		setButtonState, 
		setCipherVal,
		setMatches,
		setProcessedString,
		setQueryString,
		setQueryVal,
		setResultsPaneState,
		setTotalSum,
		setUserMatches
	}
)(withRouter(QueryCard));