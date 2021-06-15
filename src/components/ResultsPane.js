/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SocialSharing from './SocialSharing';
import SuggestionsBar from './SuggestionsBar';

const ResultsPane = (props) => {
	let UserResults;
	if (props.userMatchData.length >= 1) {
		UserResults =
			<Grid
				css={css`
					text-align: left;
				`}
				item
				xs={12}
			>
				<h2
					css={css`
						border-bottom: 1px solid #000000;
					`}
				>
					User submitted matches for {props.queryData}({props.totalSumData}):
				</h2>
				<ul
					css={css`
						font-size: 1.25rem;
						list-style: none;
						padding: 0;
						@media (min-width: 768px) {
							column-count: 2;
							column-gap: 20px;
						}
						@media (min-width: 1024px) {
							column-count: 3;
						}
					`}
				>
				{
					props.userMatchData.map((match, index) => (
						<li
							css={css`
								display: inline-block;
								padding: 5px;
								width: 100%;
								&:nth-of-type(even) {
									background-color: #c9d4d8;
								}
							`}
							key={index}
						>
							{match.processedString[0]}
						</li>
					))
				}
				</ul>
			</Grid>
	}
	return(
		<Card>
			<Container>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<h2
							css={css`
								font-size: 2rem;
							`}
						>
							You searched for:
						</h2>
						<div 
							css={css`
								align-items: center;
								display: flex;
								justify-content: space-between;
							`}
						>
							{
								props.processedStringData.map((string, index) => (
									<div
										css={css`
											flex: 1;
											text-align: center;
										`}
										key={index}
									>
										<p
											css={css`
												font-size: 1.5rem;
												font-weight: 800;
												margin: 0;
											`}
										>
											{props.cipherValData[index]}
										</p>
										<p 
											css={css`
												font-size: 1.5rem;
												margin-top: 0;`
											}
										>
											<a 
												css={css`
													color: #000;
												`} 
												href={`/${string}`}
											>
												{string}
											</a>
										</p>
									</div>
								))
							}
							<div
								css={css`
									flex: 1;
									text-align: center;
								`}
							>
								<p
									css={css`
										font-size: 1.5rem;
										font-weight: 800;
										margin: 0;
									`}
								>
									Total
								</p>
								<p
									css={css`
										font-size: 1.5rem;
										margin-top: 0;
									`}
								>
									{props.totalSumData}
								</p>
							</div>
						</div>
					</Grid>
					<SuggestionsBar />
					<SocialSharing sharePath={props.sharePath} />
					<Grid
						css={css`
							text-align: left;
						`}
						item
						xs={12}
					>
						<h2
							css={css`
								border-bottom: 1px solid #000000;
							`}
						>
							Book of the Law matches for {props.queryData}({props.totalSumData}):
						</h2>
						<ul
							css={css`
								font-size: 1.25rem;
								list-style: none;
								padding: 0;
								@media (min-width: 768px) {
									column-count: 2;
									column-gap: 20px;
								}
								@media (min-width: 1024px) {
									column-count: 3;
								}
							`}
						>
						{
							props.matchData.map((match, index) => (
								<li
									css={css`
										display: inline-block;
										padding: 5px;
										width: 100%;
										&:nth-of-type(even) {
											background-color: #c9d4d8;
										}
									`}
									key={index}
								>
									{match}
								</li>
							))
						}
						</ul>
					</Grid>
					{UserResults}
				</Grid>
			</Container>
		</Card>
	)
}

export default ResultsPane;