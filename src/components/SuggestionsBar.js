/** @jsxRuntime classic */
/** @jsx jsx */
import { connect } from 'react-redux'
import { css, jsx } from '@emotion/react';
import Grid from '@material-ui/core/Grid';

const linkStyles = css`
	color: #be171c;
	font-weight:L bold;s
	text-decoration: none;
	transition: color 0.3s linear;
	&:hover {
		color: #000000;
	}
`;

const SuggestionsBar = (props) => {
	const getPhrase = props.suggestions.map((word) => {
		return word.suggestions[0].suggestion;
	});

	const suggestionLink = getPhrase.join('-');
	const suggestionString = getPhrase.join(' ');

	if (props.suggestions.length >= 1) {
		return(
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<p
						css={css`
							font-size: 1.5rem;
	
							span {
								font-style: italic;
							}
						`}
					>
						Did you mean: <span><a css={linkStyles} href={`/${suggestionLink}`}>{suggestionString}</a></span>?
					</p>
				</Grid>
			</Grid>
		)
	} else {
		return false;
	}
}

const mapStateToProps = state => ({
    suggestions: state.app.suggestions,
});

export default connect(
	mapStateToProps, 
	null
)(SuggestionsBar);
