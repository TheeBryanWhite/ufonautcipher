/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import Grid from '@material-ui/core/Grid';

const Footer = () => {
	const theDate = new Date()
	const theYear = theDate.getFullYear()
	return(
		<footer>
			<Grid css={css`padding: 0 2rem;`} container spacing={3}>
				<Grid 
					css={css`
						@media (min-width: 1024px) {
							text-align: left;
						}
					`} 
					item 
					xs={12} 
					md={9}
				>
					<p 
						css={css`
							color: #fff;
							font-size: 1rem;
					`}>
						&copy; {theYear} &#47;&#47; A creation of Frater Pera (<a css={css`color: #fff;`} href="https://twitter.com/ThatWerewolfTho" rel="noreferrer" target="_blank">@thatwerewolftho</a>) &#47;&#47; All rights reserved
					</p>
				</Grid>
				<Grid
					css={css`
						@media (min-width: 1024px) {
							text-align: right;
						}
					`} 
					item 
					xs={12} 
					md={3}
				>
					<p css={css`
						color: #fff;
						font-size: 1rem;
					`}>
						באמצעות קסם אני נעשית שלמה
					</p>
				</Grid>
			</Grid>
		</footer>
	)
}

export default Footer;