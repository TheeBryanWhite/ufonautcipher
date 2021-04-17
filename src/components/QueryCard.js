/** @jsxRuntime classic */
/** @jsx jsx */
import { Component, lazy, Suspense } from 'react';
import { css, jsx } from '@emotion/react';
import { withRouter } from "react-router";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import debounce from 'lodash.debounce';
import InfoBar from './InfoBar';
import Footer from './Footer';
import EyeOfProvidence from '../svg/EyeOfProvidence';
import queryEncode from '../utilities/queryEncode';
import liberTextBreakdown from '../utilities/liberTextBreakdown';
import deepLinking from '../utilities/deepLinking';

const ResultsPane = lazy(() => import('./ResultsPane'));
const renderLoader = () => <p>Loading</p>;

class QueryCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			buttonDisable: true,
			cypherVal: null,
			matches: null,
			processedString: null,
			queryString: '',
			queryVal: null,
			showResults: false,
			totalSum: 0,
		};

		this.pathname = props.location.pathname;

		this.buttonDisable = this.buttonDisable.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
		this.debounceThis = debounce(this.debounceThis.bind(this), 500);
		this.deepLinkInit = this.deepLinkInit.bind(this);
		this.encodedStateUpdate = this.encodedStateUpdate.bind(this);
	}

	// Enable the button once there's a string to submit in the field
	buttonDisable = () => {
		if (this.state.queryString !== '') {
			this.setState({buttonDisable: false});
		}
		return false;
	}

	// Functions to be run when the query field value changes
	changeHandler = (event) => {
		this.setState({queryString: event.target.value});
		this.debounceThis();
	}

	// Functions to be run when the submit button is clicked
	clickHandler = () => {
		this.setState({
			matches: liberTextBreakdown(this.state.totalSum),
			showResults: true
		});
	}

	// Delay these a bit so we're not running them on every keystroke
	debounceThis = () => {
		const encodedQuery = queryEncode(this.state.queryString);
		this.encodedStateUpdate(encodedQuery);
		this.buttonDisable();
	}

	deepLinkInit = (query) => {
		this.setState({queryString: query});
		const encodedQuery = queryEncode(query);
		this.encodedStateUpdate(encodedQuery);
	}

	encodedStateUpdate = (object) => {
		const matches = liberTextBreakdown(object.totalSum);
		this.setState({
			cypherVal: object.cypherVals,
			processedString: object.processedString,
			queryVal: object.queryVal,
			totalSum: object.totalSum,
			matches: matches
		});
	}

	componentDidMount() {
		const pathName = deepLinking(this.pathname);
		if (pathName.length > 0) {
			this.deepLinkInit(pathName);
			this.setState({showResults: true});
		}
	}

	render() {
		const ShowResults = () => {
			if (this.state.showResults) {
				return (
					<Suspense fallback={renderLoader()}>
						<Grid
							item
							xs={12}
						>
							<ResultsPane 
								cypherValData={this.state.cypherVal} 
								matchData={this.state.matches}
								processedStringData={this.state.processedString}
								queryData={this.state.queryString}
								sharePath={this.state.processedString}
								totalSumData={this.state.totalSum}
							/>
						</Grid>
					</Suspense>
				)
			}
	
			return false;
		}

		return(
			<Container css={css`margin: 1rem;`}>
				<Card 
					css={css`
						padding: 2rem;
					`}
					variant="outlined"
				>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Grid
								alignItems="center"
								container
								direction="row"
								spacing={3}
							>
								<Grid item xs={12} md={2}>
									<EyeOfProvidence
										css={css`
											width: 33vw;
											@media (min-width: 1024px) {
												width: auto;
											}
										`}
									/>
								</Grid>
								<Grid item xs={12} md={10}>
									<h1
										css={css`
											font-size: 8vw;
											margin: 0;
											@media (min-width: 1024px) {
												font-size: 4vw;
											}
											@media (min-width: 1536px) {
												font-size: 3vw;
											}
										`}
									>
										The Secret Cipher of the UFOnauts
									</h1>
									<h2
										css={css`
											font-size: 5vw;
											margin: 0;
											@media (min-width: 1024px) {
												font-size: 3vw;
											}
											@media (min-width: 1536px) {
												font-size: 2.5vw;
											}
										`}
									>
										New Aeon English Qabalah
									</h2>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<form 
								autoComplete="off"
								noValidate
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
											value={this.state.queryString}
											variant="outlined"
										/>
									</Grid>
									<Grid item xs={12} sm={3}>
										<Button 
											css={css`
												height: 100%;
												width: 100%;
											`}
											disabled={this.state.buttonDisable}
											onClick={this.clickHandler}
											variant="contained"
										>
											Search
										</Button>
									</Grid>
								</Grid>
							</form>
						</Grid>
						<InfoBar />
						<ShowResults />
					</Grid>
				</Card>
				<Footer />
			</Container>
		)
	}
}

export default withRouter(QueryCard);