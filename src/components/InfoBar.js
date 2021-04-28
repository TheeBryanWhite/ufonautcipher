/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import Grid from '@material-ui/core/Grid';

const linkStyles = css`
	color: #be171c;
	font-size: 1.125rem;
	text-decoration: none;
	transition: color 0.3s linear;
	&:hover {
		color: #000000;
	}
`;

const InfoBar = () => {
	return(
		<Grid 
			alignItems="center"
			container 
			spacing={3}
		>
			<Grid item xs={6} sm={3}>
				<p><a css={linkStyles} href="https://ko-fi.com/fraterpera" rel="noreferrer" target="_blank">Buy me a coffee</a></p>
			</Grid>
			<Grid item xs={6} sm={3}>
				<p><a css={linkStyles} href="https://www.amazon.com/gp/product/171864535X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=171864535X&linkCode=as2&tag=lastp00-20&linkId=210e6049b11198cd9851b49eb58ab6be" rel="noreferrer" target="_blank">Order Secret Cipher of the UFOnauts</a></p>
			</Grid>
			<Grid item xs={6} sm={3}>
				<p><a css={linkStyles} href="https://codexastarte.substack.com/" rel="noreferrer" target="_blank">Codex Astarte</a></p>
			</Grid>
			<Grid item xs={6} sm={3}>
				<p><a css={linkStyles} href="https://github.com/TheeBryanWhite/ufonautcipher" rel="noreferrer" target="_blank">Github Repository</a></p>
			</Grid>
		</Grid>
	)
}

export default InfoBar;
