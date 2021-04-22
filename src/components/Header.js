/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import Grid from '@material-ui/core/Grid';
import EyeOfProvidence from '../svg/EyeOfProvidence';

const Footer = () => {
	return(
		<header
            className="App-header"
            css={css`
				color: #fff;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: calc(10px + 2vmin);
				color: white;
            `}
        >
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
        </header>
	)
}

export default Footer;