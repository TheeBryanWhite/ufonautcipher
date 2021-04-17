/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import {
	EmailShareButton,
	EmailIcon,
	FacebookShareButton,
	FacebookIcon,
	FacebookMessengerShareButton,
	FacebookMessengerIcon,
	RedditShareButton,
	RedditIcon,
	TwitterShareButton,
	TwitterIcon
  } from "react-share";
  import Grid from '@material-ui/core/Grid';

  const SocialSharing = (props) => {
	  return(
		<Grid container spacing={3}>
			<Grid css={css`background-color: #c9d4d8;`} item xs={12}>
				<div
					css={css`
						align-items: center;
						display: flex;
						justify-content: center;
					`}
				>
					<p css={css`margin: 0;`}>Share these results:</p>
					<div css={css`transform: translateY(5px);`}>
						<EmailShareButton css={css`margin: 0.5rem;`} url={props.sharePath}>
							<EmailIcon size={32} round={true} />
						</EmailShareButton>
						<FacebookShareButton css={css`margin: 0.5rem;`} url={props.sharePath}>
							<FacebookIcon size={32} round={true} />
						</FacebookShareButton>
						<FacebookMessengerShareButton css={css`margin: 0.5rem;`} url={props.sharePath}>
							<FacebookMessengerIcon size={32} round={true} />
						</FacebookMessengerShareButton>
						<RedditShareButton css={css`margin: 0.5rem;`} url={props.sharePath}>
							<RedditIcon size={32} round={true} />
						</RedditShareButton>
						<TwitterShareButton css={css`margin: 0.5rem;`} url={props.sharePath}>
							<TwitterIcon size={32} round={true} />
						</TwitterShareButton>
					</div>
				</div>
			</Grid>
		</Grid>
	  )
  }

  export default SocialSharing;