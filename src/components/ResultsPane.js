/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SocialSharing from './SocialSharing';

const ResultsPane = (props) => {
	return(
		<Card>
			<Container>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<h2>You searched for:</h2>
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
											font-weight: 800;
											margin: 0;
										`}
									>
										{props.cipherValData[index]}
									</p>
									<p css={css`margin-top: 0;`}><a css={css`color: #000;`} href={`/${string}`}>{string}</a></p>
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
									font-weight: 800;
									margin: 0;
								`}
							>
								Total
							</p>
							<p css={css`margin-top: 0;`}>{props.totalSumData}</p>
						</div>
					</div>
				</Grid>
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
						Matches for {props.queryData}({props.totalSumData}):
					</h2>
					<ul
						css={css`
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
									display: block;
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
			</Grid>
			</Container>
		</Card>
	)
}

export default ResultsPane;