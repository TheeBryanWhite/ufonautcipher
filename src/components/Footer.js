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
				<Grid css={css`text-align: left;`} item xs={12} sm={9}>
					<p css={css`font-size: 1rem;`}>&copy; {theYear} &#47;&#47; A creation of Frater Pera (<a css={css`color: #fff;`} href="http://twitter.com/thatwerewolftho" rel="noreferrer" target="_blank">@thatwerewolftho</a>) &#47;&#47; All rights reserved</p>
				</Grid>
				<Grid css={css`text-align: right;`} item xs={12} sm={3}>
					<p css={css`font-size: 1rem;`}>באמצעות קסם אני נעשית שלמה</p>
				</Grid>
			</Grid>
		</footer>
	)
}

export default Footer;